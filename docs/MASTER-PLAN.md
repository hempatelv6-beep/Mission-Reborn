# Master Plan: Abandoned but Not Forgotten (NASA Space Apps)

## Context: what's in the repo today
- `README.md` holds one line ("Last-Signal-NASA-"). There is **no `CLAUDE.md`** and **no code yet**.
- `research/` has not been committed yet. It holds `reference-websites.md` and `reference-analysis.md` (10 reference sites, checked 10–12 Nov 2026) plus 8 screenshots. **These cover section 9 (reference websites), so I won't redo that work.**
- The last commit (`567c870`) **deleted** an earlier plan named "Final Command": `docs/PRD.md`, `TECH-STACK.md`, `IMPLEMENTATION-PLAN.md`, `TEAM-ROLES.md`, plus `research/mission-analysis.md` and 4 other research files. Git still has them, so they can be restored.
  - **Conflict to flag:** the old `TECH-STACK.md` chose plain HTML/JS and no React. Your brief now prefers React + Vite. I'm going with **React + Vite** (reasons in section 9), but I'm flagging the change openly rather than making it quietly.
  - `mission-analysis.md` (equipment notes with [V]erified/[K]nowledge labels) is worth **restoring into `research/`** as a starting point.
- **Source fix:** the "Phoenix" link you were given points to InSight. The official Phoenix page is https://science.nasa.gov/mission/phoenix.

## 1. Project scope
This is a 2D website for exploring about 10 human-made machines left on the Moon and Mars: what each one was for, what it carried, what it found, what happened to it, and where it is now. **No 3D, no backend, no login.** The finished product is a working, accurate, good-looking site that a beginner team can finish within the hackathon.

## 2. Research phases (in order, each reviewed before the next)
| Phase | Output file(s) | What happens |
|---|---|---|
| R1 Sources | `official-resources.md`, `databases-and-apis.md`, `sources.md` | Map out what NSSDCA, NASA Science, the Image Library, PDS, USGS and LROC each provide |
| R2 Shortlist | `final-shortlist.md` | Look through the wider official list, then pick ~10 with reasons |
| R3 Machines | `moon/*.md`, `mars/*.md` (one file per machine) | Fill in the research template (section 4) |
| R4 Equipment, places, images | `equipment.md`, `locations.md`, `images.md` | Master inventory, coordinates with their sources, image credits |
| R5 Map | `map-research.md` | Compare the options, recommend one |
| R6 Features | `feature-research.md` | Rate difficulty and choose the MVP |

Each file ends with a **"Review status"** box (Claude drafted / ChatGPT reviewed / Lead approved) so ChatGPT can check the work without redoing it.

## 3. Recommended machines (draft; R2 confirms or changes these)
- **Moon (4):** Apollo 12 LM *Intrepid* descent stage (the NSSDCA link you gave, 1969-099C) · Apollo 12 ALSEP (its seismometer recorded moonquakes for years) · **Surveyor 3** (Apollo 12 astronauts walked to it and brought parts home, so these three form one connected story) · **LRV-1** from Apollo 15 (the first rover driven on the Moon). Alternative: Apollo 11 *Eagle* plus its retroreflector, if you'd rather have the famous landing.
- **Mars (6):** Viking 1 · Sojourner · Spirit · Opportunity · InSight · Ingenuity. Optional: Phoenix (the polar/ice story).
- Why this mix: each one ended differently (lost contact, stuck, dust on the solar panels, retired while working, damaged rotor). That gives different kinds of equipment and good NASA photos. **Status words must be checked one by one** (inactive / lost / still operating); Ingenuity's current status in particular needs checking.

## 4. Research template (one file per machine)
A Basic info (name, mission, type, world, launch, landing, duration, final status) · B Mission story and discoveries · C What happened (last activity, why it stopped, status word) · D Location (landing and final lat/lon, **who published the coordinates**, can it go on the 2D map?) · E Equipment (name, what it looks like, what it does, how it works, why it matters, data it collected, can we show it interactively?) · F Images (title, URL, source, credit/usage) · G 2–3 verified facts · H Website ideas. **Every fact gets a source link. Never invent coordinates. Anything unconfirmed is marked "unverified".**

## 5. Official data sources (to confirm in R1)
| Resource | What it gives us | API? | How we'll use it |
|---|---|---|---|
| NSSDCA (nssdc.gsfc.nasa.gov) | IDs, launch dates, mass, instrument lists | No public API (web pages) | Read by hand and copy into our notes |
| NASA Science mission pages | Story, status, discoveries | No | Read by hand |
| NASA Image & Video Library (images.nasa.gov) | Official photos | **Yes**, `images-api.nasa.gov`, **no key needed** | Find images, then **download** them into the project |
| PDS (pds.nasa.gov) | Raw science data | Some services | Probably too complex for the MVP; we'd only link to it |
| LROC / USGS Astrogeology | Landing-site coordinates and global Moon/Mars mosaics | Downloads | Map images and coordinates |
We **download once into local JSON and image files**: no live API calls during the demo. NASA images are usually free to use with credit, but NASA logos and some third-party photos are not, so we record each image's credit.

