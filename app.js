// Mission Reborn. All words live in data/*.js; this file only builds pages from them.

const WORLDS = { moon: MOON, mars: MARS };
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
if (hasGsap) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

let current = null;   // the world on screen: MOON or MARS
let triggers = [];    // ScrollTriggers for this world, killed when we leave it
let busy = false;     // true while "Read it again" is flying, so clicks and scrolls wait

// ---------- Saved progress (✓ marks, badge, settings) ----------
// localStorage can throw in private windows. Then progress just isn't saved.
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch { /* not saved */ } }
};
const isDone = (id) => store.get("done-" + id) === "1";

// ---------- Reduced motion ----------
// If the device is set to reduce motion, the big animations are skipped.
// calm() is checked before every animation.
const systemCalm = window.matchMedia("(prefers-reduced-motion: reduce)");
const calm = () => systemCalm.matches;
document.body.classList.toggle("calm", systemCalm.matches);
systemCalm.addEventListener?.("change", (e) => document.body.classList.toggle("calm", e.matches));
store.set("calm", ""); // forget the old Calm mode switch

// ---------- Planets: the Moon and Mars pictures, turning slowly ----------
const planetFaces = document.getElementsByClassName("planet-face"); // live list
function fillPlanets(root = document) {
  $$(".disc", root).forEach((d) => {
    if (!d.firstElementChild) d.innerHTML = '<span class="planet-face"></span><span class="planet-shade"></span>';
  });
}
fillPlanets();

// Every planet turns slowly. The one on the timeline also rolls with the page:
// scroll down and it rolls left (anticlockwise), scroll up and it rolls right.
const spin = { idle: 0, rolled: 0, dir: 1, last: performance.now(), lastY: window.scrollY };
window.addEventListener("scroll", () => {
  const dy = window.scrollY - spin.lastY;
  spin.lastY = window.scrollY;
  if (!dy) return;
  spin.rolled += dy / 4;      // degrees per pixel scrolled
  spin.dir = Math.sign(dy);
}, { passive: true });

function turnPlanets(now) {
  const dt = Math.min(0.1, (now - spin.last) / 1000);
  spin.last = now;
  if (!calm()) spin.idle += dt * 6 * spin.dir; // 6 degrees a second
  for (const face of planetFaces) {
    let deg = -spin.idle;
    if (face.parentElement.id === "railDisc") deg -= spin.rolled;
    face.style.transform = `rotate(${(deg % 360).toFixed(2)}deg)`;
  }
  requestAnimationFrame(turnPlanets);
}
requestAnimationFrame(turnPlanets);

