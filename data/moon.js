// Moon machines. Writers edit this file, not app.js. Rules: see DATA_GUIDE.md.
// Facts come word for word from our "Website Text" doc (checked against NASA pages on 2026-11-14).
// words: tap-to-explain meanings. Each meaning must come from this machine's own text.
// talkingLine is a story line we wrote. It is not a fact and must not appear in a quiz.
const MOON = {
  id: "moon",
  planet: "Moon",
  title: "5 machines on the Moon",
  hook: "They stayed behind. Here's why.",
  machines: [
    {
      id: "m1",
      name: "Surveyor 3",
      launched: "17 April 1967",
      year: 1967,
      talkingLine: "I bounced three times when I landed. Two years later, astronauts came and took my camera home.",
      image: {
        src: "images/moon/surveyor-3.jpg",
        width: 1280, height: 1280,
        alt: "A small robot lander with three legs sits on grey Moon dust, with the Apollo 12 lunar module in the background.",
        type: "NASA photo",
        credit: "NASA",
        from: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/07/as12-48-7134_1280.jpg"
      },
      whatItWas: "Surveyor 3 was a robot lander. It was the second Surveyor to make a soft landing, which means landing gently instead of crashing.",
      carried: [
        "A TV camera",
        "A surface sampler: a small scoop on an arm that could dig trenches up to 18 cm deep"
      ],
      whatHappened: "On 20 April 1967 its engines kept firing as it landed, so it touched down three times. It sent back 6,326 pictures, and its digging showed the soil was strong enough to hold an Apollo lunar module. Its last contact was on 4 May 1967.",
      whereItIsNow: "It still sits in Oceanus Procellarum. In 1969, Apollo 12 landed about 180 m away, and the astronauts took parts of it, including its camera, back to Earth.",
      words: [
        { term: "soft landing", meaning: "Landing gently instead of crashing." },
        { term: "surface sampler", meaning: "A small scoop on an arm that could dig trenches up to 18 cm deep." }
      ],
      sources: [
        { label: "Surveyor 3, NASA Science", url: "https://science.nasa.gov/mission/surveyor-3/" },
        { label: "Surveyor 3, NSSDCA", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "Why did Surveyor 3 touch down three times?",
          options: ["Its legs broke", "Its engines kept firing as it landed", "Astronauts moved it", "It landed on a hill"],
          answer: 1,
          whenRight: "Correct! Its engines kept firing, so it bounced and touched down three times.",
          whenWrong: "Not quite. Its engines kept firing as it landed, so it touched down three times."
        },
        {
          question: "What did Surveyor 3's digging show about the Moon's soil?",
          options: ["It was full of water", "It was too soft to land on", "It was strong enough to hold an Apollo lunar module", "It was made of metal"],
          answer: 2,
          whenRight: "Correct! The soil could hold up an Apollo lunar module.",
          whenWrong: "Not quite. Its digging showed the soil was strong enough to hold an Apollo lunar module."
        },
        {
          question: "What did the Apollo 12 astronauts take back to Earth?",
          options: ["Parts of Surveyor 3, including its camera", "The whole lander", "Its scoop only", "Nothing"],
          answer: 0,
          whenRight: "Correct! They took parts of it home, including its camera.",
          whenWrong: "Not quite. They took parts of Surveyor 3 back, including its camera."
        }
      ]
    },
    {
      id: "m2",
      name: "Apollo 11 \"Eagle\" descent stage",
      launched: "16 July 1969",
      year: 1969,
      talkingLine: "They flew home from my back. I stayed.",
      image: {
        src: "images/moon/apollo-11-eagle.jpg",
        width: 1600, height: 1609,
        alt: "The Apollo 11 lunar module stands on four legs on the grey surface of the Moon.",
        type: "NASA photo",
        credit: "NASA",
        from: "https://nssdc.gsfc.nasa.gov/planetary/image/ap11_lm_as11_40_5927.jpg"
      },
      whatItWas: "The lunar module Eagle was the first crewed vehicle to land on the Moon. Its bottom half, the descent stage, held the landing rocket and four landing legs.",
      carried: [
        "Neil Armstrong and Buzz Aldrin, the first people to walk on the Moon",
        "EASEP, a small science kit with a seismometer to feel moonquakes and a dust detector",
        "A laser reflector, called a laser ranging retroreflector, that needed no power"
      ],
      whatHappened: "Eagle landed on 20 July 1969. When the astronauts left the next day, the descent stage worked as their launch pad and was left behind. The EASEP stopped taking commands on 27 August 1969.",
      whereItIsNow: "The descent stage is still at the landing site in the Sea of Tranquility (Mare Tranquilitatis).",
      words: [
        { term: "descent stage", meaning: "The bottom half of the lunar module. It held the landing rocket and four landing legs." },
        { term: "EASEP", meaning: "A small science kit with a seismometer and a dust detector." },
        { term: "seismometer", meaning: "An instrument that feels moonquakes." }
      ],
      sources: [
        { label: "Apollo 11 Lunar Module / EASEP, NSSDCA", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "What job did the descent stage do when the astronauts left?",
          options: ["It flew them home", "It worked as their launch pad", "It drove them around", "It took photos"],
          answer: 1,
          whenRight: "Correct! It worked as their launch pad and was left behind.",
          whenWrong: "Not quite. The descent stage worked as their launch pad, then stayed on the Moon."
        },
        {
          question: "What does a seismometer do?",
          options: ["Measures wind", "Takes photos", "Feels moonquakes", "Makes power"],
          answer: 2,
          whenRight: "Correct! The EASEP seismometer was there to feel moonquakes.",
          whenWrong: "Not quite. A seismometer feels moonquakes."
        },
        {
          question: "Where is the Eagle descent stage now?",
          options: ["In a museum on Earth", "Ocean of Storms", "Cabeus crater", "Sea of Tranquility"],
          answer: 3,
          whenRight: "Correct! It's still at the landing site in the Sea of Tranquility.",
          whenWrong: "Not quite. It's still in the Sea of Tranquility (Mare Tranquilitatis)."
        }
      ]
    },
    {
      id: "m3",
      name: "Apollo 12 ALSEP science station",
      launched: "14 November 1969",
      year: 1969,
      talkingLine: "The crew switched me on and flew away. I kept sending data for almost eight years.",
      image: {
        src: "images/moon/apollo-12-alsep-stand-in.jpg",
        width: 950, height: 955,
        alt: "The Apollo 12 lunar module on the grey surface of the Moon.",
        type: "Stand-in photo",
        note: "Shows the Apollo 12 lander, not the ALSEP itself.",
        credit: "NASA",
        from: "https://nssdc.gsfc.nasa.gov/planetary/image/apollo12_lunar_module.jpg"
      },
      whatItWas: "ALSEP (Apollo Lunar Surface Experiments Package) was a set of science instruments that the Apollo 12 astronauts set up and left on the Moon. A central station gave them power and sent their data to Earth.",
      carried: [
        "A power generator (RTG) that turned heat from plutonium-238 into electricity",
        "A passive seismometer, to measure moonquakes",
        "Five more instruments, such as a magnetometer to measure the Moon's magnetic field"
      ],
      whatHappened: "It was switched on 19 November 1969. When the crew left, their lander's top half was crashed into the Moon on purpose, about 60 km away, and caused the first recorded artificial moonquake. The station was shut down on 30 September 1977.",
      whereItIsNow: "It is still at the Apollo 12 site in Oceanus Procellarum, the same area where Surveyor 3 landed.",
      words: [
        { term: "ALSEP", meaning: "Apollo Lunar Surface Experiments Package: a set of science instruments the astronauts set up and left on the Moon." },
        { term: "RTG", meaning: "A power generator that turned heat from plutonium-238 into electricity." },
        { term: "seismometer", meaning: "An instrument that measures moonquakes." },
        { term: "magnetometer", meaning: "An instrument that measures the Moon's magnetic field." }
      ],
      sources: [
        { label: "Apollo 12 Lunar Module / ALSEP, NSSDCA", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "What gave the ALSEP its power?",
          options: ["Solar panels", "A generator (RTG) using heat from plutonium-238", "Batteries from Earth", "The lander's rocket"],
          answer: 1,
          whenRight: "Correct! Its RTG turned heat from plutonium-238 into electricity.",
          whenWrong: "Not quite. An RTG turned heat from plutonium-238 into electricity."
        },
        {
          question: "What caused the first recorded artificial moonquake?",
          options: ["The lander's top half crashing into the Moon on purpose", "An astronaut jumping", "A meteor", "The rover driving fast"],
          answer: 0,
          whenRight: "Correct! The crew's lander top half was crashed into the Moon about 60 km away.",
          whenWrong: "Not quite. The lander's top half was crashed into the Moon on purpose, about 60 km away."
        },
        {
          question: "When was the Apollo 12 station shut down?",
          options: ["1969", "1971", "1977", "2009"],
          answer: 2,
          whenRight: "Correct! It was shut down on 30 September 1977.",
          whenWrong: "Not quite. It was shut down on 30 September 1977."
        }
      ]
    },
    {
      id: "m4",
      name: "Apollo 15 Lunar Roving Vehicle",
      launched: "26 July 1971",
      year: 1971,
      talkingLine: "Three drives, 27.8 km, then they parked me for good.",
      image: {
        src: "images/moon/apollo-15-rover.jpg",
        width: 1600, height: 1673,
        alt: "The Apollo 15 moon buggy, with four wire-mesh wheels and a dish antenna, parked on the Moon's dusty ground.",
        type: "NASA photo",
        credit: "NASA",
        from: "https://nssdc.gsfc.nasa.gov/planetary/image/as15_88_11901.jpg"
      },
      whatItWas: "The Lunar Roving Vehicle was an electric car built to drive in the Moon's low gravity and vacuum, so astronauts could explore farther. Apollo 15 was the first time a vehicle like this was used.",
      carried: [
        "Two astronauts, David Scott and Jim Irwin, in two fold-out seats",
        "An electric motor in each of its four wheels",
        "A large mesh dish antenna on the front"
      ],
      whatHappened: "The rover folded up to ride inside the lunar module. From 31 July to 2 August 1971, the astronauts drove it on three trips, one a day, for a total of 27.8 km.",
      whereItIsNow: "It is parked for good on the Moon, at the Apollo 15 site in the Mare Imbrium region, at the foot of the Apennine mountains.",
      words: [
        { term: "Lunar Roving Vehicle", meaning: "An electric car built to drive in the Moon's low gravity and vacuum." }
      ],
      sources: [
        { label: "The Apollo Lunar Roving Vehicle, NSSDCA", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html" },
        { label: "Apollo 15 Lunar Module / ALSEP, NSSDCA", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "How far did the Apollo 15 astronauts drive the rover in total?",
          options: ["2.8 km", "27.8 km", "180 km", "450 km"],
          answer: 1,
          whenRight: "Correct! 27.8 km over three trips.",
          whenWrong: "Not quite. They drove it 27.8 km over three trips."
        },
        {
          question: "How did the rover get to the Moon?",
          options: ["It drove off a rocket", "It was built on the Moon", "It folded up to ride inside the lunar module", "It landed by parachute"],
          answer: 2,
          whenRight: "Correct! It folded up and rode inside the lunar module.",
          whenWrong: "Not quite. It folded up to ride inside the lunar module."
        },
        {
          question: "What made the rover's wheels turn?",
          options: ["An electric motor in each wheel", "One gas engine", "Astronauts pedalling", "Solar sails"],
          answer: 0,
          whenRight: "Correct! Each of its four wheels had its own electric motor.",
          whenWrong: "Not quite. Each of its four wheels had an electric motor."
        }
      ]
    },
    {
      id: "m5",
      name: "LCROSS",
      launched: "18 June 2009",
      year: 2009,
      talkingLine: "I watched my rocket hit a dark crater. Four minutes later, I followed it in.",
      image: {
        src: "images/moon/lcross.jpg",
        width: 1438, height: 1098,
        alt: "The LCROSS spacecraft, a ring-shaped satellite covered in panels and instruments.",
        type: "NASA photo",
        credit: "NASA",
        from: "https://nssdc.gsfc.nasa.gov/planetary/image/lcross.jpg"
      },
      whatItWas: "LCROSS (Lunar Crater Observation and Sensing Satellite) was built to search for water ice on the Moon. Its plan was to crash a 2,000 kg used rocket stage, called a Centaur, into the Moon and watch the crash from behind.",
      carried: [
        "A \"shepherding spacecraft\" that steered the Centaur",
        "Two visible cameras and three infrared cameras",
        "Three spectrometers, which study light to find out what materials are made of"
      ],
      whatHappened: "On 9 October 2009, the Centaur hit Cabeus crater near the Moon's south pole. The shepherding spacecraft flew through the cloud of debris for about four minutes, collecting data, then crashed too. NASA later said the impact data showed water.",
      whereItIsNow: "Both pieces are in Cabeus crater, near the Moon's south pole.",
      words: [
        { term: "Centaur", meaning: "The 2,000 kg used rocket stage that LCROSS crashed into the Moon." },
        { term: "shepherding spacecraft", meaning: "The part of LCROSS that steered the Centaur, then flew through the debris cloud." },
        { term: "spectrometers", meaning: "Instruments that study light to find out what materials are made of." }
      ],
      sources: [
        { label: "LCROSS, NSSDCA", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-031B" },
        { label: "LCROSS Impact Data Indicates Water on Moon (13 Nov 2009), NSSDCA", url: "https://nssdc.gsfc.nasa.gov/planetary/text/lcross_pr_20091113.txt" }
      ],
      sourceChecked: "2026-11-14",
      quiz: [
        {
          question: "What was LCROSS searching for?",
          options: ["Gold", "Water ice", "Old Apollo parts", "Moon rocks to bring home"],
          answer: 1,
          whenRight: "Correct! It was built to search for water ice.",
          whenWrong: "Not quite. LCROSS was built to search for water ice."
        },
        {
          question: "What is a spectrometer?",
          options: ["A tool that studies light to find out what materials are made of", "A type of rocket", "A Moon map", "A drill"],
          answer: 0,
          whenRight: "Correct! Spectrometers study light to find out what things are made of.",
          whenWrong: "Not quite. A spectrometer studies light to find out what materials are made of."
        },
        {
          question: "Where did the Centaur rocket stage crash?",
          options: ["The Sea of Tranquility", "The Apennine mountains", "Cabeus crater near the south pole", "The far side's equator"],
          answer: 2,
          whenRight: "Correct! It hit Cabeus crater, near the Moon's south pole.",
          whenWrong: "Not quite. It hit Cabeus crater, near the Moon's south pole."
        }
      ]
    }
  ]
};
