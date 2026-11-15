# Mission Reborn: project brief

## What the site is for

Mission Reborn tells the stories of 10 machines left on the Moon and Mars. It is for readers aged 11–14. The facts come from NASA pages, and the writing should be clear enough for a student to follow without already knowing space history.

## Who will use it

Readers may be on a phone or a school laptop, may read at different speeds, or may prefer less movement. The site has a read-aloud button and Calm mode. It also respects the browser's reduced-motion setting.

## The visit

1. On the home page, choose the Moon or Mars. The home page also has fun facts about each world and a list of the NASA pages we used.
2. Scroll through five machines in launch order. Each section includes the machine's story, an image with a clear label, NASA sources, and a short quiz.
3. Take the five-question planet quiz, or switch worlds.
4. After both worlds are complete, take the 10-question Final Mission quiz. A victory screen names you a Mission Reborn Explorer and returns you to the home page, which then shows the badge above the title.

The "o" in Moon and the "a" in Mars on the home buttons turn into the planets. The planets spin, the timeline planet rolls with the scroll, and astronauts, asteroids and stars float in the background. "Read it again" and switching worlds both glide back to the top first. The content still works if GSAP is unavailable.

## What is in the site

- One start screen and one shared planet page used for both worlds
- Five machine entries for the Moon and five for Mars, stored in data files
- Three questions per machine, a five-question quiz for each planet, and a 10-question Final Mission
- NASA source links and image credits
- Read-aloud controls, Calm mode, timeline jump points, saved progress, and the badge
- Home page: centered title, the two world buttons, eight fun facts (four per world, each linked to its NASA page) and a Resources list
- Tap-to-explain words, a how-to guide on the first visit, and the Final Mission victory screen

## What we chose not to build

The site does not have 3D models, a walk-around game, zoomable maps, multiple languages, data charts, or separate mini-games. These were outside the project's scope.

## How we will review it

- Both planets open and show five machines in launch order.
- Each machine has a labeled image, description, NASA links, and its quiz.
- Timeline dots jump to the right section; the counter and progress line update while scrolling.
- Quiz lengths are three questions per machine, five per planet, and 10 for the Final Mission. Each answer has feedback, and the score screen offers another try.
- The Final Mission appears after both planets are marked complete, and completion saves the badge.
- Read it again returns to the top. Calm mode and reduced-motion settings skip the large movement.
- A failed image shows a text label instead of a broken-image icon.
- At a 390-pixel viewport, the page has no sideways scrolling; at 1440 pixels, the layout remains readable.
- The home page fun facts each link to a NASA page that contains the quoted sentence stored with the fact.
- Finishing the Final Mission shows the victory screen; closing it shows the home page with the Explorer badge at the top.
- Check for browser console errors, working NASA links, and image credits before submitting.

## Added in the redesign

- Home page matching the team's mockup: outlined "Mission Reborn" title, "Fun facts" and "Resources" buttons, two wide Moon and Mars cards with Explore buttons. Fonts: Fredoka and Nunito.
- Checkpoints: finishing a machine's quiz shows a victory card with a chime and ticks the timeline. Progress shows on the home cards. A Sound switch turns the chime off.
- Real NASA recordings for Apollo 11, InSight and Ingenuity, credited in AUDIO_CREDITS.md.

Checks:
- Finishing any machine quiz shows the checkpoint card, plays the chime (unless Sound is off), and ticks that year on the timeline.
- "Moon" and "Mars" still read correctly on the home cards after opening and closing each world several times.
- Each recording plays, stops when another starts, and stops when you leave the planet.

## Motion added

- Fun facts and Resources buttons glide down to their sections.
- Opening a world: the letter glows, a ring ripples out, and the world opens in a widening circle.
- Each section glides in with its own animation. Calm mode turns them all off.

## Settings

- A Settings page with: read-aloud voice (male or female, with a "Try it" button), light or dark theme, a colour (five presets or pick your own), victory sounds and Calm mode. Choices are remembered in the browser.
- Read aloud uses recorded ElevenLabs narration (male voice "Todd", female voice "Frankie") when the files are in `audio/voice/`, and the browser's voice otherwise.