// ---------- Opening: the home page settles into place ----------
function introHome() {
  if (!hasGsap || calm()) return;
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".pill-nav a", { y: -16, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.1)
    .from(".title", { y: 30, opacity: 0, scale: 0.94, duration: 0.8 }, 0.15)
    .from(".subtitle, .ask", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.4)
    .from(".choice", { y: 40, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.55)
    .from(".choice .disc", { scale: 0.6, rotation: -40, duration: 0.9, ease: "back.out(1.6)", stagger: 0.12 }, 0.6);
}

// The far stars drift slower than the near ones as you scroll, so the sky has depth
const starLayers = $$(".space .stars");
function parallax() {
  if (calm()) return;
  const y = window.scrollY;
  starLayers.forEach((layer, k) => { layer.style.transform = `translateY(${(-y * (0.04 + k * 0.03)).toFixed(1)}px)`; });
}
window.addEventListener("scroll", parallax, { passive: true });

// The world cards lean toward the mouse a little, like a loose photo on a desk
$$(".choice").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    if (calm() || e.pointerType === "touch") return;
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-3px) rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 8).toFixed(2)}deg)`;
  });
  card.addEventListener("pointerleave", () => card.style.removeProperty("transform"));
});

// On a planet page, the left and right arrow keys switch worlds
document.addEventListener("keydown", (e) => {
  if (busy || $("#planet").hidden || document.querySelector("dialog[open]")) return;
  if (e.target.closest && e.target.closest("input, textarea")) return;
  if (e.key === "ArrowRight" && current.id === "moon") switchWorld("mars");
  if (e.key === "ArrowLeft" && current.id === "mars") switchWorld("moon");
});

// ---------- Shooting stars ----------
// Every so often a star streaks across the sky. Skipped when the device asks for less motion.
function shootingStar() {
  setTimeout(shootingStar, 7000 + Math.random() * 9000);
  if (calm() || document.hidden) return;
  const star = document.createElement("span");
  star.className = "shooting-star";
  star.style.top = 5 + Math.random() * 45 + "%";
  star.style.left = 30 + Math.random() * 65 + "%";
  star.addEventListener("animationend", () => star.remove());
  $(".space").appendChild(star);
}
setTimeout(shootingStar, 3000);

// ---------- Checkpoints: one per machine, saved in this browser ----------
const isChecked = (id) => store.get("check-" + id) === "1";
const checkedCount = (world) => world.machines.filter((m) => isChecked(m.id)).length;

// ---------- Sounds: made right here with the Web Audio API, no sound files ----------
let soundOn = store.get("sound") !== "0";
let audioCtx = null;
function setSound(on) {
  soundOn = on;
  store.set("sound", on ? "1" : "0");
  const box = document.getElementById("setSound");
  if (box) box.checked = on;
}
setSound(soundOn);
// A short rising chime for a checkpoint, a longer fanfare for the Final Mission
function playWin(big = false) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = big ? [523, 659, 784, 1047, 784, 1047, 1319] : [659, 784, 988, 1319];
    const step = big ? 0.14 : 0.1;
    const t0 = audioCtx.currentTime + 0.02;
    notes.forEach((f, k) => {
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = "triangle"; osc.frequency.value = f;
      const t = t0 + k * step, len = k === notes.length - 1 ? 0.6 : 0.22;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + len);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t); osc.stop(t + len + 0.05);
    });
  } catch { /* no Web Audio: stay quiet */ }
}

// Little stars that burst out of a point (skipped when the device asks for less motion)
function burst(host, count = 24, spread = 160) {
  host.innerHTML = "";
  if (!hasGsap || calm()) return;
  const colors = ["#5aa9ff", "#ec8a5a", "#ffe08a", "#7fd1a0", "#e6e2d8"];
  for (let k = 0; k < count; k++) {
    const p = document.createElement("span");
    p.className = k % 3 ? "spark" : "spark star";
    p.style.background = colors[k % colors.length];
    host.appendChild(p);
    const a = (k / count) * Math.PI * 2 + Math.random() * 0.3, d = spread * (0.5 + Math.random() * 0.6);
    gsap.fromTo(p, { x: 0, y: 0, scale: 0, opacity: 1 }, {
      x: Math.cos(a) * d, y: Math.sin(a) * d + 40, scale: 0.6 + Math.random(), rotation: Math.random() * 360,
      opacity: 0, duration: 1.2 + Math.random() * 0.6, ease: "power3.out", delay: Math.random() * 0.15
    });
  }
}

let cpNextIndex = null;
function showCheckpoint(i, score, total) {
  const m = current.machines[i];
  store.set("check-" + m.id, "1");
  $("#cpTitle").textContent = `${m.name} ✓`;
  $("#cpScore").textContent = `You got ${score} of ${total}.`;
  $("#cpCount").textContent = `${checkedCount(current)} of 5 ${current.planet} checkpoints done.`;
  const last = i === current.machines.length - 1;
  cpNextIndex = last ? null : i + 1;
  $("#cpNext").textContent = last ? "Go to the planet quiz" : "Next machine";
  refreshCheckpoints();
  $("#checkpoint").showModal();
  playWin(false);
  burst($("#cpBurst"));
}

function refreshCheckpoints() {
  if (current && !$("#planet").hidden) {
    $$("#railDots button").forEach((b, k) => b.classList.toggle("checked", isChecked(current.machines[k].id)));
    $("#cpTotal").textContent = `${checkedCount(current)} of 5 checkpoints`;
  }
  $$("[data-progress]").forEach((el) => {
    const n = checkedCount(WORLDS[el.dataset.progress]);
    el.textContent = n ? `${n} of 5 checkpoints ✓` : "";
  });
}

function refreshStartMarks() {
  $$("[data-done]").forEach((el) => { el.hidden = !isDone(el.dataset.done); });
  const both = isDone("moon") && isDone("mars");
  $("#finalStart").hidden = !both;
  $("#finalEnd").hidden = !both;
  $("#startBadge").hidden = store.get("badge") !== "1";
  refreshCheckpoints();
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

// "2026-11-14" -> "14 November 2026". Done by hand so time zones can't shift the day.
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const niceDate = (iso) => { const [y, mo, d] = iso.split("-").map(Number); return `${d} ${MONTHS[mo - 1]} ${y}`; };

// ---------- Text safety ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Views ----------
function leaveWorld() {
  stopReading();
  stopRecordings();
  closeTerm();
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
  homeTriggers.forEach((t) => t.enable());
  if (hasGsap) ScrollTrigger.refresh(); // the home page was hidden, so measure it again
}

function showPlanet(id) {
  leaveWorld();
  // Pause the home page's glide-ins while it is hidden. GSAP must never animate
  // hidden elements (that is what shuffled the letters before).
  homeTriggers.forEach((t) => t.disable(false));
  current = WORLDS[id];
  $("#start").hidden = true;
  $("#topbar").classList.add("in-world");
  $("#planet").hidden = false;
  $$(".switch button").forEach((b) => b.setAttribute("aria-current", String(b.dataset.go === id)));
  renderPlanet(current);
  window.scrollTo(0, 0);
  setupTimeline();
  setupMachineReveals();
  $("#planetTitle").focus({ preventScroll: true });
}

// Opening a world. The "o" in Moon (or the "a" in Mars) glows, melts into a little
// planet, a ring ripples out, and the new world opens up in a widening circle.
// Ask the browser for a world's photos straight away, so they're ready by the time you scroll to them
function preloadPhotos(id) {
  WORLDS[id].machines.forEach((m) => { const i = new Image(); i.decoding = "async"; i.src = m.image.src; });
}

function openWorld(id) {
  preloadPhotos(id);
  const letter = $(`#start:not([hidden]) .letter[data-planet="${id}"]`);
  if (!letter || !hasGsap || calm()) { showPlanet(id); return; }

  const r = letter.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height * 0.55;
  const startSize = r.height * 0.75;
  const endSize = Math.min(Math.max(120, window.innerWidth * 0.22), 168);
  const glow = id === "moon" ? "#dfe6f5" : "#ff8a4c";

  const flyer = document.createElement("span");
  flyer.className = `disc ${id} flyer`;
  Object.assign(flyer.style, { width: startSize + "px", left: cx - startSize / 2 + "px", top: cy - startSize / 2 + "px" });
  const ring = document.createElement("span");
  ring.className = "ripple";
  Object.assign(ring.style, { left: cx + "px", top: cy + "px", borderColor: glow });
  // The portal: a circle of the new world's sky that grows from the letter
  const portal = document.createElement("div");
  portal.className = "portal";
  portal.style.background = `radial-gradient(circle at ${cx}px ${cy}px, ${glow}55, #070b18 38%)`;
  portal.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;
  document.body.append(portal, ring, flyer);
  fillPlanets(document.body);
  gsap.set(flyer, { opacity: 0, scale: 0.4 });

  const others = $$("#start > *");
  const cover = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 40;
  busy = true;

  gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete() {
      showPlanet(id);
      // the real header planet takes over, and the portal melts away
      gsap.fromTo("#headDisc", { opacity: 0 }, { opacity: 1, duration: 0.25, onComplete: () => flyer.remove() });
      gsap.to(portal, { opacity: 0, duration: 0.5, ease: "power1.out", onComplete: () => portal.remove() });
      ring.remove();
      // Reset with plain style changes. Asking GSAP to clear a transform on a hidden
      // element makes it move the letter to the end of the word ("Moon" became "Mono").
      letter.style.removeProperty("transform");
      letter.style.removeProperty("opacity");
      letter.style.removeProperty("filter");
      others.forEach((el) => el.style.removeProperty("opacity"));
      busy = false;
    }
  })
    // the letter lights up and swells
    .to(letter, { scale: 1.35, filter: `drop-shadow(0 0 10px ${glow}) brightness(1.3)`, duration: 0.28, ease: "power2.out" }, 0)
    // it melts into a small planet in the same spot
    .to(letter, { opacity: 0, scale: 1.7, duration: 0.25, ease: "power2.in" }, 0.24)
    .to(flyer, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)" }, 0.26)
    // a ring ripples out from it
    .fromTo(ring, { scale: 0, opacity: 0.9 }, { scale: 9, opacity: 0, duration: 0.9, ease: "power2.out" }, 0.3)
    // the new world opens up in a widening circle, and the home page fades behind it
    .to(portal, { clipPath: `circle(${cover}px at ${cx}px ${cy}px)`, duration: 0.95, ease: "power2.inOut" }, 0.45)
    .to(others, { opacity: 0, duration: 0.4 }, 0.5)
    // the planet floats up to the top of the page
    .to(flyer, { width: endSize, left: innerWidth / 2 - endSize / 2, top: 92, duration: 1 }, 0.55);
}

