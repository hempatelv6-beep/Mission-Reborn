# Databases and APIs (R1)

*Checked 13 Nov 2026. ✔ means I opened or tested it this session. ? means it still needs checking.*

**Bottom line:** almost all of our information is on **web pages, which we read by hand**. Only the NASA Image Library has a simple API. We will **collect the data once into local JSON and image files** and make no live API calls during the demo.

| Resource | What it gives us | API? | Key needed? | Fit for us | How we'll get the data |
|---|---|---|---|---|---|
| **NSSDCA spacecraft pages** (nssdc.gsfc.nasa.gov/nmc) ✔ | ID, launch date, mass, instrument list, description; for Apollo, also **landing, ALSEP and impact coordinates** | No public API: HTML pages | — | **Excellent** for basic facts and coordinates | Read by hand and copy into the research files |
| **NSSDCA Apollo landing-site table** ✔ ([lunar_sites](https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html)) | Lat/lon for the Apollo 11–17 LMs, measured from LRO images (Wagner et al. 2017) | No | — | **Our main source for Moon coordinates** | Copy into `locations.md` |
| **NASA Science mission pages** (science.nasa.gov/mission/…) ✔ | Story, dates, status, discoveries | No | — | **Excellent** for the story and the "what happened" section | Read by hand |
| **NASA Image & Video Library** ✔ (images.nasa.gov) | Official photos with title, date, description, NASA ID | **Yes**: `https://images-api.nasa.gov/search?q=…&media_type=image` (tested; returns JSON) | **No** (tested without a key) | **Excellent** for finding photos | Search, then **download** the chosen images into the project. Record `nasa_id` and the credit |
| **NASA PDS** (pds.nasa.gov) ? | Raw science data archives (for example, seismometer records) | Some search services | ? | **Too complex for the MVP.** We'd only link to it | Link only |
| **USGS Astrogeology / LROC** ? | Global Moon and Mars map mosaics; LROC site images | Downloads (the USGS product page returned 403 to my fetch tool, so I'll check it in the browser in R5) | ? | Needed for the **2D map images** | Download once, in R5 |
| **api.nasa.gov** (APOD, Mars Rover Photos, etc.) ? | Daily images, rover photos | Yes | Free key (DEMO_KEY has rate limits) | Not needed for the MVP | Skip |

## What NSSDCA does NOT give us
- Little on **what happened to the machine** (end of mission, why it stopped). NASA Science pages cover that.
- **Lunar Roving Vehicles have no page of their own**: the link we were given (1971-063C) is the *Apollo 15 LM/ALSEP*. The rover appears inside the Apollo mission pages. ? Find the best official LRV source in R3.
- Good modern photos. The Image Library covers those.

## Things to watch for (found during R1)
- **Dates can differ by one day** between sources because of time zones. For example, Surveyor 3 landed on 20 Apr 1967 **UT** (science.nasa.gov), while the Image Library caption says "April 19" (US time). **We'll always use UT and note it.**
- Coordinate systems: the NSSDCA Apollo table uses planetocentric Mean Earth/Polar Axis (DE421) coordinates. That's fine for a simple equirectangular map.

## Image usage (NASA's guidelines ✔ [nasa.gov images and media](https://www.nasa.gov/nasa-brand-center/images-and-media/))
- NASA images are generally **not copyrighted**. **Credit NASA** as the source.
- Educational and informational websites are allowed. Don't imply that NASA endorses the site.
- The **NASA logo ("meatball") and insignia are not free to use**, so we won't use them as our branding.
- **Third-party images** (marked with another copyright holder's name) are **not covered**, so we skip them or ask the owner.

---
**Review status:** ☑ Claude drafted · ☐ ChatGPT reviewed · ☐ Lead approved
