# Mission Reborn: project brief

## What the site is for

Mission Reborn tells the stories of 10 machines left on the Moon and Mars. It is for readers aged 11–14. The facts come from NASA pages, and the writing should be clear enough for a student to follow without already knowing space history.

## Who will use it

Readers may be on a phone or a school laptop, may read at different speeds, or may prefer less movement. The site has a read-aloud button and Calm mode. It also respects the browser's reduced-motion setting.

## The visit

1. Choose the Moon or Mars.
2. Scroll through five machines in launch order. Each section includes the machine's story, an image with a clear label, NASA sources, and a short quiz.
3. Take the five-question planet quiz, or switch worlds.
4. After both worlds are complete, take the 10-question Final Mission quiz and earn the badge.

The planet letter animation, moving planet timeline, and “Read it again” animation give the page its visual style. The content still works if GSAP is unavailable.

## What is in the site

- One start screen and one shared planet page used for both worlds
- Five machine entries for the Moon and five for Mars, stored in data files
- Three questions per machine, a five-question quiz for each planet, and a 10-question Final Mission
- NASA source links and image credits
- Read-aloud controls, Calm mode, timeline jump points, saved progress, and the badge

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
- Check for browser console errors, working NASA links, and image credits before submitting.