// Gliding down to a part of the home page (Fun facts, Resources), the same easy
// motion as "Read it again", only downwards. Scrolling is held still while it moves.
function glideTo(target) {
  closeTerm();
  stopReading();
  const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 84);
  const done = () => { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); };
  if (!hasGsap || calm()) { window.scrollTo(0, y); done(); return; }
  busy = true;
  const s = { y: window.scrollY };
  const time = Math.min(1.6, Math.max(0.7, Math.abs(y - s.y) / 1400));
  gsap.to(s, { y, duration: time, ease: "power3.inOut", onUpdate: () => window.scrollTo(0, s.y), onComplete() { busy = false; done(); } });
}

// ---------- Things gliding in as they come into view ----------
// Each part of the site has its own move. Skipped when the device asks for less motion.
function reveal(targets, from, { trigger, stagger = 0, to = {} } = {}) {
  if (!hasGsap || calm()) return null;
  const list = gsap.utils.toArray(targets);
  if (!list.length) return null;
  const end = { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.8, ease: "power3.out", stagger, ...to };
  if ("filter" in from) end.filter = "blur(0px)";
  const tween = gsap.fromTo(list, from, {
    ...end,
    scrollTrigger: { trigger: trigger || list[0], start: "top 90%", once: true }
  });
  return tween.scrollTrigger;
}

