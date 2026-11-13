# CLAUDE.md: Abandoned but Not Forgotten

## Project context
This is a NASA Space Apps Challenge entry: an interactive **2D** website about the machines humans left on the Moon and Mars, covering their purpose, equipment, discoveries, fate and location. The project lead is a **beginner at coding**, so explain what you are doing in plain language and briefly define technical terms.

The master plan is in `docs/MASTER-PLAN.md`. The research lives in `research/` and is kept separate from code.

## Before changing anything
- Inspect the existing files, docs and code first. Reuse what already exists.
- Never silently overwrite existing decisions or documents. If you disagree, say so and give evidence.
- Ask the lead before major changes to direction or technology.
- **Don't start building until research and planning are approved.**

## Tech stack
React + Vite, Tailwind CSS, and local JSON data (`moonMachines.json`, `marsMachines.json`). Images are downloaded into the project. No backend, no database, and no live API calls at demo time.

## Coding conventions
- One feature per change. Keep components small and named clearly (`PlanetMap`, `MachineMarker`, `MachineInfoPanel`, …).
- All content comes from the JSON data files. Never hard-code facts in components.
- Place map markers using `left = (lon+180)/360`, `top = (90-lat)/180` (as percentages) on equirectangular map images.
- Keep the code readable for beginners and add short comments where the logic isn't obvious.

## 2D-only requirement
No 3D globes, WebGL scenes or 3D models unless the lead approves.

## Research verification rules
- Use official sources first: NSSDCA, NASA Science, NASA/JPL, the NASA Image Library, PDS, LROC and USGS.
- Every fact gets a source link. Anything not confirmed is marked **unverified**.
- **Never invent coordinates, dates or statistics.** Record who published each coordinate.
- Use the precise status word: inactive / lost contact / destroyed / still operating. Don't call everything "abandoned".
- Record the credit and usage terms for every image. Not every image on a NASA page is unrestricted.
- Each research file ends with a **Review status** box: Claude drafted / ChatGPT reviewed / Lead approved.

## GitHub workflow
Build one feature → test it → `git status` → `git add` → `git commit -m "clear message"` → push **only when the lead says so**.
- Make small, meaningful commits. Never commit secrets, `.env`, `node_modules/` or `dist/`.
- To undo, prefer `git revert`. Avoid `reset --hard`. Never overwrite a teammate's work without checking.

## AI collaboration rules
ChatGPT is the research and review partner. Claude Code is the main research and development partner. The project lead makes the final decisions.
1. Don't conflict with, or needlessly duplicate, ChatGPT's documented work.
2. Don't silently overwrite existing decisions or documentation.
3. Keep important findings organised so ChatGPT can review them.
4. If ChatGPT and Claude disagree, explain the difference and give evidence.
5. Keep research, technical decisions and progress documented.
6. Ask the lead before major changes to direction or technology.
7. The website stays 2D unless the lead approves otherwise.
8. Never begin building before research and planning are approved.
