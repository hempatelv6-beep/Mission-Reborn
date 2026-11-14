# PRD: Mission Reborn

## Problem
NASA asked for a story, not a fact list, that teaches kids about the machines humans left on the Moon and Mars. Most of these machines are known only to space fans, and what's online is either too technical or not accurate. NASA says accuracy matters throughout.

## Audience
Ages 11-14, on school laptops and phones. Some read slowly, some get dizzy from motion, some are on slow wifi.

## Our answers to NASA's four questions
| NASA asks | We say |
|---|---|
| Who is it for? | Ages 11-14 |
| Is the format easy to use? | 2D website, works on a phone, read-aloud button, Calm mode |
| A few machines or a broad story? | 10 specific machines, 5 Moon and 5 Mars, in launch order |
| Whose point of view? | The machines' own, one line each, e.g. "They flew home from my back. I stayed." |

## Core journey
Start screen → pick Moon or Mars → its letter becomes the planet → scroll a timeline past 5 machines (quiz after each) → planet quiz → Read it again, or switch planets → after both, Final Mission → badge.

## Features
**Must-have (site doesn't work without it)**
- All 10 machines in data files, each fact with a NASA link
- Start screen with Moon and Mars boxes
- Planet page with 5 machine sections, same order every time
- Scroll timeline: planet slides down, blue behind, gray ahead, years on the dots
- Mars page reusing the Moon page code
- End of planet: Read it again and switch planet
- NASA source links under every machine

**Should add**
- Quiz box reused for all 13 quizzes
- Letter-to-planet animation
- Read it again swing and line rewind
- Read-aloud and image type labels
- Moon/Mars switch in the corner, click a dot to jump, "Moon complete ✓" moment
- Machine talking line

**Extra (only with time)**
- Final Mission badge ✅ built, Calm mode ✅ built
- Floating astronauts and gear (not built)
- Tap-to-explain words (not built; science words are explained inline instead)
- "How to use" popup (not built)
- Mini "where is it now" map (not built)

**Skip**
3D globes and models, a walk-around game, zoom-and-drag maps, two languages, NASA data charts, mini-games.

## Acceptance criteria
1. From the start screen, both worlds open, and each shows 5 machines in launch order.
2. Each machine shows, in order: photo with alt text, type label and credit; what it was; what it carried; what happened; where it is now; NASA links; quiz button.
3. While scrolling, the counter reads 1 of 5 to 5 of 5, the line is blue above the planet and gray below, and each year dot jumps to its machine.
4. Each machine quiz has 3 questions, planet quizzes 5, Final Mission 10. Every answer shows a right or wrong explanation. The score screen has Try again.
5. Every quiz answer appears in that machine's text on the page.
6. The Final Mission appears only after both planets are finished, and finishing it shows and saves the badge.
7. Read it again returns to the top in about 1.5 s with the line rewinding, and scrolling is blocked during it. With Calm mode or reduced motion it jumps to the top instead.
8. A broken image shows a labelled box, never a broken-image icon.
9. No sideways scroll at 390 px; readable layout at 1440 px.
10. No console errors. No paths start with `/`.
11. Every NASA link opens. Every image has a credit in IMAGE_CREDITS.md.