let homeTriggers = [];
function setupHomeReveals() {
  const before = ScrollTrigger.getAll ? ScrollTrigger.getAll().length : 0;
  // headings drift up out of a soft blur
  $$(".home-block").forEach((block) => reveal($$("h2, .home-lead", block), { opacity: 0, y: 26, filter: "blur(8px)" }, { trigger: block, stagger: 0.12 }));
  // the little planets spin in
  reveal(".fact-col-head .disc", { opacity: 0, scale: 0, rotation: -200 }, { trigger: ".fact-cols", stagger: 0.15, to: { ease: "back.out(1.8)", duration: 1 } });
  // Moon facts slide in from the left, Mars facts from the right
  reveal("#moonFacts .fact-card", { opacity: 0, x: -70, rotation: -3 }, { trigger: "#moonFacts", stagger: 0.12 });
  reveal("#marsFacts .fact-card", { opacity: 0, x: 70, rotation: 3 }, { trigger: "#marsFacts", stagger: 0.12 });
  // resource columns rise one after another, then their links ripple in
  reveal(".res-cols > div", { opacity: 0, y: 60 }, { trigger: ".res-cols", stagger: 0.15 });
  $$(".res-list").forEach((list) => reveal($$("li", list), { opacity: 0, x: -18 }, { trigger: list, stagger: 0.04, to: { duration: 0.5 } }));
  reveal(".made-by", { opacity: 0, y: 12 }, { to: { duration: 1.2 } });
  if (hasGsap) homeTriggers = ScrollTrigger.getAll().slice(before);
}

function setupMachineReveals() {
  $$(".machine").forEach((m) => {
    // name, story line and photo fade up together, a beat apart
    triggers.push(reveal($$(".machine-year, h3, .talking, .photo", m), { opacity: 0, y: 28 }, { trigger: m, stagger: 0.07, to: { duration: 0.7 } }));
    // the facts settle in one by one
    triggers.push(reveal($$(".facts dt, .facts dd", m), { opacity: 0, y: 16 }, { trigger: $(".facts", m), stagger: 0.05, to: { duration: 0.6 } }));
    // recording, sources and buttons float up last
    triggers.push(reveal($$(".nasa-audio, .sources, .machine-foot", m), { opacity: 0, y: 24 }, { trigger: $(".sources", m), stagger: 0.1 }));
  });
  triggers.push(reveal("#planetEnd", { opacity: 0, scale: 0.94 }, { to: { ease: "back.out(1.4)" } }));
  triggers = triggers.filter(Boolean);
}

// Going home from a planet: the small "Mission Reborn" in the corner grows and glides
// to the middle of the screen, then settles into the big title on the home page.
function goHome() {
  const brand = $("#homeBtn .brand-long");
  const from = (brand && brand.offsetParent ? brand : $("#homeBtn")).getBoundingClientRect();
  if (!hasGsap || calm() || $("#planet").hidden) { showStart(); return; }
  busy = true;
  stopReading();
  stopRecordings();

  const big = document.createElement("div");
  big.className = "title fly-title";
  big.textContent = "Mission Reborn";
  document.body.appendChild(big);
  const bigBox = big.getBoundingClientRect();
  const startScale = from.height / bigBox.height;
  gsap.set(big, { left: from.left + from.width / 2, top: from.top + from.height / 2, xPercent: -50, yPercent: -50, scale: startScale });

  const homeTitle = $("#title");
  gsap.timeline({
    onComplete() {
      big.remove();
      homeTitle.style.removeProperty("visibility");
      $("#start").style.removeProperty("opacity");
      busy = false;
    }
  })
    // the planet page fades while the title grows into the middle
    .to("#planet", { opacity: 0, duration: 0.4, ease: "power1.in" }, 0)
    .to(big, { left: innerWidth / 2, top: innerHeight / 2, scale: 1.08, duration: 0.7, ease: "power3.inOut" }, 0)
    .add(() => {
      showStart();
      $("#planet").style.removeProperty("opacity"); // plain reset: never animate the hidden page
      homeTitle.style.visibility = "hidden";
      $("#start").style.opacity = "0";
      gsap.to("#start", { opacity: 1, duration: 0.5, ease: "power1.out" });
    }, 0.72)
    // then it settles into its place on the home page
    .add(() => {
      const to = homeTitle.getBoundingClientRect();
      gsap.to(big, { left: to.left + to.width / 2, top: to.top + to.height / 2, scale: 1, duration: 0.55, ease: "power2.out" });
    }, 0.75)
    .to({}, { duration: 0.6 }, 0.75);
}

// ---------- Building a world from its data ----------
function photoHtml(m, i) {
  const img = m.image;
  const tagClass = img.type === "NASA photo" ? "real" : "other";
  return `
      <figure class="photo">
        <button class="photo-zoom" type="button" data-image="${i}" aria-label="View larger image of ${esc(m.name)}">
          <span class="photo-frame" style="--ar:${(img.width / img.height).toFixed(4)}">
            <img src="${esc(img.src)}" alt="${esc(img.alt)}" width="${img.width}" height="${img.height}" decoding="async">
          </span>
        </button>
        <figcaption>
          <span class="tag ${tagClass}">${esc(img.type)}</span>
          ${img.note ? `<span>${esc(img.note)}</span>` : ""}
          <span>Credit: <a href="${esc(img.from)}" target="_blank" rel="noopener">${esc(img.credit)}</a></span>
        </figcaption>
      </figure>`;
}

