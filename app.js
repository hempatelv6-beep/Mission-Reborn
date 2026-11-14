// Mission Reborn. All words live in data/*.js; this file only builds pages from them.

const WORLDS = { moon: MOON, mars: MARS };
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
if (hasGsap) gsap.registerPlugin(ScrollTrigger);

let current = null;   // the world on screen: MOON or MARS
let triggers = [];    // ScrollTriggers for this world, killed when we leave it
let busy = false;     // true while "Read it again" is flying, so clicks and scrolls wait

// ---------- Saved progress (✓ marks, Calm mode, badge) ----------
// localStorage can throw in private windows. Then progress just isn't saved.
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch { /* not saved */ } }
};
const isDone = (id) => store.get("done-" + id) === "1";

// ---------- Calm mode: our own switch, on by default if the computer asks for less motion ----------
const systemCalm = window.matchMedia("(prefers-reduced-motion: reduce)");
const calm = () => document.body.classList.contains("calm");

function setCalm(on, save = true) {
  document.body.classList.toggle("calm", on);
  $$("[data-calm]").forEach((b) => b.setAttribute("aria-pressed", String(on)));
  if (save) store.set("calm", on ? "1" : "0");
}
const savedCalm = store.get("calm");
setCalm(savedCalm === null ? systemCalm.matches : savedCalm === "1", false);

function refreshStartMarks() {
  $$("[data-done]").forEach((el) => { el.hidden = !isDone(el.dataset.done); });
  const both = isDone("moon") && isDone("mars");
  $("#finalStart").hidden = !both;
  $("#finalEnd").hidden = !both;
  $("#startBadge").hidden = store.get("badge") !== "1";
}

function markDone(id) {
  if (isDone(id)) return;
  store.set("done-" + id, "1");
  refreshStartMarks();
  toast(`${id === "moon" ? "Moon" : "Mars"} complete ✓`);
}

// A short message that slides in at the bottom, then leaves
function toast(text) {
  const el = $("#toast");
  el.textContent = text;
  el.hidden = false;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => { el.hidden = true; }, 2600);
}

// ---------- Text safety ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Views ----------
function leaveWorld() {
  stopReading();
  triggers.forEach((t) => t.kill());
  triggers = [];
}

function showStart() {
  leaveWorld();
  $("#planet").hidden = true;
  $("#topbar").classList.remove("in-world");
  $("#start").hidden = false;
  refreshStartMarks();
  window.scrollTo(0, 0);
}

function showPlanet(id) {
  leaveWorld();
  current = WORLDS[id];
  $("#start").hidden = true;
  $("#topbar").classList.add("in-world");
  $("#planet").hidden = false;
  $$(".switch button").forEach((b) => b.setAttribute("aria-current", String(b.dataset.go === id)));
  renderPlanet(current);
  window.scrollTo(0, 0);
  setupTimeline();
  $("#planetTitle").focus({ preventScroll: true });
}

// Opening a world. From the start screen, its letter ("o" or "A") grows into the planet.
function openWorld(id) {
  const letter = $(`#start:not([hidden]) .letter[data-planet="${id}"]`);
  if (!letter || !hasGsap || calm()) { showPlanet(id); return; }

  const r = letter.getBoundingClientRect();
  const startSize = r.height * 0.6;
  const endSize = Math.min(Math.max(120, window.innerWidth * 0.22), 168);

  const flyer = document.createElement("span");
  flyer.className = `disc ${id} flyer`;
  Object.assign(flyer.style, {
    width: startSize + "px",
    left: r.left + r.width / 2 - startSize / 2 + "px",
    top: r.top + r.height * 0.56 - startSize / 2 + "px"
  });
  document.body.appendChild(flyer);

  const others = $$("#start > *");
  letter.style.visibility = "hidden";
  busy = true;

  gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete() {
      showPlanet(id);
      // the real header disc takes over from the flying one
      gsap.fromTo("#headDisc", { opacity: 0 }, { opacity: 1, duration: 0.2, onComplete: () => flyer.remove() });
      letter.style.visibility = "";
      gsap.set(others, { clearProps: "opacity" });
      busy = false;
    }
  })
    .to(others, { opacity: 0, duration: 0.35 }, 0)
    .to(flyer, { rotation: id === "moon" ? -25 : 25, duration: 0.9, ease: "power2.out" }, 0)
    .to(flyer, {
      width: endSize,
      left: window.innerWidth / 2 - endSize / 2,
      top: 92,
      duration: 0.85
    }, 0.05);
}

// ---------- Building a world from its data ----------
function photoHtml(m) {
  const img = m.image;
  const tagClass = img.type === "NASA photo" ? "real" : "other";
  return `
      <figure class="photo">
        <div class="photo-frame" style="aspect-ratio:${img.width} / ${img.height}">
          <img src="${esc(img.src)}" alt="${esc(img.alt)}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async">
        </div>
        <figcaption>
          <span class="tag ${tagClass}">${esc(img.type)}</span>
          ${img.note ? `<span>${esc(img.note)}</span>` : ""}
          <span>Credit: <a href="${esc(img.from)}" target="_blank" rel="noopener">${esc(img.credit)}</a></span>
        </figcaption>
      </figure>`;
}

