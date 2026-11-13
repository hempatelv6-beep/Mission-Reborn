# Last-Signal-NASA-

## Abandoned but Not Forgotten

An interactive **2D** website about the human-made machines left on the Moon and Mars: what each one was sent to do, what equipment it carried, what it discovered, what happened to it, and where it is now.

Built for the **NASA International Space Apps Challenge**.

> Status: **research phase.** No code has been written yet. See [docs/MASTER-PLAN.md](docs/MASTER-PLAN.md).

## Main features (planned MVP)
- Home page, then a choice between Moon and Mars
- A flat 2D map of each world with clickable machine markers
- An information panel for each machine: mission story, equipment, official photos, what happened to it, and source links

## Tech stack (planned)
React + Vite · Tailwind CSS · local JSON data files · Git and GitHub. No backend, no database, no 3D.

## Setup
Setup steps will go here once the project is created (planned: `npm install`, then `npm run dev`).

## Project structure
```
README.md, CLAUDE.md
research/   ← research notes; every fact links to a source
docs/       ← master plan, PRD, architecture, implementation plan
src/        ← website code (added after research is approved)
```

## Research sources
These are the official sources only. Full list in `research/sources.md`.
- NASA Space Science Data Coordinated Archive (NSSDCA): https://nssdc.gsfc.nasa.gov/
- NASA Science mission pages: https://science.nasa.gov/
- NASA Image and Video Library: https://images.nasa.gov/
- NASA Planetary Data System: https://pds.nasa.gov/

## AI collaboration rules
**ChatGPT** is the research and review partner. It plans research, finds NASA resources, explains concepts, reviews research and technical plans, spots missing information, and gives independent feedback.
**Claude Code** is the main research and development partner. It inspects files, researches, writes and organises the research documents, plans the build, builds the site after approval, and tests and fixes it.
**The project lead** makes the final decisions.

1. Don't conflict with, or needlessly duplicate, ChatGPT's documented work.
2. Don't silently overwrite existing decisions or documentation.
3. Keep important findings organised so ChatGPT can review them.
4. If ChatGPT and Claude disagree, explain the difference and give evidence. Don't quietly change a decision.
5. Keep research, technical decisions and progress documented.
6. Ask the project lead before any major change to project direction or technology.
7. The website stays **2D** unless the project lead approves otherwise.
8. Never begin building before research and planning are approved.