// Tap-to-explain: turn the first use of each word in m.words into a button.
// Placeholders keep a later word from matching inside a button we already added.
function termifier(m, i) {
  const words = m.words || [];
  const used = new Set();
  return (text) => {
    let html = esc(text);
    const made = [];
    words.forEach((w, k) => {
      if (used.has(w.term.toLowerCase())) return;
      const re = new RegExp(`\\b${esc(w.term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      html = html.replace(re, (found) => {
        used.add(w.term.toLowerCase());
        made.push(`<button type="button" class="term" data-term="${i}-${k}" aria-expanded="false" aria-controls="termPop">${found}</button>`);
        return `\u0000${made.length - 1}\u0000`;
      });
    });
    return html.replace(/\u0000(\d+)\u0000/g, (_, n) => made[n]);
  };
}

function machineHtml(m, i) {
  const t = termifier(m, i);
  return `
    <article class="machine" id="m-${i}" aria-labelledby="m-${i}-name">
      <p class="machine-year"><span class="machine-no">${i + 1} of 5</span><span class="year-num">${m.year}</span> Launched ${esc(m.launched)}</p>
      <h3 id="m-${i}-name">${esc(m.name)}</h3>
      <p class="talking"><span class="sr">Story line, in the machine's voice: </span>“${esc(m.talkingLine)}”</p>
      ${photoHtml(m, i)}
      <dl class="facts">
        <dt>What it was</dt><dd>${t(m.whatItWas)}</dd>
        <dt>${esc(m.carriedLabel || "What it carried")}</dt>
        <dd><ul>${m.carried.map((c) => `<li>${t(c)}</li>`).join("")}</ul></dd>
        <dt>What happened to it</dt><dd>${t(m.whatHappened)}</dd>
        <dt>Where it is now</dt><dd>${t(m.whereItIsNow)}</dd>
      </dl>
      <div class="sources">
        <p class="sources-head">Where we got this</p>
        <ul>${m.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join("")}</ul>
        ${m.sourceChecked
          ? `<p class="checked">Our team checked these pages on ${esc(niceDate(m.sourceChecked))}.</p>`
          : `<p class="unchecked">Not fact-checked yet</p>`}
      </div>
      ${m.audio ? `
      <figure class="nasa-audio">
        <button class="btn" type="button" data-audio="${i}" aria-pressed="false">▶ Hear the real recording</button>
        <figcaption>${esc(m.audio.caption)} <span class="audio-credit">Audio: <a href="${esc(m.audio.page)}" target="_blank" rel="noopener">${esc(m.audio.credit)}</a></span></figcaption>
        <audio preload="none" src="${esc(m.audio.src)}"></audio>
      </figure>` : ""}
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
      const box = document.createElement("span"); // it sits inside the zoom button, so a span
      box.className = "photo-missing";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", img.alt);
      box.textContent = "Photo didn't load. " + img.alt;
      img.replaceWith(box);
    };
    // Only trust the error event. Safari reports lazy photos that haven't started
    // loading as "complete" with zero width, so checking that hid good photos.
    img.addEventListener("error", fail, { once: true });
  });

  $("#railDots").innerHTML = world.machines.map((m, i) => `
    <li><button type="button" data-jump="${i}" aria-label="Jump to ${esc(m.name)}, launched ${m.year}"><span>${m.year}</span></button></li>`).join("");

  $("#cpTotal").textContent = "";
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
  // Web fonts can arrive after this runs and move the text, so measure again then
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => hasGsap ? ScrollTrigger.refresh() : placeDots());
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
      $("#headDisc").removeAttribute("style");
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

// Scroll smoothly back to the top. The blue line drains as the page rises, and the
// timeline planet swings out to the right and lands back on the line.
function rewindToTop(then) {
  stopReading();
  closeTerm();
  if (!hasGsap || calm()) { window.scrollTo(0, 0); then(); return; }
  busy = true;
  const disc = $("#railDisc");
  const scroller = { y: window.scrollY };
  const time = Math.min(1.5, Math.max(0.5, window.scrollY / 3000));

  gsap.timeline({
    onComplete() {
      disc.style.removeProperty("transform");
      then();
    }
  })
    .to(scroller, { y: 0, duration: time, ease: "power2.inOut", onUpdate: () => window.scrollTo(0, scroller.y) }, 0)
    .to(disc, { x: 120, scaleX: 1.5, scaleY: 1.15, duration: time * 0.4, ease: "power2.out" }, 0)
    .to(disc, { x: 0, scaleX: 1, scaleY: 1, duration: time * 0.55, ease: "back.out(1.4)" }, time * 0.43);
}

function readAgain() {
  rewindToTop(() => {
    busy = false;
    $("#planetTitle").focus({ preventScroll: true });
  });
}

// Going to the other world: rise to the top, then slide between the worlds.
function switchWorld(id) {
  if (current && current.id === id) return;
  rewindToTop(() => {
    if (!hasGsap || calm()) { busy = false; showPlanet(id); return; }
    gsap.to("#planet", { x: -innerWidth, duration: 0.38, ease: "power2.in", onComplete() {
      showPlanet(id);
      gsap.fromTo("#planet", { x: innerWidth }, { x: 0, duration: 0.48, ease: "power2.out", onComplete() { busy = false; } });
    }});
  });
}

// ---------- One quiz box, reused for all 13 quizzes ----------
function openQuiz(title, questions, { final = false, machine = null } = {}) {
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
    if (hasGsap && !calm()) gsap.from($$(".options button", body), { opacity: 0, x: 30, duration: 0.35, stagger: 0.06, ease: "power2.out" });
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
    const msg = all ? "You got every one. You were really paying attention."
      : score >= questions.length / 2 ? "Nice! Try again and see if you can get them all."
      : "These are tricky. Have another look at the machines, then try again.";
    if (machine !== null) {
      body.innerHTML = "";
      dialog.close();
      showCheckpoint(machine, score, questions.length);
      return;
    }
    if (final) {
      store.set("badge", "1");
      body.innerHTML = "";
      dialog.close();
      celebrate(score, questions.length);
      return;
    }
    body.innerHTML = `
      <p class="score">${score} of ${questions.length}</p>
      <p>${msg}</p>
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

// ---------- Victory: finishing the Final Mission ----------
function celebrate(score, total) {
  $("#victoryScore").textContent = `You scored ${score} of ${total} and visited 10 machines on 2 worlds.`;
  $("#victory").showModal();
  playWin(true);
  burst($("#victoryBurst"), 46, 300);
  if (!hasGsap || calm()) return;
  gsap.timeline()
    .fromTo(".victory-planets", { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" })
    .fromTo(".victory h2", { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.35)
    .fromTo(".victory-rest", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.7);
}
// Back to the home page, where the Explorer badge now sits above the title.
// Runs from the button, and from Escape (the dialog's close event).
function leaveVictory() {
  if ($("#victory").open) $("#victory").close();
  if (!$("#start").hidden) return; // already home
  showStart();
  if (hasGsap && !calm()) gsap.fromTo("#startBadge", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 0.1 });
}
$("#victory").addEventListener("close", leaveVictory);

// ---------- Home page: fun facts and the list of NASA pages ----------
function renderHome() {
  [MOON, MARS].forEach((w) => {
    $(`#${w.id}Facts`).innerHTML = `
      <p class="fact-col-head"><span class="disc ${w.id}" aria-hidden="true"></span>${esc(w.planet)}</p>
      ${w.funFacts.map((f) => `
        <figure class="fact-card">
          <p>${esc(f.text)}</p>
          <a href="${esc(f.source.url)}" target="_blank" rel="noopener" title="${esc(f.quote)}">Source: ${esc(f.source.label)}</a>
        </figure>`).join("")}`;
    const seen = new Set();
    $(`#${w.id}Res`).innerHTML = w.machines.flatMap((m) => m.sources)
      .filter((s) => !seen.has(s.url) && seen.add(s.url))
      .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join("");
  });
  fillPlanets($("#start"));
}