function machineHtml(m, i) {
  return `
    <article class="machine" id="m-${i}" aria-labelledby="m-${i}-name">
      <p class="machine-year"><span class="year-num">${m.year}</span> Launched ${esc(m.launched)}</p>
      <h3 id="m-${i}-name">${esc(m.name)}</h3>
      <p class="talking"><span class="sr">Story line, in the machine's voice: </span>“${esc(m.talkingLine)}”</p>
      ${photoHtml(m)}
      <dl class="facts">
        <dt>What it was</dt><dd>${esc(m.whatItWas)}</dd>
        <dt>${esc(m.carriedLabel || "What it carried")}</dt>
        <dd><ul>${m.carried.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></dd>
        <dt>What happened to it</dt><dd>${esc(m.whatHappened)}</dd>
        <dt>Where it is now</dt><dd>${esc(m.whereItIsNow)}</dd>
      </dl>
      <div class="sources">
        <p class="sources-head">Where we got this</p>
        <ul>${m.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join("")}</ul>
        ${m.sourceChecked
          ? `<p class="checked">Links checked ${esc(m.sourceChecked)}</p>`
          : `<p class="unchecked">Not fact-checked yet</p>`}
      </div>
      <div class="machine-foot">
        <button class="btn primary" type="button" data-quiz="${i}">Check your knowledge</button>
        <button class="btn" type="button" data-read="${i}" aria-pressed="false">Read aloud</button>
      </div>
    </article>`;
}

function renderPlanet(world) {
  const other = world.id === "moon" ? MARS : MOON;

  $("#headDisc").className = `disc big ${world.id}`;
  $("#railDisc").className = `disc small ${world.id}`;
  $("#planetTitle").textContent = world.title;
  $("#hook").textContent = world.hook;

  $("#machines").innerHTML = world.machines.map(machineHtml).join("");

  // If a photo is missing or fails to load, show a plain labelled box instead of a broken icon
  $$("#machines .photo img").forEach((img) => {
    const fail = () => {
      const box = document.createElement("div");
      box.className = "photo-missing";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", img.alt);
      box.textContent = "Photo didn't load. " + img.alt;
      img.replaceWith(box);
    };
    img.addEventListener("error", fail, { once: true });
    if (img.complete && img.naturalWidth === 0) fail();
  });

  $("#railDots").innerHTML = world.machines.map((m, i) => `
    <li><button type="button" data-jump="${i}" aria-label="Jump to ${esc(m.name)}, launched ${m.year}"><span>${m.year}</span></button></li>`).join("");

  $("#endText").textContent = `You've met all 5 ${world.planet} machines. Let's see what you remember!`;
  $("#planetQuizBtn").textContent = `Take the ${world.planet} Quiz`;
  $("#otherBtn").textContent = `Now: ${other.title}`;
  $("#otherBtn").dataset.go = other.id;
}

