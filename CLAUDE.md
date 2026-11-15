# Working on Mission Reborn

Mission Reborn is a 2D website for NASA Space Apps 2026's “Abandoned but not Forgotten” challenge. It introduces readers aged 11–14 to five machines left on the Moon and five on Mars. The team is aged 15–16 and is learning to code, so explain changes in clear, everyday language.

## Keep the project simple

- The site uses `index.html`, `styles.css`, `app.js`, and data in `data/moon.js`, `data/mars.js`, and `data/final.js`.
- It uses GSAP and ScrollTrigger from jsDelivr, `localStorage` for progress, and the browser's `speechSynthesis` for read-aloud.
- It has no React, npm setup, or build step. It is intended for GitHub Pages.
- Keep it 2D. Do not add 3D models or globes.
- Keep visitor-facing writing short, specific, and easy for a middle-school reader to follow. Remove filler and explain science words in context.

## Facts and images

- Use NASA pages as sources for mission facts. If a fact has not been checked, put it in `TODO_VERIFY.md` rather than presenting it as confirmed.
- Quiz answers must appear in the related machine's text.
- Keep words and facts in `data/*.js`, not in `app.js`.
- Use relative image paths, such as `images/moon/lcross.jpg`. Use lowercase names with dashes.
- Label images honestly. Record each one in `IMAGE_CREDITS.md`.
- Animations need a reduced-motion path (`calm()` in `app.js`).

## Before changing the site

Read the files involved and keep the current structure unless the task calls for a change. Keep functions focused and reuse existing code where it fits. After a change, open the site, click through the affected parts, and check the browser console. Do not commit or push unless the project lead asks.
