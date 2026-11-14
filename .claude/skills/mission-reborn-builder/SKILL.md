---
name: mission-reborn-builder
description: Build or change the Mission Reborn website (index.html, styles.css, app.js, images/). Use for any UI, layout, animation, quiz box, timeline, accessibility or copy change on the site.
---

# Mission Reborn builder

## Stack lock
- Three code files: `index.html`, `styles.css`, `app.js`. A fourth code file needs a reason.
- Words and facts live in `data/moon.js`, `data/mars.js`, `data/final.js` (plain `const` objects, loaded with `<script>`, never `fetch`).
- GSAP + ScrollTrigger from jsDelivr, pinned version. Nothing else from outside except Google Fonts.
- No React, no npm, no package.json, no build step. The folder you edit is the folder that goes live.
- `localStorage` for progress only, always inside try/catch. `speechSynthesis` for read-aloud.
- **2D only.** No 3D globes, WebGL or 3D models.

## Paths and names
- Relative paths only: `images/moon/lcross.jpg`, never `/images/...` (GitHub Pages serves from a subfolder).
- Files lowercase-with-dashes. `.jpg` for photos, `.png` for flat graphics. Under ~300 KB, max 1600 px wide.
- Case must match exactly: Pages is case-sensitive, Windows isn't.

## Motion
- Every animation has a no-motion path. `body.calm` is on when the user turns on Calm mode or the system asks for reduced motion. Check `calm()` before any GSAP timeline.
- Lock input (wheel, touch, keys) while a timeline drives the scroll; release it in `onComplete`.
- No decorative motion that blocks reading. Keep start-to-finish under ~1.5 s.

## Accessibility
- Real `<button>`s and `<a>`s. Visible focus. Move focus sensibly after view changes and dialogs.
- Every image has alt text from the data file and a type label (NASA photo / Drawing / Stand-in).
- Text contrast at least 4.5:1. Tap targets about 40 px. Test at 390 px and 1440 px with no sideways scroll.

## Anti-slop rules
UI:
- Keep the existing tokens in `:root` (night-sky blue, rust, read-blue). Don't add purple gradients, glassmorphism, emoji icons, or a generic card grid.
- One idea per section, same order in every machine. Let the real NASA photos carry the page.
Copy (run the `humanizer` skill on anything users read):
- Plain words for ages 11-14. No "Embark on a journey", "Dive in", "Unlock", "In a world where".
- No forced threes, no "It's not X, it's Y", no one-line dramatic closers.
Code:
- One function per job (`renderPlanet`, `setupTimeline`, `openQuiz`, `readAgain`). Reuse before adding.
- No facts in `app.js`. Short comments only where the why isn't obvious.
- Escape all data before putting it in HTML (`esc()`).

## Workflow
One task at a time: change, open the preview, click through it, check the console, then stop and report. Use `frontend-design` / `design-taste-frontend` for visual decisions and `interface-design` for the quiz box and controls.
