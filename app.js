// Mission Reborn prototype. All words live in data/*.js; this file only builds pages from them.

const WORLDS = { moon: MOON, mars: MARS };
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
if (hasGsap) gsap.registerPlugin(ScrollTrigger);

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let current = null;      // the world on screen: MOON or MARS
let railTrigger = null;  // the ScrollTrigger driving the timeline

// ---------- Saved progress (✓ marks, badge) ----------
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch { /* private mode: progress just isn't saved */ } }
};
const isDone = (id) => store.get("done-" + id) === "1";

function refreshDoneMarks() {
  $$("[data-done]").forEach((el) => { el.hidden = !isDone(el.dataset.done); });
  const both = isDone("moon") && isDone("mars");
  $("#finalStart").hidden = !both;
  $("#finalEnd").hidden = !both;
}

function markDone(id) {
  if (isDone(id)) return;
  store.set("done-" + id, "1");
  refreshDoneMarks();
}

// ---------- Text safety ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Views ----------
function showStart() {
  stopReading();
  $("#planet").hidden = true;
  $("#topbar").hidden = true;
  $("#start").hidden = false;
  if (railTrigger) { railTrigger.kill(); railTrigger = null; }
  refreshDoneMarks();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showPlanet(id) {
  stopReading();
  current = WORLDS[id];
  $("#start").hidden = true;
  $("#topbar").hidden = false;
  $("#planet").hidden = false;
  $$(".switch button").forEach((b) => b.setAttribute("aria-current", String(b.dataset.go === id)));
  renderPlanet(current);
  window.scrollTo({ top: 0, behavior: "instant" });
  setupTimeline();
}

// Opening a world. From the start screen, its letter grows into the planet.
function openWorld(id) {
  const letter = $(`#start:not([hidden]) .letter[data-planet="${id}"]`);
  if (!letter || !hasGsap || calm()) { showPlanet(id); return; }

  const r = letter.getBoundingClientRect();
  const startSize = r.height * 0.62;
  const endSize = Math.min(Math.max(120, window.innerWidth * 0.22), 168);

  const flyer = document.createElement("span");
  flyer.className = `disc ${id} flyer`;
  Object.assign(flyer.style, {
    width: startSize + "px",
    left: r.left + r.width / 2 - startSize / 2 + "px",
    top: r.top + r.height * 0.58 - startSize / 2 + "px"
  });
  document.body.appendChild(flyer);

  const others = $$("#start .title, #start .ask, #start .choices, #start .final-cta");
  letter.style.visibility = "hidden";

  gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete() {
      showPlanet(id);
      flyer.remove();
      letter.style.visibility = "";
      gsap.set(others, { clearProps: "opacity" });
    }
  })
    .to(others, { opacity: 0, duration: 0.35 }, 0)
    .to(flyer, {
      width: endSize,
      left: window.innerWidth / 2 - endSize / 2,
      top: 92,
      duration: 0.85
    }, 0.05);
}

