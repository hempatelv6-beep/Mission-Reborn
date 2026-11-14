# Data guide: changing machines and quizzes

You never need to open `app.js`. Everything you read on the site is in:
- `data/moon.js`: the 5 Moon machines and their quizzes
- `data/mars.js`: the 5 Mars machines and their quizzes
- `data/final.js`: the 10 Final Mission questions

One person owns each file at a time. Two people editing `moon.js` at once makes a merge conflict.

## How our research was done
1. One machine per AI chat, with only that machine's NASA links pasted in (prompt in the `nasa-machine-card` skill).
2. The AI had to quote the exact NASA sentence and URL for every fact, and write UNVERIFIED for anything missing.
3. A different teammate checked each card (years, names, quotes) against the NASA page.
4. The checked text became our "Website Text" doc. The data files copy that doc word for word.
5. `sourceChecked` is the date a human opened the links (2026-11-14 for all ten).

## One machine
```js
{
  id: "m1",                       // m1-m5 Moon, r1-r5 Mars
  name: "Surveyor 3",
  launched: "17 April 1967",      // shown under the year
  year: 1967,                     // the dot on the timeline
  talkingLine: "...",             // our story line in the machine's voice. Not a fact, never in a quiz
  image: {
    src: "images/moon/surveyor-3.jpg",   // no leading slash
    width: 1280, height: 1280,           // real pixel size of the saved file
    alt: "What the picture shows, for people who can't see it.",
    type: "NASA photo",           // or "NASA photo (on Earth)", "Stand-in photo", "Drawing", "AI art"
    note: "",                     // optional, e.g. what a stand-in really shows
    credit: "NASA",
    from: "https://..."           // where we downloaded it
  },
  whatItWas: "1-2 sentences.",
  carried: ["2-3 items"],         // optional carriedLabel: "What it carried (each rover)"
  whatHappened: "1-2 sentences, with the year.",
  whereItIsNow: "1 sentence.",
  sources: [{ label: "Surveyor 3, NASA Science", url: "https://science.nasa.gov/mission/surveyor-3/" }],
  sourceChecked: "2026-11-14",    // empty "" shows "Not fact-checked yet" on the site
  quiz: [ /* 3 questions */ ]
}
```
Limit: 150 words across whatItWas, carried, whatHappened and whereItIsNow.

## One quiz question
```js
{
  question: "How many flights did Ingenuity make?",
  options: ["5", "30", "72", "550"],   // always 4
  answer: 2,                           // counts from 0, so 2 = "72"
  whenRight: "Correct! It was planned for five, and it made 72.",
  whenWrong: "Not quite. It made 72 flights, far more than the five planned."
}
```
- The answer must already be in that machine's text. No surprise facts.
- The **first** question of each machine also goes in the planet quiz, so make it the most important fact.
- Final Mission questions have `machine: "r5"` so we can check which text they come from.

## Common mistakes
- A missing comma between blocks breaks the whole page. Open the page after every edit; if it's blank, press F12 and read the red error.
- Use straight quotes `"` around text. If the text itself has a `"`, write `\"`.
- `answer` is a number, not text.

## Images
- NASA pages only. Save the file in `images/moon/` or `images/mars/`. Never link straight to NASA's server.
- Name it lowercase-with-dashes: `apollo-15-rover.jpg`, never `Apollo 15 Rover.JPG`.
- `.jpg` for photos, `.png` for flat graphics. Max 1600 px wide, under about 300 KB (squoosh.app works).
- Put the real width and height in the data so the page doesn't jump while it loads.
- Label it honestly and add it to [IMAGE_CREDITS.md](IMAGE_CREDITS.md).
