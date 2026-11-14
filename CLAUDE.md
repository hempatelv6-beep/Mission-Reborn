# CLAUDE.md: Mission Reborn

NASA Space Apps 2026, challenge "Abandoned but not Forgotten". A 2D scroll website about 10 machines left on the Moon and Mars. Audience: ages 11-14. Team: ages 15-16, beginners at code, so explain changes in plain words.

## Stack lock (don't change without the lead)
- `index.html`, `styles.css`, `app.js`. Data in `data/moon.js`, `data/mars.js`, `data/final.js`.
- GSAP + ScrollTrigger from jsDelivr. `localStorage` for progress. `speechSynthesis` for read-aloud.
- No React, no npm, no build step. Hosted on GitHub Pages.
- 2D only. No 3D globes or models.

## Facts
- Every fact comes from a NASA page (NASA Science, NSSDCA, NASA/JPL). No page, no fact.
- Anything not checked goes in `TODO_VERIFY.md`, not on the site.
- Quiz answers must already be in that machine's text.
- Use the `nasa-machine-card` skill for any data change.

## Building
- Use the `mission-reborn-builder` skill for any site change.
- Relative paths only (`images/moon/lcross.jpg`, never `/images/...`). Lowercase-with-dashes file names.
- Every animation has a Calm mode / reduced-motion path.
- Words live in `data/*.js`, never in `app.js`.

## Anti-slop
- Plain, specific copy. Run `humanizer` on anything users read.
- Keep the existing look (night sky, rust Mars, blue read-line). No generic gradients, emoji icons or template card grids.
- Small functions with one job each. Reuse before adding.

## Workflow
- One task at a time: change, preview, click through, check the console, report, stop.
- Inspect files before changing them. Don't silently overwrite team decisions; flag disagreements.
- Run the `github-ship-check` skill before any commit. **Commit and push only when the lead says so.**