// ---------- Building a world from its data ----------
function renderPlanet(world) {
  const other = world.id === "moon" ? MARS : MOON;

  $("#headDisc").className = `disc big ${world.id}`;
  $("#railDisc").className = `disc small ${world.id}`;
  $("#planetTitle").textContent = `5 machines on ${world.id === "moon" ? "the Moon" : "Mars"}`;
  $("#hook").textContent = world.hook;

  $("#machines").innerHTML = world.machines.map((m, i) => `
    <article class="machine" id="m-${i}" aria-labelledby="m-${i}-name">
      <p class="machine-year">${m.year}</p>
      <h3 id="m-${i}-name">${esc(m.name)}</h3>
      <p class="talking">“${esc(m.talkingLine)}”</p>
      <figure class="photo">
        <div class="photo-box">Photo goes here: ${esc(m.image)}</div>
        <figcaption>${esc(m.imageType)} · credit NASA</figcaption>
      </figure>
      <dl class="facts">
        <dt>What it was</dt><dd>${esc(m.whatItWas)}</dd>
        <dt>What it carried</dt><dd>${esc(m.whatItCarried)}</dd>
        <dt>What happened to it</dt><dd>${esc(m.whatHappened)}</dd>
        <dt>Where it is now</dt><dd>${esc(m.whereItIsNow)}</dd>
      </dl>
      <div class="machine-foot">
        <button class="btn primary small" type="button" data-quiz="${i}">Check your knowledge</button>
        <button class="btn small" type="button" data-read="${i}">Read aloud</button>
        <a class="source" href="${esc(m.source)}" target="_blank" rel="noopener">Where we got this (NASA)</a>
        ${m.sourceChecked ? "" : `<span class="unchecked">Not fact-checked yet</span>`}
      </div>
    </article>`).join("");

  $("#railDots").innerHTML = world.machines.map((m, i) => `
    <li><button type="button" data-jump="${i}" aria-label="Jump to ${esc(m.name)}, ${m.year}"><span>${m.year}</span></button></li>`).join("");

  const name = world.id === "moon" ? "Moon" : "Mars";
  $("#endText").textContent = `You've met all 5 ${name} machines. Let's see what you remember!`;
  $("#planetQuizBtn").textContent = `Take the ${name} Quiz`;
  $("#otherBtn").textContent = `Now: 5 machines on ${other.id === "moon" ? "the Moon" : "Mars"}`;
  $("#otherBtn").dataset.go = other.id;
}

// ---------- The timeline: planet slides down, blue behind, gray ahead ----------
function setupTimeline() {
  if (railTrigger) railTrigger.kill();

  const track = $("#track");
  const fill = $("#railFill");
  const planet = $("#railPlanet");
  const count = $("#railCount");
  const sections = $$(".machine");
  const dots = $$("#railDots li");
  const dotBtns = $$("#railDots button");
  let stops = [];

  // Put each dot level with the year of its machine
  function placeDots() {
    const top = track.getBoundingClientRect().top + window.scrollY;
    stops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY - top + 12);
    dots.forEach((d, i) => { d.style.top = stops[i] + "px"; });
  }

  function update(progress) {
    const y = progress * track.offsetHeight;
    fill.style.height = y + "px";
    planet.style.top = y + "px";
    let passed = 0;
    stops.forEach((s, i) => {
      const on = y >= s - 1;
      dotBtns[i].classList.toggle("passed", on);
      if (on) passed = i + 1;
    });
    count.textContent = `${Math.max(passed, 1)} of ${sections.length}`;
    if (progress > 0.97) markDone(current.id);
  }

  placeDots();

  if (hasGsap) {
    railTrigger = ScrollTrigger.create({
      trigger: track,
      start: "top 45%",
      end: "bottom 45%",
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => { placeDots(); update(self.progress); }
    });
    ScrollTrigger.refresh();
  } else {
    // No GSAP (offline): same idea with a plain scroll listener
    const onScroll = () => {
      const r = track.getBoundingClientRect();
      const mid = window.innerHeight * 0.45;
      update(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    railTrigger = { kill: () => window.removeEventListener("scroll", onScroll) };
    onScroll();
  }
}

// ---------- One quiz box, reused for every quiz ----------
function openQuiz(title, questions, { final = false } = {}) {
  const dialog = $("#quiz");
  const body = $("#quizBody");
  let i = 0;
  let score = 0;
  $("#quizTitle").textContent = title;

  function ask() {
    const q = questions[i];
    body.innerHTML = `
      <p class="q-step">Question ${i + 1} of ${questions.length}</p>
      <p class="q-text">${esc(q.question)}</p>
      <div class="options">${q.options.map((o, n) => `<button type="button" data-n="${n}">${esc(o)}</button>`).join("")}</div>`;
    $$(".options button", body).forEach((btn) => btn.addEventListener("click", () => answer(Number(btn.dataset.n))));
    $(".options button", body).focus();
  }

  function answer(n) {
    const q = questions[i];
    const right = n === q.answer;
    if (right) score++;
    $$(".options button", body).forEach((btn, k) => {
      btn.disabled = true;
      if (k === q.answer) btn.classList.add("right");
      else if (k === n) btn.classList.add("wrong");
    });
    const last = i === questions.length - 1;
    body.insertAdjacentHTML("beforeend", `
      <p class="feedback ${right ? "right" : "wrong"}">${esc(right ? q.whenRight : q.whenWrong)}</p>
      <div class="quiz-actions"><button class="btn primary" type="button" id="qNext">${last ? "See my score" : "Next question"}</button></div>`);
    $("#qNext").addEventListener("click", () => { i++; last ? finish() : ask(); });
    $("#qNext").focus();
  }

  function finish() {
    const all = score === questions.length;
    const msg = all ? "Every one right. Nice work."
      : score >= questions.length / 2 ? "Good going. Have another go to get them all."
      : "These machines are tricky. Read their stories again and have another go.";
    if (final) store.set("badge", "1");
    body.innerHTML = `
      <p class="score">${score} of ${questions.length}</p>
      <p>${msg}</p>
      ${final ? `<div class="badge"><strong>Mission Reborn Explorer</strong>You visited 10 machines on 2 worlds.</div>` : ""}
      <div class="quiz-actions">
        <button class="btn primary" type="button" id="qAgain">Try again</button>
        <button class="btn" type="button" id="qDone">Close</button>
      </div>`;
    $("#qAgain").addEventListener("click", () => { i = 0; score = 0; ask(); });
    $("#qDone").addEventListener("click", () => dialog.close());
    $("#qAgain").focus();
  }

  ask();
  dialog.showModal();
}

// ---------- Read aloud (the browser's built-in voice) ----------
let readingBtn = null;
function stopReading() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  if (readingBtn) { readingBtn.textContent = "Read aloud"; readingBtn = null; }
}
function readAloud(btn, m) {
  if (!("speechSynthesis" in window)) { btn.textContent = "Not supported here"; return; }
  if (readingBtn === btn) { stopReading(); return; }
  stopReading();
  const text = [m.name, m.whatItWas, m.whatItCarried, m.whatHappened, m.whereItIsNow].join(". ");
  const say = new SpeechSynthesisUtterance(text);
  say.onend = () => { if (readingBtn === btn) stopReading(); };
  readingBtn = btn;
  btn.textContent = "Stop reading";
  speechSynthesis.speak(say);
}

