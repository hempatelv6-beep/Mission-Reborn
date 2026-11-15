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

// ---------- Planets: paint a flat map once, then spin it inside each circle ----------
// Positions use real longitude/latitude, so the Moon's dark seas and Mars' dark
// regions sit roughly where they are on the real worlds. Stylised, not a photo.
const MAP_W = 1024, MAP_H = 512;
const lonX = (lon) => (lon + 180) / 360 * MAP_W;
const latY = (lat) => (90 - lat) / 180 * MAP_H;
const DEG = MAP_W / 360;

function paintMap(world) {
  const c = document.createElement("canvas");
  c.width = MAP_W; c.height = MAP_H;
  const g = c.getContext("2d");
  let seed = world === "moon" ? 7 : 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  // Draw at x and one map-width either side, so the map joins up when it wraps around
  const wrap = (fn) => [-MAP_W, 0, MAP_W].forEach((dx) => { g.save(); g.translate(dx, 0); fn(); g.restore(); });
  // A soft-edged patch. Shadow blur works in every browser (canvas filters don't).
  const patch = (lon, lat, rx, ry, color, blur = 10, rot = 0) => wrap(() => {
    g.shadowColor = color; g.shadowBlur = blur; g.shadowOffsetX = 4000;
    g.fillStyle = "#000";
    g.beginPath(); g.ellipse(lonX(lon) - 4000, latY(lat), rx * DEG, ry * DEG, rot, 0, Math.PI * 2); g.fill();
    g.shadowColor = "transparent";
  });
  // A region built from many overlapping soft patches, so its edge is ragged like the real thing
  const region = (lon, lat, rx, ry, color, blur, base) => {
    // one big, very soft shape underneath, then ragged patches on top
    patch(lon, lat, rx * 0.95, ry * 0.95, base, Math.min(rx, ry) * DEG * 0.9);
    const n = Math.round((rx * ry) / 8) + 5;
    for (let k = 0; k < n; k++) {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * 0.8;
      const size = Math.sqrt(rx * ry) * (0.3 + rnd() * 0.35);
      patch(lon + Math.cos(a) * rx * d, lat + Math.sin(a) * ry * d, size * (0.8 + rnd() * 0.6), size * (0.6 + rnd() * 0.5), color, blur, rnd() * Math.PI);
    }
  };
  const grain = (n, light, dark) => {
    for (let k = 0; k < n; k++) {
      g.fillStyle = rnd() < 0.5 ? light : dark;
      g.fillRect(rnd() * MAP_W, rnd() * MAP_H, 1 + rnd() * 2, 1 + rnd() * 2);
    }
  };
  const crater = (x, y, r, dark, light) => wrap(() => {
    g.fillStyle = dark; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    g.strokeStyle = light; g.lineWidth = Math.max(1, r * 0.35);
    g.beginPath(); g.arc(x, y, r, Math.PI * 0.55, Math.PI * 1.55); g.stroke();
  });

  if (world === "moon") {
    g.fillStyle = "#aeaba4"; g.fillRect(0, 0, MAP_W, MAP_H);
    for (let k = 0; k < 70; k++) patch(rnd() * 360 - 180, rnd() * 160 - 80, 6 + rnd() * 18, 5 + rnd() * 12, rnd() < 0.5 ? "#c4c1ba55" : "#8e8b8455", 24);
    const sea = "#57565a38";
    // Near side seas (maria)
    [[-57, 20, 15, 20], [-45, 2, 13, 13], [-62, -6, 9, 11], [-38, 12, 10, 9], // Oceanus Procellarum
     [-16, 33, 17, 13], [17, 28, 10, 9], [31, 8, 12, 10], [4, 13, 6, 5], // Imbrium, Serenitatis, Tranquillitatis, Vaporum
     [59, 17, 7, 6], [51, -8, 8, 9], [35, -15, 5, 5], [-17, -21, 10, 8], [-39, -24, 6, 6], // Crisium, Fecunditatis, Nectaris, Nubium, Humorum
     [0, 56, 32, 3.5], [147, 27, 5, 4], [-95, -20, 4, 4]] // Frigoris, Moscoviense (far side), Orientale
      .forEach(([lon, lat, rx, ry]) => region(lon, lat, rx, ry, sea, 16, "#57565a90"));
    for (let k = 0; k < 420; k++) {
      const r = rnd() < 0.93 ? 1 + rnd() * 2.5 : 3 + rnd() * 6;
      crater(rnd() * MAP_W, 20 + rnd() * (MAP_H - 40), r, "#00000016", "#ffffff22");
    }
    // Tycho and Copernicus: young, bright craters with rays
    [[-11, -43, 150], [-20, 10, 80]].forEach(([lon, lat, len]) => wrap(() => {
      const x = lonX(lon), y = latY(lat);
      g.strokeStyle = "#ffffff0d"; g.lineWidth = 3;
      for (let k = 0; k < 14; k++) {
        const a = rnd() * Math.PI * 2, l = len * (0.25 + rnd() * 0.4);
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
      }
      g.fillStyle = "#ebe8e1"; g.beginPath(); g.arc(x, y, 3, 0, Math.PI * 2); g.fill();
    }));
    grain(9000, "#ffffff10", "#00000012");
  } else {
    const sky = g.createLinearGradient(0, 0, 0, MAP_H);
    sky.addColorStop(0, "#c98a64"); sky.addColorStop(0.18, "#c4693c"); sky.addColorStop(0.5, "#cb7244");
    sky.addColorStop(0.82, "#bd6439"); sky.addColorStop(1, "#c79474");
    g.fillStyle = sky; g.fillRect(0, 0, MAP_W, MAP_H);
    for (let k = 0; k < 80; k++) patch(rnd() * 360 - 180, rnd() * 140 - 70, 8 + rnd() * 20, 4 + rnd() * 10, rnd() < 0.55 ? "#e3a06e40" : "#9a462240", 26);
    patch(0, -26, 190, 13, "#8a3c2244", 40); // the broad darker belt across the south
    const dark = "#6b2c1738";
    [[70, 10, 8, 15], [66, -4, 6, 8], [-30, 45, 18, 8], [0, -5, 14, 4], [25, -8, 22, 4], // Syrtis Major, Acidalia, Meridiani, Sabaeus
     [-40, -25, 24, 7], [-10, -28, 18, 6], [140, -25, 26, 7], [105, -18, 16, 6], [-150, -30, 20, 6], // southern dark band
     [110, 45, 22, 7], [-90, -27, 6, 5]] // Utopia, Solis Lacus
      .forEach(([lon, lat, rx, ry]) => region(lon, lat, rx, ry, dark, 20, "#6b2c1770"));
    // Valles Marineris, the giant canyon: a soft dark scar
    wrap(() => {
      g.shadowColor = "#5a2414a0"; g.shadowBlur = 5; g.shadowOffsetX = 4000;
      g.strokeStyle = "#000"; g.lineWidth = 4; g.lineCap = "round";
      g.beginPath(); g.moveTo(lonX(-95) - 4000, latY(-7)); g.quadraticCurveTo(lonX(-70) - 4000, latY(-12), lonX(-45) - 4000, latY(-13)); g.stroke();
      g.shadowColor = "transparent";
    });
    // Tharsis volcanoes, Olympus Mons the biggest
    [[-134, 18, 9], [-104, 11, 4], [-113, 1, 4], [-121, -9, 4]].forEach(([lon, lat, r]) => {
      crater(lonX(lon), latY(lat), r * 0.45 * DEG / 2.5, "#7d351c80", "#f0b48a66");
      patch(lon, lat, r * 0.9, r * 0.8, "#e9a87455", 8);
    });
    patch(70, -42, 14, 9, "#f2c39c70", 16); // Hellas basin
    patch(-43, -50, 6, 5, "#f2c39c55", 10); // Argyre
    for (let k = 0; k < 140; k++) crater(rnd() * MAP_W, 30 + rnd() * (MAP_H - 60), 1 + rnd() * 4, "#00000018", "#ffffff18");
    grain(9000, "#ffffff0d", "#00000014");
  }
  return c.toDataURL("image/jpeg", 0.88);
}