// ---------- Read aloud (the browser's built-in voice) ----------
// Browsers ship several voices. The "Natural" / "Online" ones (Edge, Windows 11,
// newer Macs and Chromebooks) sound like a person; the oldest ones sound robotic.
// We pick the best English voice this device has.
let voice = null;
const MALE_VOICES = /andrew|brian|guy|christopher|eric|roger|steffan|davis|tony|jason|aaron|alex|evan|nathan|tom|david|mark|\bmale/i;
const FEMALE_VOICES = /aria|jenny|ava|emma|michelle|ana\b|zira|samantha|karen|moira|susan|hazel|libby|sonia|female/i;
function pickVoice() {
  // We want a friendly, upbeat American man's voice: natural voices first,
  // then male US voices, and never the old novelty voices.
  const score = (v) =>
    (/natural|neural|online|premium|enhanced/i.test(v.name) ? 100 : 0) +
    (MALE_VOICES.test(v.name) ? (voicePref === "male" ? 60 : -20) : 0) +
    (FEMALE_VOICES.test(v.name) ? (voicePref === "female" ? 60 : -20) : 0) +
    (/^en[-_]us/i.test(v.lang) ? 20 : /^en/i.test(v.lang) ? 5 : 0) +
    (/espeak|fred|albert|zarvox|whisper|bad news|bells|boing|bubbles|cellos|trinoids|organ/i.test(v.name) ? -100 : 0);
  const english = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
  voice = english.sort((a, b) => score(b) - score(a))[0] || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
}

