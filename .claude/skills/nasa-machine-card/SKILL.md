---
name: nasa-machine-card
description: Research, write or check one Mission Reborn machine card (a Moon or Mars machine in data/moon.js or data/mars.js) or its quiz questions. Use whenever adding, editing or fact-checking a machine, its photo, its sources, or any quiz question in data/*.js.
---

# NASA machine card

One machine per chat. Mixing machines is how Spirit ends up with Opportunity's dates.

## Sources
- Use ONLY the NASA URLs the team pastes in (NASA Science, NSSDCA, NASA/JPL). Never go looking for your own.
- No Wikipedia, blogs, fan sites, or your own memory. If a fact isn't on those pages, write `UNVERIFIED: <what's missing>` and put it in `TODO_VERIFY.md`, not on the site.
- Every fact needs the exact sentence it came from and the URL it's on. Output a source table: fact | quoted sentence | URL.

## The card (same order as the page)
1. Photo: one image hosted on the NASA pages, its URL, its NASA credit line, and an alt text. Label it honestly: `NASA photo`, `NASA photo (on Earth)`, `Stand-in photo` (with a note saying what it really shows), `Drawing`, or `AI art`. No image on the page: write `NO IMAGE ON SOURCE`.
2. What it was: 1-2 sentences.
3. What it carried: 2-3 items.
4. What happened to it: 1-2 sentences, with the year.
5. Where it is now: 1 sentence.
6. NASA source links: 1-2 (more only if the fact needs them).
7-9. Three quiz questions.

**Cap: 150 words across fields 2-5.** Six facts, then stop.

## Writing for ages 11-14
- Short sentences. Explain any science word in the same sentence ("a seismometer, to measure moonquakes").
- No hype words (incredible, epic, groundbreaking), no "Did you know?".
- The `talkingLine` is a story line in the machine's voice. It may only restate facts already in the card. It is never quoted as real and never used in a quiz.

## Quiz rules
- 4 options, one right, `answer` is 0-based.
- The right answer must already be in fields 2-5 of THIS machine. No surprise facts.
- Wrong options must be clearly wrong from the card, not trick questions.
- `whenRight` starts "Correct!" and repeats the fact. `whenWrong` starts "Not quite." and gives the right answer.
- Final Mission questions (`data/final.js`) follow the same rules and name the machine they come from in `machine`.

## Red flags (delete on sight)
- Any quote from a machine or a person. Opportunity's "my battery is low and it's getting dark" is fan-made, not NASA.
- A very exact number with no quoted sentence next to it.
- A nickname or dramatic detail not on the NASA page.
- A year that's close but not the same as the page.

## Checking someone else's card (never your own)
Years: find each year on the page. Names: every mission, tool and place spelled the same. Quotes: each fact matches its sentence. Then set `sourceChecked` to the date a human opened the links.
