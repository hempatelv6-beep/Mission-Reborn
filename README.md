# Mission Reborn

**Abandoned But Not Forgotten**

Ten machines went to the Moon and Mars. Mission Reborn tells what each one did, what it carried, and where it ended up.

Made by the Mission Reborn team for [NASA Space Apps 2026: Abandoned but not Forgotten](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/).

![Mission Reborn start screen on a laptop](images/screenshots/start-desktop-1440.jpg)

## What you can do

- Explore five machines on each world, with NASA sources linked beside the facts.
- Use the timeline to move between machines, and try the quizzes along the way.
- Tap underlined science terms for a definition. The help button explains the controls.
- Turn on read-aloud or reduce motion in your device settings.

![Mission Reborn Mars timeline on a phone](images/screenshots/mars-phone-390.jpg)

## The machines

| Moon | Launch year | Mars | Launch year |
|---|---:|---|---:|
| Surveyor 3 | 1967 | Viking 1 lander | 1975 |
| Apollo 11 “Eagle” descent stage | 1969 | Sojourner (Mars Pathfinder) | 1996 |
| Apollo 12 ALSEP science station | 1969 | Spirit & Opportunity | 2003 |
| Apollo 15 Lunar Roving Vehicle | 1971 | InSight lander | 2018 |
| LCROSS | 2009 | Ingenuity Mars Helicopter | 2020 |

## Run the site

There is no build step. To preview it locally:

1. Download or clone the project.
2. Open the folder in VS Code and install the Live Server extension.
3. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly. The site still works if the GSAP CDN is unavailable, but its larger animations will not run.

## Website

**Live site: <https://mission-reborn.vercel.app>**

It is hosted on Vercel and linked to this repository, so every push to `main` updates the live site in about a minute.

## Project files

| File | Purpose |
|---|---|
| `index.html`, `styles.css`, `app.js` | Page, layout, and behavior |
| `data/moon.js`, `data/mars.js`, `data/final.js` | Machine facts and quiz questions |
| `images/` | Saved images and site screenshots |
| [PRD.md](PRD.md) | What the site should do |
| [ARCHITECTURE.md](ARCHITECTURE.md) | How the site files fit together |
| [DATA_GUIDE.md](DATA_GUIDE.md) | How to edit machine and quiz data |
| [SOURCES.md](SOURCES.md) | NASA pages used for facts |
| [IMAGE_CREDITS.md](IMAGE_CREDITS.md) | Image sources and labels |
| [AI-USE.md](AI-USE.md) | How AI was used on the project |
| [TODO_VERIFY.md](TODO_VERIFY.md) | Items still to review |

## Team

The Mission Reborn team researched the machines, checked facts against NASA sources, wrote the site text, and built the site.

## Credits

- Facts: NASA Science and the NASA Space Science Data Coordinated Archive. See [SOURCES.md](SOURCES.md).
- Images: NASA, NASA/JPL, and NASA/JPL-Caltech. See [IMAGE_CREDITS.md](IMAGE_CREDITS.md). NASA does not endorse this project.
- Animation: [GSAP](https://gsap.com/). Fonts: Fredoka and Nunito, served by Google Fonts. Moon and Mars pictures supplied by the team; astronauts and asteroids drawn in code (see [IMAGE_CREDITS.md](IMAGE_CREDITS.md)).
- Sounds: three real NASA recordings, listed in [AUDIO_CREDITS.md](AUDIO_CREDITS.md). The checkpoint chime is made in the browser.

## Settings

Press **Settings** in the top right to pick a male or female read-aloud voice, a light or dark theme, and a colour, and to turn victory sounds on or off.