// What gets said: written like a narrator talking, one sentence at a time
function speechLines(m) {
  const tidy = (t) => t.replace(/[“”"]/g, "").replace(/\s*\(([^)]*)\)/g, ", $1,").replace(/,([.,!])/g, "$1");
  const sentences = (t) => tidy(t).split(/(?<=[.!?])\s+(?=[A-Z0-9])/);
  return [
    `Let's meet ${/^(Apollo|Viking|InSight|Ingenuity)/.test(m.name) ? "the " : ""}${tidy(m.name).replace(/, (Mars Pathfinder)$/, ", from $1")}!`,
    `Launched ${m.launched}.`,
    ...sentences(m.whatItWas),
    m.carriedLabel ? "Here's what each one carried." : "Here's what it carried.",
    ...m.carried.map((c) => tidy(c).replace(/[.]?$/, ".")),
    ...sentences(m.whatHappened),
    "So where is it now?",
    ...sentences(m.whereItIsNow)
  ];
}

let readingBtn = null;
// Only one recording plays at a time
function stopRecordings() {
  $$(".nasa-audio audio").forEach((a) => { a.pause(); });
  $$("[data-audio]").forEach((b) => { b.textContent = "▶ Hear the real recording"; b.setAttribute("aria-pressed", "false"); });
}
function toggleRecording(btn) {
  const audio = btn.parentElement.querySelector("audio");
  const playing = !audio.paused;
  stopRecordings();
  if (playing) return;
  stopReading();
  audio.currentTime = 0;
  audio.play().then(() => {
    btn.textContent = "■ Stop the recording";
    btn.setAttribute("aria-pressed", "true");
  }).catch(() => { btn.textContent = "Couldn't play this here"; });
  audio.onended = () => stopRecordings();
}

// Recorded narration (ElevenLabs), one file per machine and voice. If a file is
// missing or can't play, the browser's own voice reads it instead.
const narrationFile = (id) => `audio/voice/${voicePref}/${id}.mp3`;
// Turn this on once the ElevenLabs files are in audio/voice/. Until then we skip
// asking for them, so there's no "file not found" every time someone presses Read aloud.
const HAS_NARRATION = false;
let narrator = null;

function stopReading() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  if (narrator) { narrator.pause(); narrator = null; }
  if (readingBtn) {
    readingBtn.textContent = readingBtn.id === "voicePreview" ? "▶ Try it" : "Read aloud";
    readingBtn.setAttribute("aria-pressed", "false");
    readingBtn = null;
  }
}
function readAloud(btn, m) {
  if (readingBtn === btn) { stopReading(); return; }
  stopReading();
  stopRecordings();
  readingBtn = btn;
  btn.textContent = "Stop reading";
  btn.setAttribute("aria-pressed", "true");
  if (!HAS_NARRATION) { speakWithBrowser(btn, m); return; }
  const player = new Audio(narrationFile(m.id));
  narrator = player;
  player.onended = () => { if (readingBtn === btn) stopReading(); };
  player.play().catch(() => {
    if (narrator !== player) return; // stopped already
    narrator = null;
    speakWithBrowser(btn, m);
  });
}

function speakWithBrowser(btn, m) {
  if (!("speechSynthesis" in window)) { stopReading(); btn.textContent = "Not supported here"; btn.disabled = true; return; }
  pickVoice();
  const lines = speechLines(m);
  // One sentence per utterance: the browser pauses between them like a person
  // taking a breath, and long text doesn't get cut off in Chrome.
  lines.forEach((line, n) => {
    const say = new SpeechSynthesisUtterance(line);
    if (voice) say.voice = voice;
    say.lang = voice ? voice.lang : "en-US";
    say.rate = 1.0;   // a lively, natural pace
    say.pitch = 1.05; // a touch brighter, so it sounds interested
    if (n === lines.length - 1) say.onend = () => { if (readingBtn === btn) stopReading(); };
    speechSynthesis.speak(say);
  });
}

// ---------- Settings: voice, theme, colour, sound, calm ----------
const DEFAULT_ACCENT = "#5aa9ff";
var voicePref = store.get("voice") === "female" ? "female" : "male";
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  store.set("theme", theme);
}
function applyAccent(color) {
  document.documentElement.style.setProperty("--read", color);
  store.set("accent", color);
  $("#accentCustom").value = color;
  $$('input[name="accent"]').forEach((r) => { r.checked = r.value.toLowerCase() === color.toLowerCase(); });
}
function syncSettings() {
  $$('input[name="voice"]').forEach((r) => { r.checked = r.value === voicePref; });
  $$('input[name="theme"]').forEach((r) => { r.checked = r.value === (document.documentElement.dataset.theme || "dark"); });
  $("#setSound").checked = soundOn;
}
applyTheme(store.get("theme") === "light" ? "light" : "dark");
applyAccent(store.get("accent") || DEFAULT_ACCENT);

$("#settings").addEventListener("change", (e) => {
  const el = e.target;
  if (el.name === "voice") { voicePref = el.value; store.set("voice", el.value); stopReading(); }
  else if (el.name === "theme") applyTheme(el.value);
  else if (el.name === "accent") applyAccent(el.value);
  else if (el.id === "setSound") setSound(el.checked);
});
$("#accentCustom").addEventListener("input", (e) => applyAccent(e.target.value));

function openSettings() {
  stopReading();
  closeTerm();
  syncSettings();
  $("#settings").showModal();
}
// "Try it": the first machine in the chosen voice
function previewVoice(btn) {
  if (readingBtn === btn) { stopReading(); return; }
  readAloud(btn, MOON.machines[0]);
  btn.textContent = "■ Stop";
}

