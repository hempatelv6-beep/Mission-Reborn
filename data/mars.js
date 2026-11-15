// Mars machines. Writers edit this file, not app.js. Rules: see DATA_GUIDE.md.
// Facts come word for word from our "Website Text" doc (checked against NASA pages on 2026-11-14).
// words: tap-to-explain meanings. Each meaning must come from this machine's own text.
// talkingLine is a story line we wrote. It is not a fact and must not appear in a quiz.
const MARS = {
  id: "mars",
  planet: "Mars",
  title: "5 machines on Mars",
  hook: "They went quiet one by one. This is where they are.",
  // Fun facts for the home page. Each one quotes the NASA page it comes from.
  funFacts: [
    {
      text: "Mars' air is less than 1 percent as thick as Earth's. That's the air Ingenuity had to fly in.",
      source: { label: "Ingenuity Mars Helicopter, NASA Science", url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/" },
      quote: "Thin atmosphere, less than 1 percent as dense as Earth's"
    },
    {
      text: "Over all its flights, Ingenuity spent 128.8 minutes in the air and covered 17 kilometers.",
      source: { label: "Ingenuity Mars Helicopter, NASA Science", url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/" },
      quote: "Completed 128.8 flying minutes, covering 10.5 miles (17.0 kilometers)"
    },
    {
      text: "Opportunity lasted 60 times longer than planned. It was also the first to travel farther than a marathon on another world.",
      source: { label: "Opportunity, NASA Science", url: "https://science.nasa.gov/mission/mer-opportunity/" },
      quote: "Opportunity exceeded its life expectancy by 60 times ... the first human enterprise to exceed marathon distance of travel on another world."
    },
    {
      text: "InSight found that rocky material that crashed into Mars long ago now sits in giant lumps deep inside the planet, in its mantle.",
      source: { label: "InSight Lander, NASA Science", url: "https://science.nasa.gov/mission/insight/" },
      quote: "Rocky material that impacted Mars lies scattered in giant lumps throughout the planet's mantle"
    }
  ],
  machines: [
    {
      id: "r1",
      name: "Viking 1 lander",
      launched: "20 August 1975",
      year: 1975,
      talkingLine: "I was the first to really land here. Then I scooped the soil, looking for life.",
      image: {
        src: "images/mars/viking-1-drawing.jpg",
        width: 1280, height: 972,
        alt: "A line drawing of the Viking lander, with three legs, a long robotic arm and antennas on top.",
        type: "Drawing",
        credit: "NASA",
        from: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/internal_resources/3514/Viking_Lander_Line_Drawing-1.jpeg"
      },
      whatItWas: "Viking 1 was an orbiter and a lander sent to collect evidence about whether there could be life on Mars. It made the first truly successful landing on Mars.",
      carried: [
        "Two cameras",
        "A robotic arm to scoop up soil",
        "A biology laboratory to test the soil for signs of life"
      ],
      whatHappened: "The lander touched down on 20 July 1976. On 28 July its arm scooped up the first soil samples. Some tests looked a little like signs of life, but the main test for organic compounds found none. It kept working until 11 November 1982, when a faulty command from Earth cut off contact.",
      whereItIsNow: "It is still on the western slopes of Chryse Planitia, the \"Golden Plain\". In 1982 it was renamed the Thomas Mutch Memorial Station.",
      words: [
        { term: "Chryse Planitia", meaning: "A plain on Mars. Its name means the \"Golden Plain\"." }
      ],
      sources: [
        { label: "Viking 1, NASA Science", url: "https://science.nasa.gov/mission/viking-1/" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "What was Viking 1 sent to find evidence about?",
          options: ["Whether Mars has oceans", "Whether there could be life on Mars", "How old Mars is", "Where to build a base"],
          answer: 1,
          whenRight: "Correct! It was sent to collect evidence about whether there could be life on Mars.",
          whenWrong: "Not quite. It was looking for evidence about whether there could be life on Mars."
        },
        {
          question: "What cut off contact with Viking 1 in 1982?",
          options: ["A dust storm", "It ran out of fuel", "A faulty command from Earth", "A marsquake"],
          answer: 2,
          whenRight: "Correct! A faulty command from Earth cut off contact on 11 November 1982.",
          whenWrong: "Not quite. A faulty command from Earth cut off contact."
        },
        {
          question: "What was the Viking 1 lander renamed in 1982?",
          options: ["The Golden Plain Lander", "Viking Forever", "Chryse Station", "The Thomas Mutch Memorial Station"],
          answer: 3,
          whenRight: "Correct! It became the Thomas Mutch Memorial Station.",
          whenWrong: "Not quite. It was renamed the Thomas Mutch Memorial Station."
        }
      ]
    },
    {
      id: "r2",
      name: "Sojourner (Mars Pathfinder)",
      launched: "4 December 1996",
      year: 1996,
      talkingLine: "I was only 30 cm tall, but I was the first rover on Mars.",
      image: {
        src: "images/mars/sojourner.jpg",
        width: 1600, height: 765,
        alt: "The small Sojourner rover on the rocky red ground of Mars, near the Pathfinder lander and its deflated airbags.",
        type: "NASA photo",
        credit: "NASA/JPL",
        from: "https://science.nasa.gov/wp-content/uploads/2017/12/pia00621-pathfinder-and-sojourner-with-airbags-deflated.jpg"
      },
      whatItWas: "Sojourner was the first robotic rover on Mars. It weighed 10.6 kg and stood 30 cm tall. It was named after the civil-rights crusader Sojourner Truth, and it rode to Mars on the Mars Pathfinder lander.",
      carried: [
        "An Alpha Proton X-ray Spectrometer, which found out what elements rocks and soil were made of",
        "Cameras: it sent back 550 images"
      ],
      whatHappened: "Pathfinder landed on 4 July 1997, bouncing on giant airbags about 15 times before stopping. The next night, Sojourner rolled down a ramp onto Mars. The mission's final data came on 27 September 1997.",
      whereItIsNow: "It is parked for good at Ares Vallis, an ancient flood plain in the northern half of Mars.",
      words: [
        { term: "Alpha Proton X-ray Spectrometer", meaning: "An instrument that found out what elements rocks and soil were made of." },
        { term: "Ares Vallis", meaning: "An ancient flood plain in the northern half of Mars." }
      ],
      sources: [
        { label: "Mars Pathfinder, NASA Science", url: "https://science.nasa.gov/mission/mars-pathfinder/" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "Who was Sojourner named after?",
          options: ["A NASA engineer", "The civil-rights crusader Sojourner Truth", "A Mars crater", "The first astronaut"],
          answer: 1,
          whenRight: "Correct! It was named after Sojourner Truth.",
          whenWrong: "Not quite. It was named after the civil-rights crusader Sojourner Truth."
        },
        {
          question: "How did Pathfinder land on Mars?",
          options: ["On wheels", "By parachute into a lake", "Bouncing on giant airbags", "Hanging from a crane"],
          answer: 2,
          whenRight: "Correct! It bounced on giant airbags about 15 times.",
          whenWrong: "Not quite. It bounced on giant airbags about 15 times before stopping."
        },
        {
          question: "How many images did Sojourner send back?",
          options: ["15", "550", "6,326", "72"],
          answer: 1,
          whenRight: "Correct! Sojourner sent back 550 images.",
          whenWrong: "Not quite. Sojourner sent back 550 images."
        }
      ]
    },
    {
      id: "r3",
      name: "Spirit & Opportunity",
      launched: "10 June 2003 (Spirit) and 7 July 2003 (Opportunity)",
      year: 2003,
      talkingLine: "We landed on opposite sides of Mars. One of us got stuck. The other kept driving.",
      image: {
        src: "images/mars/spirit-opportunity.jpg",
        width: 1238, height: 968,
        alt: "Opportunity's flat solar panels seen from above, mostly clean of dust, on the rover's deck on Mars.",
        type: "NASA photo",
        note: "Shows Opportunity only. Spirit looked the same.",
        credit: "NASA/JPL-Caltech",
        from: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/internal_resources/3447/solar_panels_on_rover_seen_from_above.jpeg"
      },
      whatItWas: "Spirit and Opportunity were identical twin rovers, each about the size of a golf cart. They landed on opposite sides of Mars to look for clues that water once existed there.",
      carriedLabel: "What it carried (each rover)",
      carried: [
        "Panoramic cameras (Pancam) on a mast about 1.5 m high",
        "A rock abrasion tool to grind into rocks",
        "Spectrometers on a robotic arm, to find out what rocks were made of"
      ],
      whatHappened: "Spirit landed at Gusev Crater on 3 January 2004. In May 2009 it got stuck in soft soil, and its last contact was on 22 March 2010. Opportunity landed at Meridiani Planum in January 2004 and drove 45.16 km. It fell silent on 10 June 2018, when a dust storm covered the whole planet.",
      whereItIsNow: "Spirit is still in Gusev Crater. Opportunity rests in Perseverance Valley.",
      words: [
        { term: "Pancam", meaning: "Panoramic cameras on a mast about 1.5 m high." },
        { term: "rock abrasion tool", meaning: "A tool that grinds into rocks." },
        { term: "Spectrometers", meaning: "Instruments that find out what rocks are made of." }
      ],
      sources: [
        { label: "Mars Exploration Rovers: Spirit and Opportunity, NASA Science", url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/" },
        { label: "Spirit, NASA Science", url: "https://science.nasa.gov/mission/mer-spirit/" },
        { label: "Opportunity, NASA Science", url: "https://science.nasa.gov/mission/mer-opportunity/" },
        { label: "Science Instruments, NASA Science", url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-instruments/" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "What were Spirit and Opportunity looking for clues of?",
          options: ["Life", "Water that once existed on Mars", "Gold", "Old Viking parts"],
          answer: 1,
          whenRight: "Correct! They looked for clues that water once existed there.",
          whenWrong: "Not quite. They looked for clues that water once existed on Mars."
        },
        {
          question: "What happened to Spirit in May 2009?",
          options: ["It got stuck in soft soil", "It flew away", "A dust storm buried it", "It fell into a crater"],
          answer: 0,
          whenRight: "Correct! Spirit got stuck in soft soil.",
          whenWrong: "Not quite. Spirit got stuck in soft soil in May 2009."
        },
        {
          question: "Why did Opportunity fall silent in 2018?",
          options: ["Its wheels broke", "A faulty command", "A dust storm covered the whole planet", "It reached the end of the road"],
          answer: 2,
          whenRight: "Correct! A planet-wide dust storm silenced it on 10 June 2018.",
          whenWrong: "Not quite. It fell silent when a dust storm covered the whole planet."
        }
      ]
    },
    {
      id: "r4",
      name: "InSight lander",
      launched: "5 May 2018",
      year: 2018,
      talkingLine: "I sat still and listened. I heard Mars shake, and I heard its wind.",
      image: {
        src: "images/mars/insight.jpg",
        width: 1280, height: 853,
        alt: "The InSight lander with its solar arrays spread open, tested in a clean room on Earth before launch.",
        type: "NASA photo (on Earth)",
        note: "Taken in a clean room on Earth before launch, not on Mars.",
        credit: "NASA/JPL-Caltech",
        from: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/8/38686_Mars-InSight-Solar-Panels-Open-pia196641.jpg"
      },
      whatItWas: "InSight was a lander that studied the deep inside of Mars. It was designed to take the planet's \"vital signs\": its pulse, temperature and reflexes.",
      carried: [
        "A seismometer, to measure marsquakes",
        "A heat flow probe",
        "A robotic arm, 1.8 m long, that lifted both off its deck and set them on the ground"
      ],
      whatHappened: "InSight landed on 26 November 2018. It also recorded the low rumble of Martian wind. Its mission ended on 15 December 2022, after it lost power.",
      whereItIsNow: "It sits on Elysium Planitia, a flat, smooth plain near Mars' equator. NASA picked the spot because it was safe, not for its rocks.",
      words: [
        { term: "seismometer", meaning: "An instrument that measures marsquakes." },
        { term: "Elysium Planitia", meaning: "A flat, smooth plain near Mars' equator." }
      ],
      // Real NASA recording. Details in AUDIO_CREDITS.md
      audio: {
        src: "audio/insight-wind.mp3",
        caption: "Wind blowing past InSight on Mars, picked up by its air pressure sensor. NASA sped the recording up so we can hear it.",
        credit: "NASA/JPL-Caltech/CNES/Cornell",
        page: "https://science.nasa.gov/resource/sounds-from-insights-pressure-sensor-on-mars",
        file: "https://assets.science.nasa.gov/content/dam/science/psd/mars/downloadable_items/4/42303_aps.mp4"
      },
      sources: [
        { label: "InSight Lander, NASA Science", url: "https://science.nasa.gov/mission/insight/" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "What did InSight's seismometer measure?",
          options: ["Wind speed", "Marsquakes", "Temperature of the Sun", "Dust on its panels"],
          answer: 1,
          whenRight: "Correct! The seismometer measured marsquakes.",
          whenWrong: "Not quite. Its seismometer measured marsquakes."
        },
        {
          question: "Why did NASA pick Elysium Planitia for InSight?",
          options: ["For its rocks", "Because it was safe", "Because it had water", "Because Viking was there"],
          answer: 1,
          whenRight: "Correct! NASA picked it because it was safe, not for its rocks.",
          whenWrong: "Not quite. NASA picked the spot because it was safe."
        },
        {
          question: "Why did InSight's mission end in 2022?",
          options: ["A marsquake knocked it over", "It got stuck", "It lost power", "A faulty command"],
          answer: 2,
          whenRight: "Correct! It ended on 15 December 2022, after it lost power.",
          whenWrong: "Not quite. Its mission ended after it lost power."
        }
      ]
    },
    {
      id: "r5",
      name: "Ingenuity Mars Helicopter",
      launched: "30 July 2020",
      year: 2020,
      talkingLine: "They planned five flights for me. I made 72.",
      image: {
        src: "images/mars/ingenuity.jpg",
        width: 1280, height: 953,
        alt: "A small helicopter with long rotor blades sits on a flat, dusty plain on Mars.",
        type: "NASA photo",
        credit: "NASA/JPL-Caltech",
        from: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/4/5/45954_PIA24581.jpg"
      },
      whatItWas: "Ingenuity was a small helicopter. It was a technology test, built to try the first powered, controlled flight on another planet. It rode to Mars strapped under the Perseverance rover.",
      carried: [
        "A solar panel that charged lithium-ion batteries",
        "Rotors about 1.2 m from tip to tip",
        "A navigation camera"
      ],
      whatHappened: "It landed with Perseverance on 18 February 2021 and first flew on 19 April 2021. It was planned for no more than five flights in 30 days, but it made 72 flights in nearly three years. Its last flight was on 18 January 2024, and the mission ended on 25 January 2024 after rotor damage.",
      whereItIsNow: "It stands still in Jezero Crater, Mars, where it can no longer fly.",
      words: [
        { term: "technology test", meaning: "Ingenuity's job: to try the first powered, controlled flight on another planet." }
      ],
      // Real NASA recording. Details in AUDIO_CREDITS.md
      audio: {
        src: "audio/ingenuity-flight.mp3",
        caption: "Ingenuity's fourth flight, recorded by the Perseverance rover's microphone 80 m away. Listen for a faint hum over the wind.",
        credit: "NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro",
        page: "https://science.nasa.gov/resource/listen-to-nasas-ingenuity-mars-helicopter-in-flight-2/",
        file: "https://assets.science.nasa.gov/content/dam/science/psd/mars/downloadable_items/4/46087_20210507_HelicopterFliesOnMars.mp3"
      },
      sources: [
        { label: "Ingenuity Mars Helicopter, NASA Science", url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "How many flights did Ingenuity make?",
          options: ["5", "30", "72", "550"],
          answer: 2,
          whenRight: "Correct! It was planned for five, and it made 72.",
          whenWrong: "Not quite. It made 72 flights, far more than the five planned."
        },
        {
          question: "How did Ingenuity get to Mars?",
          options: ["Strapped under the Perseverance rover", "It flew there by itself", "Inside InSight", "On the Viking orbiter"],
          answer: 0,
          whenRight: "Correct! It rode to Mars strapped under Perseverance.",
          whenWrong: "Not quite. It rode to Mars strapped under the Perseverance rover."
        },
        {
          question: "Why did Ingenuity's mission end?",
          options: ["Its battery died", "A dust storm", "Rotor damage", "It was too cold"],
          answer: 2,
          whenRight: "Correct! The mission ended on 25 January 2024 after rotor damage.",
          whenWrong: "Not quite. It ended after rotor damage."
        }
      ]
    }
  ]
};