const planetMaps = document.getElementsByClassName("planet-map"); // live list
function fillPlanets(root = document) {
  $$(".disc", root).forEach((d) => {
    if (d.firstElementChild) return;
    const phase = d.classList.contains("mars") ? 0.33 : 0.25; // starts on the side we know best
    d.innerHTML = `<span class="planet-map" data-phase="${phase}"></span><span class="planet-caps"></span>`;
  });
}
try {
  document.documentElement.style.setProperty("--moon-map", `url(${paintMap("moon")})`);
  document.documentElement.style.setProperty("--mars-map", `url(${paintMap("mars")})`);
} catch { /* no canvas: the plain colour circles still show */ }
fillPlanets();

// Every planet turns slowly all the time. The one on the timeline also rolls with
// the page: scroll down and it rolls left, scroll up and it rolls right.
const spin = { idle: 0, rolled: 0, dir: 1, last: performance.now(), lastY: window.scrollY };
window.addEventListener("scroll", () => {
  const dy = window.scrollY - spin.lastY;
  spin.lastY = window.scrollY;
  if (!dy) return;
  spin.rolled += dy / 2600;
  spin.dir = Math.sign(dy);
}, { passive: true });

function turnPlanets(now) {
  const dt = Math.min(0.1, (now - spin.last) / 1000);
  spin.last = now;
  if (!calm()) spin.idle += (dt / 55) * spin.dir; // about one turn a minute
  for (const map of planetMaps) {
    let f = Number(map.dataset.phase) + spin.idle;
    if (map.parentElement.id === "railDisc") f += spin.rolled;
    f = ((f % 1) + 1) % 1;
    map.style.transform = `translateX(${(-f * 50).toFixed(3)}%)`;
  }
  requestAnimationFrame(turnPlanets);
}
requestAnimationFrame(turnPlanets);

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

// "2026-11-14" -> "14 November 2026". Done by hand so time zones can't shift the day.
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const niceDate = (iso) => { const [y, mo, d] = iso.split("-").map(Number); return `${d} ${MONTHS[mo - 1]} ${y}`; };