## 6. Equipment and location research
- `equipment.md` lists equipment by machine, explains each item in one or two plain sentences, and marks the **"best visual" items** (Ingenuity rotors, Spirit and Opportunity Pancam and rock grinder, InSight seismometer and heat-flow probe, LRV wheels, ALSEP seismometer, Viking arm).
- `locations.md` is a table of lat/lon with the source of each value (LROC for Apollo sites, NASA/JPL for Mars landers). **Known issue:** all the Apollo sites sit close together near the middle of the Moon's near side, so their markers will bunch up. The fix is a zoom-in box (inset) for that area.

## 7. 2D map: recommended MVP approach
Use **one flat global map image per world** (an official USGS/NASA mosaic in equirectangular projection, meaning longitude runs left to right and latitude top to bottom). Then place markers with CSS percentages:
`left = (lon + 180) / 360 × 100%`, `top = (90 − lat) / 180 × 100%`.
This needs no map library, works with plain React, and is easy for beginners. Leaflet with NASA Trek tiles is a stretch option only. Each map image's usage terms get recorded in R5.

## 8. Website features
**MVP:** home page · Moon/Mars choice · 2D map with markers · info panel (story, equipment, photos, what happened, sources) · source links.
**Stretch, rated in R6:** status filter (Easy) · per-machine timeline (Easy–Medium) · search (Easy) · clickable equipment hotspots on a photo (Medium) · compare machines (Medium).

## 9. Tech stack
**React + Vite + Tailwind CSS**, with local `moonMachines.json` / `marsMachines.json` and images in `public/`, hosted on GitHub Pages or Vercel. React earns its place because the map, markers and panel all reuse one data record. No database and no backend.

## 10. Simple architecture
`HomePage → PlanetSelector → PlanetMap(world)` loads that world's JSON → draws one `MachineMarker` per record → clicking a marker sets `selectedMachine` → `MachineInfoPanel` shows that record (`EquipmentSection`, gallery, `MissionTimeline`, sources). `MoonExplorer` and `MarsExplorer` are just `PlanetMap` with different data, not separate builds.

## 11. GitHub workflow (beginner version)
- **Repository:** the project folder plus its full history. **Commit:** a saved snapshot with a message. **Push:** send your commits to GitHub. **Pull:** get teammates' commits.
- `git init` turns a folder into a repo (already done here) · `git status` shows what changed · `git add .` stages the changes (picks them for the next snapshot) · `git commit -m "…"` saves the snapshot · `git push` / `git pull` · `git log --oneline` lists earlier commits.
- To go back safely: `git switch -c test <commit>` to look at an old version, or `git revert <commit>` to undo a change with a new commit. **Avoid `reset --hard`.**
- Loop: build one feature → test it → `git status` → add → commit → push. Never commit `node_modules/`, `dist/`, `.env` or keys (a `.gitignore` will handle this). I only push when you say so.

## 12. Claude skills
- **Frontend Design** (needed for the UI phase): run `/plugin marketplace add anthropics/skills` in Claude Code, then install the plugin that contains `frontend-design` (probably `example-skills`; I'll check the list when installing). Use it for the home page, map and panel styling.
- **GitHub skills: none needed.** Claude Code already handles git, commit messages, `gh` for issues and PRs, `/code-review` and `/security-review`. Adding more is not worth it.
- **Custom NASA Research skill:** later, once the template has been used on 2–3 machines.

## 13. Who does what
ChatGPT reviews sources, finds gaps and checks facts (it ticks "Review status"). Claude researches, writes the files, then builds and tests. You make the decisions. If ChatGPT and Claude disagree, both views and their evidence go into the file's review section. Nothing gets overwritten silently.

## 14. After approval
1. Add the collaboration rules plus project context to `README.md` (keeping the title line) and to a new `CLAUDE.md` (stack, 2D-only rule, verification rules, git workflow, "inspect before changing"). Restore `mission-analysis.md` into `research/`. Save this plan as `docs/MASTER-PLAN.md`.
2. Run research phases R1–R6, stopping for review after R2 and after R6.
3. Write `docs/PRD.md` → `architecture.md` → `implementation-plan.md`, wait for approval, then build one feature per commit in this order: setup → home → planet choice → Moon map → Mars map → markers → panel → equipment → images and sources → test and polish.

## Verification
- Every research fact links to an official source, and ChatGPT has ticked the review box.
- Every coordinate has a named source.
- Every image has a recorded credit.
- When building: click every marker, check that panels and images load, test at phone width, check every link, and compare the site's data with the research files.