// ---------- Clicks ----------
document.addEventListener("click", (e) => {
  const t = e.target.closest("button, a");
  if (!t) return;

  if (t.dataset.go) {
    // From the end of a planet, go via the start screen so the next letter can turn into its world
    if (t.id === "otherBtn") { showStart(); requestAnimationFrame(() => openWorld(t.dataset.go)); }
    else if (t.closest(".switch")) showPlanet(t.dataset.go);
    else openWorld(t.dataset.go);
  }
  else if (t.id === "homeBtn") showStart();
  else if (t.dataset.jump) $("#m-" + t.dataset.jump).scrollIntoView({ behavior: calm() ? "auto" : "smooth", block: "start" });
  else if (t.dataset.quiz) {
    const m = current.machines[Number(t.dataset.quiz)];
    openQuiz(`${m.name}: check your knowledge`, m.quiz);
  }
  else if (t.dataset.read) readAloud(t, current.machines[Number(t.dataset.read)]);
  else if (t.id === "planetQuizBtn") {
    openQuiz(`The ${current.planet} Quiz`, current.machines.map((m) => m.quiz[0]));
  }
  else if (t.id === "againBtn") window.scrollTo({ top: 0, behavior: calm() ? "auto" : "smooth" });
  else if (t.hasAttribute("data-final")) {
    const all = [...MOON.machines, ...MARS.machines].map((m) => m.quiz[1]);
    openQuiz("Final Mission", all, { final: true });
  }
  else if (t.id === "quizClose") $("#quiz").close();
});

window.addEventListener("resize", () => { if (hasGsap) ScrollTrigger.refresh(); });

refreshDoneMarks();