// ---------- Text safety ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Views ----------
function leaveWorld() {
  stopReading();
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
  fillPlanets(document.body);
  gsap.set(flyer, { opacity: 0 });

  const others = $$("#start > *");
  busy = true;

  gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete() {
      showPlanet(id);
      // the real header planet takes over from the flying one
      gsap.fromTo("#headDisc", { opacity: 0 }, { opacity: 1, duration: 0.2, onComplete: () => flyer.remove() });
      gsap.set([letter, ...others], { clearProps: "opacity,scale" });
      busy = false;
    }
  })
    // the letter swells and melts into a small planet in the same spot
    .to(letter, { scale: 1.3, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
    .to(flyer, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.05)
    .to(others, { opacity: 0, duration: 0.35 }, 0.2)
    // then it grows and floats up to the top of the page
    .to(flyer, {
      width: endSize,
      left: window.innerWidth / 2 - endSize / 2,
      top: 92,
      duration: 0.9
    }, 0.3);
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
      <p class="machine-year"><span class="year-num">${m.year}</span> Launched ${esc(m.launched)}</p>
      <h3 id="m-${i}-name">${esc(m.name)}</h3>
      <p class="talking"><span class="sr">Story line, in the machine's voice: </span>“${esc(m.talkingLine)}”</p>
      ${photoHtml(m)}
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
    const msg = all ? "You got every one. You were really paying attention."
      : score >= questions.length / 2 ? "Nice! Try again and see if you can get them all."
      : "These are tricky. Have another look at the machines, then try again.";
    if (final) { store.set("badge", "1"); refreshStartMarks(); }
    body.innerHTML = `
      <p class="score">${score} of ${questions.length}</p>
      <p>${msg}</p>
      ${final ? `<div class="badge"><span class="badge-ring" aria-hidden="true"><span class="disc moon"></span><span class="disc mars"></span></span><strong>${esc(FINAL.badge)}</strong>You visited 10 machines on 2 worlds.</div>` : ""}
      <div class="quiz-actions">
        <button class="btn primary" type="button" id="qAgain">Try again</button>
        <button class="btn" type="button" id="qDone">Close</button>
      </div>`;
    fillPlanets(body);
    $("#qAgain").addEventListener("click", () => { i = 0; score = 0; ask(); });
    $("#qDone").addEventListener("click", () => dialog.close());
    $("#qAgain").focus();
  }

  ask();
  dialog.showModal();
}

// ---------- Read aloud (the browser's built-in voice) ----------
// Browsers ship several voices. The "Natural" / "Online" ones (Edge, Windows 11,
// newer Macs and Chromebooks) sound like a person; the oldest ones sound robotic.
// We pick the best English voice this device has.
let voice = null;
function pickVoice() {
  const score = (v) =>
    (/natural|neural|online|premium|enhanced/i.test(v.name) ? 100 : 0) +
    (/aria|jenny|ava|emma|andrew|brian|guy|sonia|libby|ryan|samantha|daniel|karen|google us english|google uk english/i.test(v.name) ? 30 : 0) +
    (/^en[-_](us|gb)/i.test(v.lang) ? 10 : 0) +
    (/zira|david|mark|hazel|espeak|fred|albert/i.test(v.name) ? -40 : 0);
  const english = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
  voice = english.sort((a, b) => score(b) - score(a))[0] || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
}

// What gets said: written like a narrator talking, one sentence at a time
function speechLines(m) {
  const tidy = (t) => t.replace(/[“”"]/g, "").replace(/\s*\(([^)]*)\)/g, ", $1,").replace(/,([.,])/g, "$1");
  const sentences = (t) => tidy(t).split(/(?<=[.!?])\s+(?=[A-Z0-9])/);
  return [
    `${tidy(m.name)}.`,
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
  if (!voice) pickVoice();
  const lines = speechLines(m);
  // One sentence per utterance: the browser pauses between them like a person
  // taking a breath, and long text doesn't get cut off in Chrome.
  lines.forEach((line, n) => {
    const say = new SpeechSynthesisUtterance(line);
    if (voice) say.voice = voice;
    say.lang = voice ? voice.lang : "en-US";
    say.rate = 0.92;
    say.pitch = 1.03;
    if (n === lines.length - 1) say.onend = () => { if (readingBtn === btn) stopReading(); };
    speechSynthesis.speak(say);
  });
  readingBtn = btn;
  btn.textContent = "Stop reading";
  btn.setAttribute("aria-pressed", "true");
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

  if (t.hasAttribute("data-help")) openHelp();
  else if (t.hasAttribute("data-help-close")) $("#help").close();
  else if (t.classList.contains("term")) openTerm(t);
  else if (t.hasAttribute("data-calm")) setCalm(!calm());
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

// ---------- How to use: once on the first visit, then only from the ? button ----------
function openHelp() {
  stopReading();
  closeTerm();
  $("#help").showModal();
}
// Closing it any way (button, ✕, Escape) counts as seen
$("#help").addEventListener("close", () => store.set("help-seen", "1"));

refreshStartMarks();
if (store.get("help-seen") !== "1") openHelp();
