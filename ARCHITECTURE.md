# Architecture

One page, three code files, three data files. No server code, no build step.

```
index.html ──loads──> styles.css
           ──loads──> data/moon.js   (const MOON)
                      data/mars.js   (const MARS)
                      data/final.js  (const FINAL)
                      gsap + ScrollTrigger (jsDelivr CDN)
                      app.js         (reads MOON, MARS, FINAL and builds everything)
app.js ──reads/writes──> localStorage (done-moon, done-mars, badge, calm)
app.js ──points <img> at──> images/moon/*.jpg, images/mars/*.jpg
```

## index.html
The skeleton: top bar (home, Moon/Mars switch, Calm mode), start screen, one empty planet view, a toast, and one `<dialog>` for every quiz. Script order matters: data files first, then GSAP, then `app.js`.

## styles.css
Design tokens in `:root` (colors, fonts, rail width). Planets are drawn with CSS gradients (`.disc.moon`, `.disc.mars`). The rail line is a gray bar with a blue `.rail-fill` inside whose height JavaScript sets. `body.calm` and `prefers-reduced-motion` turn off CSS animation.

## app.js, top to bottom
| Function | Job |
|---|---|
| `store` | Safe `localStorage` get/set (private windows can throw) |
| `setCalm`, `calm()` | Calm mode switch; defaults to the system's reduced-motion setting |
| `showStart`, `showPlanet` | Swap views, clean up the old world |
| `openWorld` | GSAP: the "o" or "A" flies up and becomes the planet |
| `renderPlanet`, `machineHtml`, `photoHtml` | Turn one world's data into HTML; swap failed images for a labelled box |
| `setupTimeline` | ScrollTrigger: rail fill, planet position, "3 of 5", dot states, header planet shrinking toward the rail, planet-complete check |
| `readAgain` | GSAP: scrolls to the top (which rewinds the line) while the rail planet swings out and back; input is blocked while `busy` |
| `openQuiz` | One quiz box for all 13 quizzes; Final Mission saves the badge |
| `readAloud`, `stopReading` | `speechSynthesis` |
| click handler | One listener for every button, using `data-*` attributes |

## Data shape
See [DATA_GUIDE.md](DATA_GUIDE.md). Each world: `id`, `planet`, `title`, `hook`, `machines[]`. Each machine: facts, `image{}`, `sources[]`, `sourceChecked`, `quiz[]`. The planet quiz uses each machine's first question.

## localStorage keys
| Key | Value | Set when |
|---|---|---|
| `done-moon`, `done-mars` | `"1"` | You scroll to the end of that world |
| `badge` | `"1"` | You finish the Final Mission |
| `calm` | `"1"` / `"0"` | You press Calm mode |

Saved only in that browser. On a judge's laptop the site starts fresh, which is correct.

## Without GSAP
If the CDN fails, `hasGsap` is false: worlds open with no animation and the timeline runs on a plain scroll listener.
