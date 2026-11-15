# How the site is put together

Mission Reborn is a single-page site. It uses HTML, CSS, and JavaScript, with no build step or server code. GSAP and ScrollTrigger load from jsDelivr for the animations.

```text
index.html
  ├─ styles.css
  ├─ data/moon.js, data/mars.js, data/final.js
  ├─ GSAP + ScrollTrigger (CDN)
  └─ app.js
       ├─ builds the planet pages and quizzes from the data
       ├─ saves progress and settings in localStorage
       └─ loads photos from images/moon/ and images/mars/
```

## Main files

- **`index.html`** holds the start screen, planet view, navigation, toast, and quiz dialog. Its script order matters: data first, then GSAP, then `app.js`.
- **`styles.css`** controls layout, colors, type, the timeline, and the planet illustrations. The Moon and Mars circles are CSS drawings.
- **`app.js`** renders machine cards, runs quizzes, controls navigation and animation, reads text aloud, and saves progress.
- **`data/`** contains the machine text, image details, sources, and quiz questions. See [DATA_GUIDE.md](DATA_GUIDE.md).

## Home page

`renderHome()` builds the fun-fact cards from `funFacts` in `data/moon.js` and `data/mars.js`, and the Resources lists from every machine's `sources`. Clicking a world button runs `openWorld()`, which turns the "o" in Moon or the "a" in Mars into a planet with GSAP and flies it to the top of the planet page.

## Planets and background

The Moon and Mars are two pictures, `images/planets/moon.png` and `images/planets/mars.png`. `fillPlanets()` puts a `.planet-face` inside every planet circle, and `turnPlanets()` turns those faces slowly every frame. The timeline planet also rolls with the scroll: down turns it anticlockwise, up turns it clockwise. The floating astronauts, asteroids and stars are SVG and CSS animations in `index.html` and `styles.css`.

## Moving around

`rewindToTop()` glides the page back to the top while the timeline planet swings out and back. "Read it again" uses it, and so does `switchWorld()`, which then fades across to the other planet. `celebrate()` shows the victory screen after the Final Mission; closing it returns to the home page.

## How the timeline works

`setupTimeline()` places a year marker beside each machine section. With GSAP available, ScrollTrigger updates the blue progress line, planet position, counter, and completed markers as the page scrolls. Without GSAP, a regular scroll listener updates the timeline; the world still opens, but the large animations are skipped.

## Saved in the browser

`app.js` uses `localStorage` for `done-moon`, `done-mars`, `badge`, `calm`, and `help-seen`. These values stay in that browser and are not shared between devices. If browser storage is unavailable, the site continues without saving progress.

The big animations turn off on their own when the device is set to reduce motion (`calm()` checks this). There is no switch for it in the site.

## Checkpoints, sounds and recordings

- Finishing a machine's quiz calls `showCheckpoint()`: it saves `check-<machine id>` in `localStorage`, ticks that year on the timeline, shows the checkpoint card and plays a short chime from `playWin()`.
- `playWin()` makes its notes with the Web Audio API, so there are no sound files. The Sound switch saves `sound` in `localStorage`.
- A machine with an `audio` field in its data gets a "Hear the real recording" player. `toggleRecording()` plays one recording at a time. Files are in `audio/`, listed in [AUDIO_CREDITS.md](AUDIO_CREDITS.md).
- `setupTimeline()` measures again after `document.fonts.ready`, so the timeline lines up once the web fonts have loaded.

## Motion

- `glideTo()` glides the page down to Fun facts or Resources when you press those buttons, the same eased motion as `rewindToTop()`.
- `openWorld()` opens a world: the "o" or "a" glows and melts into a small planet, a ring ripples out, and a circle (the `.portal`) widens from the letter to reveal the new world.
- `reveal()` makes each part glide in as it scrolls into view, with a different move per part: blurred headings drift up, Moon facts slide in from the left and Mars facts from the right, resource columns rise, machine photos wipe up, facts settle one by one, quiz answers slide in.
- The home page's glide-ins are paused (`homeTriggers`) while a planet page is open, so GSAP never animates hidden elements. A device set to reduce motion skips all of these.

## Settings and read-aloud voices

- The Settings button (top right) opens `#settings`. It saves `voice` (male/female), `theme` (dark/light), `accent` (a colour), `sound` and `calm` in `localStorage`.
- `applyTheme()` sets `data-theme` on `<html>`; the light theme swaps the colour tokens in `styles.css`. `applyAccent()` sets `--read`, and the title outline follows it.
- Read aloud first plays `audio/voice/<male|female>/<machine id>.mp3` (ElevenLabs narration). If that file is missing, `speakWithBrowser()` uses the browser's voice, picking a male or female one to match the setting.
