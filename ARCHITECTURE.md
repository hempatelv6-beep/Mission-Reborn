# How the site is put together

Mission Reborn is a single-page site. It uses HTML, CSS, and JavaScript, with no build step or server code. GSAP and ScrollTrigger load from jsDelivr for the animations.

```text
index.html
  ├─ styles.css
  ├─ data/moon.js, data/mars.js, data/final.js
  ├─ GSAP + ScrollTrigger (CDN)
  └─ app.js
       ├─ builds the planet pages and quizzes from the data
       ├─ saves progress and Calm mode in localStorage
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

`paintMap()` paints a flat Moon map and a flat Mars map once on a canvas, using real longitude and latitude for the dark regions. Each planet circle slides its map sideways inside it, so it spins; `turnPlanets()` runs this every frame and also rolls the timeline planet with the scroll. The floating astronauts, asteroids and stars are SVG and CSS animations in `index.html` and `styles.css`.

## Moving around

`rewindToTop()` glides the page back to the top while the timeline planet swings out and back. "Read it again" uses it, and so does `switchWorld()`, which then fades across to the other planet. `celebrate()` shows the victory screen after the Final Mission; closing it returns to the home page.

## How the timeline works

`setupTimeline()` places a year marker beside each machine section. With GSAP available, ScrollTrigger updates the blue progress line, planet position, counter, and completed markers as the page scrolls. Without GSAP, a regular scroll listener updates the timeline; the world still opens, but the large animations are skipped.

## Saved in the browser

`app.js` uses `localStorage` for `done-moon`, `done-mars`, `badge`, `calm`, and `help-seen`. These values stay in that browser and are not shared between devices. If browser storage is unavailable, the site continues without saving progress.

Calm mode follows the computer's reduced-motion setting unless the visitor has already chosen a setting in the site. It also changes how the larger animations work.
