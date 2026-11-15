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

## How the timeline works

`setupTimeline()` places a year marker beside each machine section. With GSAP available, ScrollTrigger updates the blue progress line, planet position, counter, and completed markers as the page scrolls. Without GSAP, a regular scroll listener updates the timeline; the world still opens, but the large animations are skipped.

## Saved in the browser

`app.js` uses `localStorage` for `done-moon`, `done-mars`, `badge`, and `calm`. These values stay in that browser and are not shared between devices. If browser storage is unavailable, the site continues without saving progress.

Calm mode follows the computer's reduced-motion setting unless the visitor has already chosen a setting in the site. It also changes how the larger animations work.