// ---------- Tap-to-explain popup ----------
let termBtn = null;
function closeTerm(returnFocus = false) {
  if (!termBtn) return;
  termBtn.setAttribute("aria-expanded", "false");
  if (returnFocus) termBtn.focus();
  termBtn = null;
  $("#termPop").hidden = true;
}
function openTerm(btn) {
  if (termBtn === btn) { closeTerm(); return; }
  closeTerm();
  const [i, k] = btn.dataset.term.split("-").map(Number);
  const w = current.machines[i].words[k];
  const pop = $("#termPop");
  pop.innerHTML = `<strong>${esc(w.term)}</strong> ${esc(w.meaning)}`;
  pop.hidden = false;
  // Sit just under the word, kept 16px inside the screen edges
  const r = btn.getBoundingClientRect();
  const width = Math.min(300, document.documentElement.clientWidth - 32);
  const left = Math.min(Math.max(16, r.left + r.width / 2 - width / 2), document.documentElement.clientWidth - 16 - width);
  Object.assign(pop.style, { width: width + "px", left: left + window.scrollX + "px", top: r.bottom + window.scrollY + 8 + "px" });
  btn.setAttribute("aria-expanded", "true");
  termBtn = btn;
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTerm(true); });
window.addEventListener("resize", () => closeTerm());

// ---------- Clicks ----------
document.addEventListener("click", (e) => {
  if (termBtn && !e.target.closest(".term, #termPop")) closeTerm();
  const t = e.target.closest("button, a");
  if (!t || busy) return;
  if (t.matches(".pill-nav a")) { e.preventDefault(); glideTo($(t.getAttribute("href"))); return; }

  if (t.hasAttribute("data-settings")) openSettings();
  else if (t.id === "imageViewerClose") $("#imageViewer").close();
  else if (t.id === "victoryHome") leaveVictory();
  else if (t.dataset.image !== undefined) {
    const m = current.machines[Number(t.dataset.image)];
    $("#imageViewerTitle").textContent = m.name;
    $("#imageViewerImage").src = m.image.src;
    $("#imageViewerImage").alt = m.image.alt;
    $("#imageViewerCredit").textContent = `${m.image.type} · Credit: ${m.image.credit}`;
    $("#imageViewer").showModal();
  }
  else if (t.hasAttribute("data-settings-close")) { stopReading(); $("#settings").close(); }
  else if (t.id === "voicePreview") previewVoice(t);
  else if (t.id === "setReset") {
    voicePref = "male"; store.set("voice", "male");
    applyTheme("dark"); applyAccent(DEFAULT_ACCENT); setSound(true);
    syncSettings();
  }
  else if (t.dataset.audio) toggleRecording(t);
  else if (t.id === "cpStay") $("#checkpoint").close();
  else if (t.id === "cpNext") {
    $("#checkpoint").close();
    const target = cpNextIndex === null ? $("#planetEnd") : $("#m-" + cpNextIndex);
    target.scrollIntoView({ behavior: calm() ? "auto" : "smooth", block: "start" });
  }
  else if (t.hasAttribute("data-help")) openHelp();
  else if (t.hasAttribute("data-help-close")) $("#help").close();
  else if (t.classList.contains("term")) openTerm(t);

  else if (t.dataset.go) {
    // From the end of a planet, go via the start screen so the next letter can turn into its world
    if (t.id === "otherBtn" || t.closest(".switch")) switchWorld(t.dataset.go);
    else openWorld(t.dataset.go);
  }
  else if (t.id === "homeBtn") goHome();
  else if (t.dataset.jump) {
    const target = $("#m-" + t.dataset.jump);
    target.scrollIntoView({ behavior: calm() ? "auto" : "smooth", block: "start" });
    $("h3", target).setAttribute("tabindex", "-1");
    $("h3", target).focus({ preventScroll: true });
  }
  else if (t.dataset.quiz) {
    const m = current.machines[Number(t.dataset.quiz)];
    openQuiz(`${m.name}: check your knowledge`, m.quiz, { machine: Number(t.dataset.quiz) });
  }
  else if (t.dataset.read) readAloud(t, current.machines[Number(t.dataset.read)]);
  else if (t.id === "planetQuizBtn") openQuiz(`The ${current.planet} Quiz`, current.machines.map((m) => m.quiz[0]));
  else if (t.id === "againBtn") readAgain();
  else if (t.hasAttribute("data-final")) openQuiz(FINAL.title, FINAL.questions, { final: true });
  else if (t.id === "quizClose") $("#quiz").close();
});

window.addEventListener("resize", () => { if (hasGsap) ScrollTrigger.refresh(); });

// ---------- How to use: once on the first visit, then only from the ? button ----------
function openHelp() {
  stopReading();
  closeTerm();
  $("#help").showModal();
}
// Closing it any way (button, ✕, Escape) counts as seen
$("#help").addEventListener("close", () => store.set("help-seen", "1"));

renderHome();
setupHomeReveals();
introHome();
refreshStartMarks();
if (store.get("help-seen") !== "1") openHelp();
