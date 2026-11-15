# Audio credits

The site plays three short, real NASA recordings. Each one came from a NASA page already in [SOURCES.md](SOURCES.md). We downloaded them on 14 November 2026, turned them into small MP3 files, and kept the sound exactly as NASA released it.

Most of our machines were robots with no microphone (Surveyor 3, the Apollo 12 science station, the Apollo 15 rover, LCROSS, Viking 1, Sojourner, Spirit and Opportunity), so they have no recording. We didn't add sounds that NASA never recorded.

| File on our site | Machine | What you hear | NASA page | Original file | Credit |
|---|---|---|---|---|---|
| `audio/apollo-11-eagle-landed.mp3` (4 s) | Apollo 11 "Eagle" descent stage | "Tranquility Base here. The Eagle has landed." | [NSSDCA: Sounds of the Space Age](https://nssdc.gsfc.nasa.gov/planetary/sound/index.html) | [a11landing.aiff](https://nssdc.gsfc.nasa.gov/planetary/lunar/a11landing.aiff) | NASA |
| `audio/insight-wind.mp3` (20 s) | InSight lander | Wind blowing past InSight on Mars, picked up by its air pressure sensor. NASA sped it up so people can hear it. | [NASA Science: Sounds from InSight's pressure sensor on Mars](https://science.nasa.gov/resource/sounds-from-insights-pressure-sensor-on-mars) | [42303_aps.mp4](https://assets.science.nasa.gov/content/dam/science/psd/mars/downloadable_items/4/42303_aps.mp4) (we kept the sound only) | NASA/JPL-Caltech/CNES/Cornell |
| `audio/ingenuity-flight.mp3` (2 min 30 s) | Ingenuity Mars Helicopter | Ingenuity's fourth flight on 30 April 2021, recorded by Perseverance's microphone 80 m away. The hum is faint under the wind. | [NASA Science: Listen to NASA's Ingenuity Mars Helicopter in Flight](https://science.nasa.gov/resource/listen-to-nasas-ingenuity-mars-helicopter-in-flight-2/) | [46087_20210507_HelicopterFliesOnMars.mp3](https://assets.science.nasa.gov/content/dam/science/psd/mars/downloadable_items/4/46087_20210507_HelicopterFliesOnMars.mp3) | NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro |

## Victory sounds

The checkpoint chime and the Final Mission fanfare are not recordings. `app.js` plays them as a few musical notes using the browser's Web Audio API, so there is no sound file and nothing to license. Visitors can turn them off under Settings → Victory sounds.

## Read-aloud narration

Read aloud can play recorded narration made with ElevenLabs text-to-speech: the male voice "Todd - Clear, Engaging and Educational" and the female voice "Frankie - Friendly Instructor", both from the ElevenLabs voice library. These are AI-generated voices reading our own machine text. Files go in `audio/voice/male/` and `audio/voice/female/`, named by machine id (`m1.mp3` ... `r5.mp3`). Until a file is there, the site uses the browser's built-in voice instead.