// ---------- The timeline: planet slides down the rail, blue behind, gray ahead ----------
function setupTimeline() {
  const track = $("#track");
  const fill = $("#railFill");
  const planet = $("#railPlanet");
  const count = $("#railCount");
  const sections = $$(".machine");
  const dots = $$("#railDots li");
  const dotBtns = $$("#railDots button");
  let stops = [];

  // Put each dot level with the year at the top of its machine
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
    if (progress > 0.97 && !busy) markDone(current.id);
  }

  placeDots();
  // photos change height as they load, so dots get re-placed then
  $$("#machines img").forEach((img) => img.addEventListener("load", () => hasGsap ? ScrollTrigger.refresh() : placeDots(), { once: true }));

  if (hasGsap) {
    triggers.push(ScrollTrigger.create({
      trigger: track,
      start: "top 45%",
      end: "bottom 45%",
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => { placeDots(); update(self.progress); }
    }));

    // As you scroll off the header, the big planet shrinks toward the rail
    if (!calm()) {
      const head = $("#headDisc");
      const tween = gsap.fromTo(head, { scale: 1, x: 0, opacity: 1 }, {
        scale: 0.3,
        x: () => {
          const h = head.getBoundingClientRect();
          const r = $(".rail").getBoundingClientRect();
          return (r.left + r.width / 2) - (h.left + h.width / 2) + (gsap.getProperty(head, "x") || 0);
        },
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".planet-head", start: "top 70px", end: "bottom 35%", scrub: true, invalidateOnRefresh: true }
      });
      triggers.push(tween.scrollTrigger);
    } else {
      gsap.set("#headDisc", { clearProps: "all" });
    }
    ScrollTrigger.refresh();
  } else {
    // No GSAP (offline): same idea with a plain scroll listener
    const onScroll = () => {
      const r = track.getBoundingClientRect();
      const mid = window.innerHeight * 0.45;
      update(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", placeDots);
    triggers.push({ kill() { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", placeDots); } });
    onScroll();
  }
}

// ---------- "Read it again": planet swings out and back, the blue line rewinds ----------
// The line is tied to scroll position, so scrolling to the top is what drains it.
const blockScroll = (e) => { if (busy) e.preventDefault(); };
const blockKeys = (e) => { if (busy && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) e.preventDefault(); };
window.addEventListener("wheel", blockScroll, { passive: false });
window.addEventListener("touchmove", blockScroll, { passive: false });
window.addEventListener("keydown", blockKeys);

function readAgain() {
  stopReading();
  if (!hasGsap || calm()) {
    window.scrollTo(0, 0);
    $("#planetTitle").focus({ preventScroll: true });
    return;
  }
  busy = true;
  const disc = $("#railDisc");
  const scroller = { y: window.scrollY };

  gsap.timeline({
    onComplete() {
      busy = false;
      gsap.set(disc, { clearProps: "transform" });
      $("#planetTitle").focus({ preventScroll: true });
    }
  })
    // the page (and so the planet and the blue line) runs back to the top
    .to(scroller, { y: 0, duration: 1.5, ease: "power2.inOut", onUpdate: () => window.scrollTo(0, scroller.y) }, 0)
    // swing out to the right, bigger and stretched like it's moving fast
    .to(disc, { x: 120, scaleX: 1.5, scaleY: 1.15, duration: 0.6, ease: "power2.out" }, 0)
    // swing back in, shrink, land on the line
    .to(disc, { x: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: "back.out(1.4)" }, 0.65);
}

// ---------- One quiz box, reused for all 13 quizzes ----------
function openQuiz(title, questions, { final = false } = {}) {
  stopReading();
  const dialog = $("#quiz");
  const body = $("#quizBody");
  let i = 0;
  let score = 0;
  $("#quizTitle").textContent = title;

  function ask() {
    const q = questions[i];
    body.innerHTML = `
      <p class="q-step">Question ${i + 1} of ${questions.length}</p>
      <p class="q-text" id="qText">${esc(q.question)}</p>
      <div class="options" role="group" aria-labelledby="qText">${q.options.map((o, n) => `<button type="button" data-n="${n}"><span class="opt-key" aria-hidden="true">${"ABCD"[n]}</span>${esc(o)}</button>`).join("")}</div>`;
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
    if (final) { store.set("badge", "1"); refreshStartMarks(); }
    body.innerHTML = `
      <p class="score">${score} of ${questions.length}</p>
      <p>${msg}</p>
      ${final ? `<div class="badge"><span class="badge-ring" aria-hidden="true"><span class="disc moon"></span><span class="disc mars"></span></span><strong>${esc(FINAL.badge)}</strong>You visited 10 machines on 2 worlds.</div>` : ""}
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
  if (readingBtn) {
    readingBtn.textContent = "Read aloud";
    readingBtn.setAttribute("aria-pressed", "false");
    readingBtn = null;
  }
}
function readAloud(btn, m) {
  if (!("speechSynthesis" in window)) { btn.textContent = "Not supported here"; btn.disabled = true; return; }
  if (readingBtn === btn) { stopReading(); return; }
  stopReading();
  const text = [
    m.name,
    "What it was. " + m.whatItWas,
    "What it carried. " + m.carried.join(". "),
    "What happened to it. " + m.whatHappened,
    "Where it is now. " + m.whereItIsNow
  ].join(" ");
  const say = new SpeechSynthesisUtterance(text);
  say.lang = "en-US";
  say.rate = 0.95;
  say.onend = () => { if (readingBtn === btn) stopReading(); };
  readingBtn = btn;
  btn.textContent = "Stop reading";
  btn.setAttribute("aria-pressed", "true");
  speechSynthesis.speak(say);
}

// ---------- Clicks ----------
document.addEventListener("click", (e) => {
  const t = e.target.closest("button, a");
  if (!t || busy) return;

  if (t.hasAttribute("data-calm")) setCalm(!calm());
  else if (t.dataset.go) {
    // From the end of a planet, go via the start screen so the next letter can turn into its world
    if (t.id === "otherBtn") { showStart(); openWorld(t.dataset.go); }
    else if (t.closest(".switch")) showPlanet(t.dataset.go);
    else openWorld(t.dataset.go);
  }
  else if (t.id === "homeBtn") showStart();
  else if (t.dataset.jump) {
    const target = $("#m-" + t.dataset.jump);
    target.scrollIntoView({ behavior: calm() ? "auto" : "smooth", block: "start" });
    $("h3", target).setAttribute("tabindex", "-1");
    $("h3", target).focus({ preventScroll: true });
  }
  else if (t.dataset.quiz) {
    const m = current.machines[Number(t.dataset.quiz)];
    openQuiz(`${m.name}: check your knowledge`, m.quiz);
  }
  else if (t.dataset.read) readAloud(t, current.machines[Number(t.dataset.read)]);
  else if (t.id === "planetQuizBtn") openQuiz(`The ${current.planet} Quiz`, current.machines.map((m) => m.quiz[0]));
  else if (t.id === "againBtn") readAgain();
  else if (t.hasAttribute("data-final")) openQuiz(FINAL.title, FINAL.questions, { final: true });
  else if (t.id === "quizClose") $("#quiz").close();
});

window.addEventListener("resize", () => { if (hasGsap) ScrollTrigger.refresh(); });

refreshStartMarks();
