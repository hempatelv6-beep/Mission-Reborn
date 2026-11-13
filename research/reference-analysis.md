# Research Report: Reference Projects for "Abandoned but Not Forgotten"

## Context
Your team plans a hybrid experience: 🗺️ map + 📖 stories + 📅 timelines + 🎮 investigation game. You asked for research only: how the best reference projects build and connect these features. The URL placeholders in your request were empty, so I used the **top 10 projects** found earlier (listed in `research/repositories.md`).

- **Verified:** I opened each site in the browser on 10 Nov 2026, clicked through maps, markers, stories, timelines and quizzes, and read the data files in the repos.
- **Not tested:** CUỘI (#5) is a Vietnamese pixel game, and the Unity game (#8) needs keyboard flying. Both are summarised from my earlier visit plus their READMEs, and marked "README".

**When you approve:** I will save this report as `research/reference-analysis.md` (no other files touched), then stop for your review before any PRD or architecture work.

---

## 1. Executive summary
- **Every strong project is built on one data file** (one record per machine) that feeds the map, story, timeline and quiz. That is what makes the features feel connected.
- **The best connected flow** (EXOARCHIVE, Left Behind): map marker → short side panel → "Open the full story" → story → quiz answers link back to the story.
- **Timelines work best per machine** ("launch → landing → discovery → silence"), not just one big list of dates.
- **The best games teach by giving feedback**: wrong answer → correct answer + one-line explanation + "open the story" link.
- **Realistic for 5 beginners:** a flat 2D NASA map image with clickable dots, 8 machines, a 5-stage story/timeline per machine, and one investigation game. Avoid 3D globes, live APIs and Unity.

## 2. Reference projects (compact)

### #1 Left Behind: [site](https://prismane1269.github.io/leftbehind/) · [repo](https://github.com/Prismane1269/leftbehind)
- **Purpose:** a scroll story from Earth to the Moon to Mars, plus a catalogue of 18 machines.
- **Explored:** home (flight, hall, explorer, listening room, timeline), catalogue, machine modal.
- **Machines:** 6 Moon (Surveyor 1, Surveyor 3, Apollo 11/12/15/17 LM, LRV-1/3), 10 Mars (Viking 1/2, Pathfinder, Spirit, Opportunity, Phoenix, InSight, Ingenuity, Curiosity, Perseverance), 2 deep space (Voyager 1/2).
- **Map:** 3D globe with tabs (Moon / Mars / Earth / Deep space) and a list beside it. Click a list item or pin → the camera flies there → a card shows status, landing date, "last heard" date, coordinates, and the **live distance and radio time** → "Open the full story" opens a modal with a 3D model.
- **Story:** in the modal: headline ("Designed for 90 days. It worked for over six years.") → short story → 3 science bullets → what was left behind → legacy → stats → NASA sources.
- **Timeline:** vertical, grouped by year (1966 → today). Each year has a title, 2–3 sentences and machine-name chips you can click to open the story.
- **Game:** "Listening room": play a marsquake trace, Ingenuity's last downlink, or send Voyager a command and wait for the delay.
- **Flow:** Hero → flight scroll → hall (3D) → explorer map → card → full-story modal; the timeline also opens the same modal.
- **Learn:** ① every feature opens the **same story modal**; ② clear status labels (SILENT / OUT OF POWER / WORKING NOW); ③ a "headline + story + science + left behind + legacy" record format (`js/data.js`); ④ a "last heard" date.

### #2 EXOARCHIVE: [site](https://abandoned-not-forgotten-omega.vercel.app) · [repo](https://github.com/jahidhasan75/Abandoned-Not-Forgotten)
- **Purpose:** a museum-style archive of 20 objects (7 Moon, 13 Mars), English and Bangla.
- **Machines:** Mars: Sojourner, Spirit, Opportunity, Phoenix, InSight, Viking 1/2, Curiosity, Perseverance, Mars Polar Lander (lost), Ingenuity, **Opportunity's heat shield, Perseverance's backshell + parachute**. Moon: Apollo sites, Surveyor 3, retroreflectors, ALSEP.
- **Map (best 2D map):** a flat NASA mosaic with a 15° grid, a Moon/Mars toggle, and a **"Left behind by [year]" slider (1967–2024)** that shows the machines appearing over time. Marker → side panel (code, coordinates, landing year → last contact, status reason, summary, 3 "science made possible" bullets) → "Open the full dossier". There's also a separate 3D globe section.
- **Story:** "One machine, one journey": a **6-stage timeline for each machine** (Launch → Touchdown → First drive → Science → … → Silence), with a fact box and sources for each stage.
- **Other:** a before/after **drag slider** (InSight's clean panels in 2018 vs. dusty in 2022) and a "Still talking" live data band.
- **Games:** 5-question quiz (wrong answer → "Not quite. The answer is… + explanation + **Open the dossier**"), Match the machine (machine ↔ what it did), **Where did it land?** (tap the map, score points), Build a mission (destination, power, vehicle, instrument → compare with real machines), and a teacher lesson plan.
- **Flow:** Hero → map/globe → marker → panel → dossier ↔ journey; quiz → dossier.
- **Learn:** ① the year slider on the map; ② a per-machine journey timeline; ③ quiz feedback that links back to the story; ④ "Match the machine" is easy to build; ⑤ including **landing debris** as objects.

### #3 Abandoned but Not Forgotten (5 chapters): [site](https://abandonednotforgotten.vercel.app) · [repo](https://github.com/Perfectreviewer/abandoned-but-not-forgotten)
- **Purpose:** a scroll story for ages 10–15 about 6 objects: Moon (retroreflector, LRV, Surveyor 3) and Mars (Sojourner, Opportunity, InSight), plus a Voyager 1 epilogue.
- **Map:** a 3D NASA globe on each world page with gold dots at real coordinates, and object cards below.
- **Story (best structure):** 5 chapters: *Meet the machine* (3D model + 3 hotspots) → *Mission* → *What it discovered* → *Where it rests* (fly down to the site) → *Unfinished question*. Facts are split into **Confirmed / Scientists think / Still unknown**.
- **Timeline:** vertical, 1967–2022. Only 1 entry rendered during my visit.
- **Game:** "Your next mission" (pick an answer to the open question) → lights a star in **"My question constellation"** (saved in the browser). Chapters 3 and 5 rendered empty for me (**verified**: the build looks broken there).
- **Data:** `src/data/objects.json` with fields like `character, purpose, mission, discoveries[], hotspots[], confirmed[], inferred[], unknown[], question, nextMissionChoices, sources, verifiedBy`.
- **Learn:** ① a fixed chapter template for every machine; ② the confirmed / think / unknown split; ③ a progress bar of chapters; ④ a teacher page; ⑤ a `verifiedBy` field for each fact.

### #4 StarBound: [site](https://starbound-tribute-to-abandoned-rovers.netlify.app/) · [repo](https://github.com/tayyab011/Spaceappschallenge2026)
- **Purpose:** a Kids mode (mascot comic) and an Adult mode (stories, 3D, map, recovery ideas).
- **Machines:** the largest set. **Map has 38 sites** (30 Moon, 8 Mars), including Ranger 7–9 impacts, Lunar Orbiters, Surveyors 1–7, all 6 Apollo LMs, ALSEPs, and GRAIL. The **story shelf has 58 "volumes"** that also cover Venus (Mariner 2/5), Mercury (Mariner 10), Saturn (Cassini), deep space (Pioneer 10/11) and solar orbit (Apollo 10 "Snoopy").
- **Map:** 2D NASA Trek basemap (MapLibre), Moon/Mars toggle, status filters (Impacted / Still orbiting), a **"Left behind by year" slider**, zoom buttons and a clickable list. Uncertain positions are marked "(Appx)" or "draft coordinates".
- **Story:** a bookshelf of spines → click → a 4-page "book" with Prev/Next (Phoenix: "Origin: Digging into the Martian Arctic"…).
- **Game:** kids badges, "Be Rover", rover anatomy, career badges.
- **Learn:** ① **the bookshelf UI** for picking a story; ② honest "approximate" labels on the map; ③ two reading levels.

### #5 CUỘI / Light of Memories: [site](https://light-of-memories.vercel.app) · [repo](https://github.com/VuLeCoder/Light-of-Memories) *(README + first visit)*
- A pixel game (Phaser): a Vietnamese folk hero meets Surveyor 3 → Apollo 11 → LRO. A companion book fills in as you play and exports to PDF.
- **Learn:** ① a character/guide who travels between machines; ② a story "journal" that fills in as you progress.

### #6 AFTERTRACE: [site](https://rasan-omed144.github.io/AfterTrace-Space-Graveyard/) · [repo](https://github.com/Rasan-Omed144/AfterTrace-Space-Graveyard)
- **Purpose:** a short "field guide" (one HTML file) for each world.
- **Story:** question-style headings ("What stayed on the Moon?", "What did the landing leave?"), with real photos and NASA links. Covers descent stages, experiments (ALSEP switched off in 1977), Lunokhod, parachutes, heat shields and sky cranes.
- **Game:** a **photo puzzle**. Pick a mission photo (Apollo 11, Apollo 14, InSight, Opportunity from orbit) → place 9 tiles → move counter → full photo and credit revealed.
- **Learn:** ① question headings; ② a simple, realistic puzzle; ③ a "what did the landing leave?" angle.

### #7 Comic site: [site](https://tamnya.github.io/abandoned-but-not-forgotten/) · [repo](https://github.com/Tamnya/abandoned-but-not-forgotten)
- **Purpose:** comic "issues" (Moon / Mars / Deep space) written as "incoming transmissions".
- **Story:** each fact is a short transmission card with an ID like `[F-011]` and an "Open proof card" button that leads to its source in the **Almanac**. Facts that change over time say "As of [date]".
- **Game:** an arcade shooter (unrelated to the science), plus collectible planet stickers you find around the site and a printable certificate.
- **Learn:** ① **fact IDs + proof cards**; ② "As of" dates; ③ a printable certificate.

### #8 Unity game: [site](https://agneay-community-hub.github.io/AbandonedNotForgotten/) · [repo](https://github.com/Agneay-Community-Hub/AbandonedNotForgotten) *(repo moved)*
- A 3D flight game from Earth to Mars to find Opportunity, using today's real planet positions. The README also lists an x-ray parts view and a traverse map.
- **Learn:** a "go find the machine" mission framing. Unity itself is not realistic for us.

### #9 Abandoned Archive (Uzbekistan): [site](https://forgotten.marsdot.uz) · [repo](https://github.com/zufqqq-web/AbandonedNASA)
- **Map:** Leaflet with NASA Trek tiles, Moon/Mars buttons, 11 Mars markers and a "Sector objects" list. Marker → small popup (type, year, site, coordinates) → "Open mission dossier".
- **Timeline:** 14 numbered items (1967–2021); clicking one shows a detail card (summary, site, distance travelled, status) → dossier.
- **Games:** "Restore connection" (pick a spacecraft → tune frequency → time the uplink to the delay) and a 5-question quiz with a score.
- **Issues (verified):** Russian text leaks into English mode; claims "100% protected monuments"; lists active rovers as "permanent hardware".
- **Learn:** ① popup → dossier pattern; ② numbered timeline + detail card.

### #10 SPACE GRAVEYARD: [site](https://space-graveyard.vercel.app) · [repo](https://github.com/samiulislam66200-alt/space-graveyard)
- **Explorer:** search box, Moon/Mars filter, hardware-type dropdown, sort, CSV export, and a card for each of 6 objects ("Why it matters" + "Explore mission story").
- **Visualizations:** 4 charts (design life vs. actual life, distance driven, InSight power loss, instruments).
- **Learn:** ① a "design life vs. actual life" chart is a powerful, simple story; ② filters are only useful once there are 15+ items.

## 3–7. Feature analysis (cross-project)

| Feature | Common pattern | Best version | Easiest good version for us |
|---|---|---|---|
| **Map** | Moon/Mars toggle → markers → popup or panel → story | EXOARCHIVE (2D + year slider + side panel) | Flat NASA image + CSS dots + side panel |
| **Story** | Card → modal or page | #3 (5 chapters + confirmed/unknown) | Fixed 5-section template from JSON |
| **Timeline** | Vertical list of years | EXOARCHIVE per-machine "journey" | 5-stage journey per machine |
| **Game** | Multiple-choice quiz | EXOARCHIVE (feedback + link to story; Match; Where did it land?) | Investigation "case file" + Match |

**Map user flows (verified):**
- #1: Map tab (Mars) → list or pin → camera flies → card (status, last heard, live radio delay) → Open full story (modal)
- #2: Map (Moon/Mars) → year slider → marker → side panel (summary + 3 science bullets) → Open dossier → journey timeline
- #4: Map → Moon/Mars + status filter + year slider → list or marker → info → story volume
- #9: Map → Moon/Mars → marker → popup → Open mission dossier

## 8–10. Equipment coverage across references
- **Moon (most to least common):** Apollo 11 LM descent stage, Surveyor 3, Apollo 15 LRV, retroreflectors, ALSEP, other Apollo LMs, Surveyor 1, Ranger 7–9 impacts, Lunar Orbiters, GRAIL, LADEE, Lunar Prospector, personal items (golf balls, Fallen Astronaut). Usually grouped **by mission or year**.
- **Mars:** Opportunity, Spirit, Sojourner/Pathfinder, InSight, Ingenuity, Phoenix, Viking 1/2, Mars Polar Lander, plus active Curiosity and Perseverance (should be labelled "still working"). Rare items: heat shields, backshells, parachutes. Usually grouped **by year or status**.
- **Other bodies (only #1, #4, #3 epilogue):** Voyager 1/2, Pioneer 10/11, Mariner 2/5 (Venus), Mariner 10 (Mercury), Cassini (Saturn). **Recommendation: leave these out.** The challenge title is the Moon and Mars.
- Full NASA facts for each machine were in the earlier `research/mission-analysis.md`. That file was removed in the "Remove docs and research" commit, but it can still be recovered from git history.

### 📋 Master machine table (all references)

**How to read it**
- **"In refs":** which of the 10 reference projects mention the machine (#1 Left Behind, #2 EXOARCHIVE, #3 5-chapter, #4 StarBound, #5 CUỘI, #6 AFTERTRACE, #7 Comic, #8 Unity, #9 Archive UZ, #10 Graveyard). It comes from a keyword scan of each repo plus my site visits, so treat it as **approximate**.
- **"Status" and "What happened":** short summaries. Check each one against its NASA page before publishing.
- ⭐ = suggested for our 8-machine MVP.

#### 🌕 Moon

| Machine | Type | Mission / year | Status today | What happened | In refs | Our pick |
|---|---|---|---|---|---|---|
| Ranger 7, 8, 9 | Impact probe | Ranger, 1964–65 | Destroyed (planned impact) | Took close-up photos, then crashed on purpose | #1, #2, #4 | |
| Surveyor 1 | Robotic lander | Surveyor, 1966 | Silent | First US soft landing; proved the ground could hold a lander | #1, #4 | |
| Surveyor 3 | Robotic lander | Surveyor, 1967 | Silent | Lunar night; **visited by Apollo 12**, which took its camera home | #1, #2, #3, #4, #5, #7, #9, #10 | ⭐ |
| Surveyor 5, 6, 7 | Robotic landers | Surveyor, 1967–68 | Silent | Ended by the lunar night after their missions | #4 | |
| Lunar Orbiter 1–5 | Orbiter → impact | Lunar Orbiter, 1966–67 | Destroyed (planned impact) | Mapped landing sites, then were crashed on purpose | #2, #4 | |
| Apollo 11 LM "Eagle" descent stage | Lander base | Apollo 11, 1969 | Left on purpose | Used as the launch pad for the ascent stage | #1, #2, #4, #5, #6, #7, #9, #10 | ⭐ |
| Apollo 12, 14, 15, 16, 17 descent stages | Lander bases | Apollo, 1969–72 | Left on purpose | Same as Eagle | #1, #4, #6, #7, #9 | |
| Apollo 11 laser retroreflector | Mirror experiment | Apollo 11, 1969 | ✅ **Still used** | No power needed; lasers still bounce off it | #1, #2, #3, #4, #7, #9, #10 | ⭐ |
| Apollo 14 & 15 retroreflectors | Mirror experiments | Apollo, 1971 | ✅ Still used | Same as above | #1, #2, #4 | |
| ALSEP science stations | Seismometers etc. | Apollo 12, 14, 15, 16, 17 | Switched off | NASA stopped receiving data in 1977 | #2, #4, #5, #6, #7, #9 | |
| Lunar Roving Vehicles (LRV-1, 2, 3) | Moon buggy | Apollo 15, 16, 17 (1971–72) | Left on purpose | Too heavy to bring home; parked at each site | #1, #2, #3, #4, #7, #9, #10 | ⭐ (Apollo 15) |
| Personal items (golf balls, Fallen Astronaut, family photo, waste bags) | Artifacts | Apollo 14, 15, 16 … | Left on purpose | Memorials, a stunt, and weight saving | #2, #9 | |
| Lunar Prospector | Orbiter → impact | 1998–99 | Destroyed (planned impact) | Crashed into a polar crater to search for water | #4 | |
| LCROSS | Impactor | 2009 | Destroyed (planned impact) | Hit a polar crater and **found water ice** | #2, #10 | |
| GRAIL "Ebb" & "Flow" | Twin orbiters → impact | 2012 | Destroyed (planned impact) | Mapped the Moon's gravity, then crashed on purpose | #4 | |
| LADEE | Orbiter → impact | 2013–14 | Destroyed (planned impact) | Studied lunar dust and atmosphere | #4 | |
| *Lunokhod 1 & 2 (Soviet, not NASA)* | Rover | 1970–73 | Silent | Contact lost | #4, #6 | ✖ not NASA |

**Moon total seen across refs:** about 30 items (StarBound's map alone has 30 Moon sites).

#### 🔴 Mars

| Machine | Type | Mission / year | Status today | What happened | In refs | Our pick |
|---|---|---|---|---|---|---|
| Viking 1 lander | Lander | Viking, 1976 | Silent | **A faulty command** cut contact in 1982 | #1, #2, #4, #7, #9 | |
| Viking 2 lander | Lander | Viking, 1976 | Silent | Batteries failed in 1980 | #1, #2, #4, #7, #9 | |
| Mars Pathfinder + Sojourner | Lander + first rover | 1997 | Silent | Lander contact lost after about 3 months | #1, #2, #3, #4, #7, #9 | |
| Mars Polar Lander | Lander | 1999 | **Lost** | Likely crashed on landing; never found for certain | #2, #4, #9 | |
| Spirit (MER-A) | Rover | 2004 | Silent | **Stuck in sand** in 2009; silent since 2010 | #1, #2, #4, #6, #7, #9 | ⭐ |
| Opportunity (MER-B) | Rover | 2004 | Silent | **Dust storm** in 2018; drove 45 km | all except #5 | ⭐ |
| Opportunity's heat shield | Landing debris | 2004 | Left on purpose | Dropped during landing | #2 | |
| Phoenix | Lander | 2008 | Silent | **Froze in the polar winter**; confirmed water ice | #1, #2, #4, #9 | ⭐ |
| InSight | Lander | 2018 | Silent | **Dust on its solar panels**; detected about 1,319 marsquakes | #1, #2, #3, #4, #6, #9, #10 | |
| Ingenuity | Helicopter | 2021 | Grounded | **Rotor damage** after 72 flights (planned: 5) | #1, #2, #4, #7, #9 | ⭐ |
| Perseverance landing gear (sky crane, backshell, parachute, heat shield) | Landing debris | 2021 | Left on purpose | Thrown away during landing | #2, #6, #10 | |
| Curiosity | Rover | 2012 | ✅ **Still working** | Active; not abandoned | #1, #2, #7, #9, #10 | label "active" |
| Perseverance | Rover | 2021 | ✅ **Still working** | Active; has left sample tubes on the surface | #1, #2, #4, #9, #10 | label "active" |
| Mars orbiters (Mariner 4/6/7/9, Viking orbiters, Mars Global Surveyor, Mars Observer) | Orbiters / flybys | 1965–2006 | Ended | In orbit or lost, not on the surface | #4 | ✖ not on the surface |

**Mars total seen across refs:** about 13 surface items (EXOARCHIVE has 13 Mars sites; StarBound's map has 8).

#### 🪐 Deep space and other bodies (only some refs; **not recommended for our MVP**)

| Machine | Where | Year | Status today | In refs |
|---|---|---|---|---|
| Voyager 1 & 2 | Interstellar space | 1977 | ✅ Still sending data | #1, #3, #4, #7 |
| Pioneer 10 & 11 | Leaving the solar system | 1972–73 | Silent | #4, #7 |
| Pioneer 5 | Solar orbit | 1960 | Silent | #4 |
| Apollo 10 "Snoopy" ascent stage | Solar orbit | 1969 | Drifting | #4 |
| Mariner 2 & 5 | Venus flybys | 1962, 1967 | Ended | #4 |
| Mariner 10 | Mercury flybys | 1974–75 | Ended | #4 |
| Cassini | Saturn (ended in a deliberate plunge) | 1997–2017 | Destroyed (planned) | #4 |
| New Horizons | Kuiper Belt | 2006 | ✅ Still working | #4 (mention) |

#### ⭐ Suggested 8 for our MVP (each has a different "what happened")
| World | Machine | "What happened" answer for the Case Files game |
|---|---|---|
| Moon | Surveyor 3 | Visited by humans |
| Moon | Apollo 11 descent stage | Left on purpose |
| Moon | Apollo 15 Lunar Rover | Left on purpose (too heavy) |
| Moon | Apollo 11 retroreflector | Still working |
| Mars | Spirit | Got stuck |
| Mars | Opportunity | Dust storm |
| Mars | Phoenix | Froze in winter |
| Mars | Ingenuity | Damaged rotor |

*Possible swaps:* ALSEP (switched off), Viking 1 (human error), Mars Polar Lander (missing), or a heat shield (landing debris). Any of these adds a new kind of answer to the game.

## 11–12. How the features connect and are organised
- **Connected (good):** #1, #2, #3. One record per machine, and every feature links to the same story view.
- **Separate sections (weaker):** #9, #10, #7. The map, timeline and quiz sit side by side on one long page and only loosely link to each other.
- **Organisation patterns seen:** World → Machine → Story (#3); Map/List → Panel → Dossier (#2, #9); Bookshelf → Book (#4); Catalogue with filters (#10).
- **Best for us:** **World → Map → Machine panel → Story (with a built-in journey timeline) → Investigation case**, all driven by one `machines.json`.

## 13. Comparison table

| Project | Main idea | Places | Machines | Map | Story | Timeline | Game/Quiz | Best feature | Difficulty |
|---|---|---|---|---|---|---|---|---|---|
| #1 Left Behind | Scroll flight + catalogue | Moon, Mars, deep space | 18 | 3D globe + list | Modal | Year list | Listening room | One shared story modal | High |
| #2 EXOARCHIVE | Museum archive | Moon, Mars | 20 | 2D + year slider | Dossier | Per-machine journey | Quiz, Match, Where landed, Build | Connected flow | High |
| #3 5-chapter | Story per object | Moon, Mars (+Voyager) | 6 | 3D globe dots | 5 chapters | Year list | Question constellation | Story template | High |
| #4 StarBound | Kids + Adult | Moon, Mars, +6 bodies | 38 map / 58 stories | 2D + filters + slider | 4-page book | (map slider) | Badges | Bookshelf UI | High |
| #5 CUỘI | Folk-tale game | Moon | 3 | — | Game + book | — | Pixel game | Character guide | High |
| #6 AFTERTRACE | Field guide | Moon, Mars | ~12 | — | Q-headings | — | Photo puzzle | Simple puzzle | **Low** |
| #7 Comic | Comic issues | Moon, Mars, deep space | ~15 | — | Transmissions | — | Stickers, arcade | Fact proof cards | Low–Med |
| #8 Unity | Fly to Mars | Mars | 1 | Traverse map | In game | History | 3D flight | Mission framing | Very high |
| #9 Archive UZ | Catalogue + map | Moon, Mars | ~15 | Leaflet popups | Dossier | Numbered list | Signal game, quiz | Popup → dossier | Medium |
| #10 Graveyard | Data explorer | Moon, Mars | 6 | SVG | Story page | — | Quiz | Lifespan chart | Medium |

**Answers:** best map = **#2** · best storytelling = **#3** · best timeline = **#2** (per-machine journey) · best interactivity = **#2** (feedback + link back) · best organisation = **#1** (one record per machine, one shared modal) · strongest overall = **#1 / #2** · realistic for us = 2D map (#2/#9 style), story template (#3), journey timeline (#2), quiz feedback (#2), Match game (#2), photo puzzle (#6), fact proof links (#7).

## 14–16. Ideas to take, add or avoid
- **Take:** one `machines.json`; status badges; a "last heard" date; a 5-stage journey; confirmed / think / unknown; answer feedback that links to the story; "Match the machine"; "Where did it land?"; a before/after slider (stretch).
- **Not yet in our plan:** a **year slider** on the map; **status filter chips**; a "design life vs. actual life" bar; a **landing-debris** machine; a **teacher page**; **proof links** on facts.
- **Avoid:** 3D globes/models, live APIs, Unity/Phaser, a 2nd language before the MVP is done, 20+ machines, a backend or Firebase, unrelated arcade games, decorative "telemetry" text, and other planets.

## 17. Recommended MVP (5 beginners, 48 hours)
1. **Explore map:** Moon/Mars toggle; a flat NASA image; dots placed from latitude/longitude; click → side panel (name, status badge, years, one-line hook, "Read story").
2. **Machine story page:** one template for every machine: Meet it → Why NASA sent it → What it discovered → What happened to it → Where it is now. Each section has a NASA photo and a source link.
3. **Journey timeline** inside each story: 5 dots (Launch → Landing → Big discovery → Last signal → Today).
4. **Investigation game, "Case Files":** for each machine, show 3 clues (a photo, its "last heard" date, its location or season) → the player picks *what happened* (Got stuck / Dust covered panels / Froze in winter / Switched off / Left on purpose / Still working) → reveal + explanation + "Read the full story" link. Score = cases solved.
5. **About / Sources / AI-use** page.

## 18. Stretch (only after the MVP works)
A year slider on the map → "Match the machine" → a whole-mission timeline page → a before/after slider (InSight dust) → a teacher page → French → read-aloud.

## 19. Recommended user journey
```
Home ("They stopped. Their stories didn't.")  →  [Explore the map]  or  [Solve a case]
  Map → Moon | Mars → click dot → side panel → Read story
  Story → 5 sections + journey timeline → "Can you solve its case?" →
  Case File → clues → choose what happened → reveal → next case / back to map
```
Every page links to the others **through the machine**, so it feels like one connected experience.

## 20. Recommended structure
```
HOME
├── EXPLORE (map)  ── Moon | Mars ── dot → panel ──┐
├── MACHINES (story pages, 1 per machine) ◄────────┘  (includes journey timeline)
├── CASE FILES (investigation game) ── reveal links → machine story
└── ABOUT & SOURCES (+ How we used AI)
data/machines.json  ← one record feeds map, story, timeline and case
```
**Number of machines:** **8** (MVP floor: 6). **Balance:** **4 Moon + 4 Mars**.
- Moon suggestions: Surveyor 3, Apollo 11 LM descent stage, Apollo 15 LRV, Apollo 11 retroreflector (still working).
- Mars suggestions: Spirit (stuck), Opportunity (dust), Phoenix (froze), Ingenuity (rotor damage).
- These give six different "what happened" answers, which makes the game work.

## 21. Open questions for your team
1. Target age: 10–12 or 13–15? (This changes reading level and design.)
2. Keep the "Final Command" decision idea from `docs/PRD.md`, or replace it with "Case Files"? (They could be combined: the case reveal can show the decision NASA made.)
3. Final 8 machines: swap any for ALSEP (switched off) or a landing heat shield?
4. Map style: flat image + dots (recommended), or Leaflet with NASA Trek tiles (harder)?
5. Should each story have a first-person "machine voice" or a narrator?
6. Visual style: dark space, museum archive, comic, or field journal?
7. Who does the fact checking, and which NASA pages count as the source?

## Verification of this research
- Live features were tested on 10 Nov 2026 in the browser pane; the repo data files were read from local clones.
- Wherever only the README was available, the section says so.
- No project files were changed. After approval, the only action is saving this report to `research/reference-analysis.md`.
