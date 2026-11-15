# Editing machine and quiz data

All text shown in the machine cards and quizzes lives in three files:

- `data/moon.js`: five Moon machines and their questions
- `data/mars.js`: five Mars machines and their questions
- `data/final.js`: the Final Mission quiz

You can add or fix site text without editing `app.js`. Have one person edit a data file at a time to avoid overwriting each other's work.

## Before changing a fact

Use the NASA links already listed for that machine. Check names, dates, and details against the page. Put anything you have not confirmed in `TODO_VERIFY.md`; do not add it to the site as a fact. The team records the date it checked a source in `sourceChecked`.

## Machine entry

```js
{
  id: "m1", // m1-m5 for the Moon; r1-r5 for Mars
  name: "Surveyor 3",
  launched: "17 April 1967",
  year: 1967, // year shown on the timeline
  talkingLine: "...", // story writing, not a quote or a fact
  image: {
    src: "images/moon/surveyor-3.jpg",
    width: 1280,
    height: 1280,
    alt: "Describe what is visible in the image.",
    type: "NASA photo", // use the accurate label for the image
    note: "", // optional note, such as what a stand-in photo shows
    credit: "NASA",
    from: "https://..."
  },
  whatItWas: "One or two sentences.",
  carried: ["An instrument"],
  whatHappened: "One or two sentences, with dates where useful.",
  whereItIsNow: "One sentence.",
  sources: [{ label: "Surveyor 3, NASA Science", url: "https://..." }],
  sourceChecked: "2026-11-14",
  quiz: [/* three questions */]
}
```

Keep the four description fields (`whatItWas`, `carried`, `whatHappened`, and `whereItIsNow`) to about 150 words total per machine. Use `carriedLabel` if the usual “What it carried” heading does not fit, such as "What it carried (each rover)" for Spirit and Opportunity.

## Fun facts on the home page

`MOON.funFacts` and `MARS.funFacts` hold the home page facts. Each one keeps the exact NASA sentence it comes from, so a teammate can check it.

```js
funFacts: [
  {
    text: "Opportunity lasted 60 times longer than planned.",
    source: { label: "Opportunity, NASA Science", url: "https://science.nasa.gov/mission/mer-opportunity/" },
    quote: "Opportunity exceeded its life expectancy by 60 times"
  }
],
```

- Only use pages already in [SOURCES.md](SOURCES.md).
- `quote` must be copied word for word from that page. Hovering over the source link shows it.
- Keep the `text` short, and don't add anything the quote doesn't say.

## Tap-to-explain words

Each machine can have a `words` list. The first time a word appears in that machine's text, it becomes underlined, and tapping it shows the meaning.

```js
words: [
  { term: "seismometer", meaning: "An instrument that feels moonquakes." }
],
```

- The `term` must be spelled exactly as it appears in the machine's text (capital letters don't matter).
- The `meaning` must come from that machine's own text. Don't add new facts here.
- If a word isn't found in the text, nothing breaks; it just isn't underlined.

## Quiz question

```js
{
  question: "How many flights did Ingenuity make?",
  options: ["5", "30", "72", "550"],
  answer: 2, // answers are counted from zero, so 2 means the third option
  whenRight: "Correct! It was planned for five flights and made 72.",
  whenWrong: "Not quite. It made 72 flights."
}
```

Each machine quiz has three questions. The first question for each machine is also used in the planet quiz, so make it a good summary question. The Final Mission questions name their source machine with the `machine` field. Every answer must be stated in the related machine's on-page text.

## Images

Save images in `images/moon/` or `images/mars/`; do not link directly to NASA's server. Use lowercase filenames with dashes, such as `apollo-15-rover.jpg`. Record the correct width and height so the page can reserve space while the image loads. Add each image and its source to [IMAGE_CREDITS.md](IMAGE_CREDITS.md).

## Small JavaScript details

- Keep commas between object fields and entries. A missing comma can stop the whole page from loading.
- Wrap text in straight double quotes. Escape a double quote inside the text as `\"`.
- `answer` is a number, not the answer text.
- After editing, open the page. If it is blank, check the browser console for the first error.

## Real NASA recordings

A machine can have an `audio` field. The site then shows a "Hear the real recording" button under its facts.

```js
audio: {
  src: "audio/ingenuity-flight.mp3",      // a file in audio/, lowercase with dashes
  caption: "What you hear, in one or two short sentences.",
  credit: "NASA/JPL-Caltech/...",           // copied from the NASA page
  page: "https://science.nasa.gov/...",     // the NASA page that offers the file
  file: "https://assets.science.nasa.gov/..." // the original file we downloaded
},
```

Only use recordings from NASA pages in [SOURCES.md](SOURCES.md), keep the sound as NASA released it, and add a row to [AUDIO_CREDITS.md](AUDIO_CREDITS.md).
