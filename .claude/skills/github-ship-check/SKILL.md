---
name: github-ship-check
description: Run before any Mission Reborn commit or push. Checks git status and diff, relative paths, NASA links, secrets and unverified claims, then makes small clean commits. Use when the user says commit, push, ship, publish, or "is it ready".
---

# GitHub ship check

**Never commit or push unless the project lead says so in this chat.** If they haven't, run the checks and hand them the exact commands instead.

## 1. Look before you stage
```bash
git status --short
git diff --stat
git diff
```
Every changed file must belong to the task. Anything else (a teammate's file, a stray PDF, `.env`) stays out.

## 2. Paths
```bash
grep -nE '(src|href)="/' index.html app.js data/*.js
grep -rnE '"/images|\x27/images' app.js data/
```
Must print nothing. Then check each `images/...` path in `data/*.js` matches a real file, letter for letter (`ls images/moon images/mars`).

## 3. NASA links
List every `url:` and `from:` in `data/*.js`. Each must be on `science.nasa.gov`, `nssdc.gsfc.nasa.gov`, `assets.science.nasa.gov` or `nasa.gov`. Open new ones (or `curl -sIL -o /dev/null -w "%{http_code}"`) and expect 200.

## 4. Secrets and junk
```bash
git diff --cached | grep -nEi 'api[_-]?key|secret|token|password|BEGIN .*PRIVATE'
```
Must print nothing. No `node_modules/`, no `.env`, no files over 1 MB.

## 5. Unverified claims
- `grep -rn "UNVERIFIED" data/` must print nothing. Those items belong in `TODO_VERIFY.md`.
- Every machine has `sourceChecked` set to the date a human opened the links.
- Every quiz answer appears in its machine's text.

## 6. Commit small, push when told
```bash
git add <only the files for this task>
git commit -m "Short, plain message about what changed"
git push origin main
```
One feature per commit. Message says what changed, not "update". Push only to `main` and only on the lead's go-ahead. After pushing, open the live site with Shift+refresh and click through one planet.
