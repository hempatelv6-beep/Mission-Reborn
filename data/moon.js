// Moon machines. Writers edit this file, not app.js.
// PROTOTYPE: facts are drafts. sourceChecked stays "" until a teammate opens the link.
const MOON = {
  id: "moon",
  planet: "Moon",
  hook: "They stayed behind. Here's why.",
  machines: [
    {
      name: "Ranger 7",
      year: 1964,
      image: "images/moon/ranger-7.jpg",
      imageType: "NASA photo",
      talkingLine: "I was built to crash. I sent pictures the whole way down.",
      whatItWas: "A probe sent straight at the Moon to take close-up pictures before it hit.",
      whatItCarried: "Six TV cameras.",
      whatHappened: "It hit the Moon on purpose on July 31, 1964, after sending back 4,308 photos. They were the first close-up pictures of the Moon taken by a US spacecraft.",
      whereItIsNow: "In pieces at its impact site, a flat plain later named Mare Cognitum, the 'Known Sea'.",
      source: "https://science.nasa.gov/mission/ranger-7/",
      sourceChecked: "",
      quiz: [
        {
          question: "How many photos did Ranger 7 send back?",
          options: ["About 40", "4,308", "1 million"],
          answer: 1,
          whenRight: "Correct! Ranger 7 sent 4,308 photos before it hit.",
          whenWrong: "Not quite. It sent 4,308 photos before it hit."
        },
        {
          question: "What happened to Ranger 7 at the end?",
          options: ["It hit the Moon on purpose", "It flew back to Earth", "It's still orbiting the Moon"],
          answer: 0,
          whenRight: "Correct! Crashing was the plan all along.",
          whenWrong: "Not quite. It was built to crash into the Moon."
        }
      ]
    },
    {
      name: "Surveyor 3",
      year: 1967,
      image: "images/moon/surveyor-3.jpg",
      imageType: "NASA photo",
      talkingLine: "Two years later, visitors came. They took my camera.",
      whatItWas: "A robot lander sent to test whether the Moon's ground could hold up a spacecraft.",
      whatItCarried: "A TV camera and a small scoop on an arm for digging into the soil.",
      whatHappened: "It landed in April 1967, dug trenches and sent back pictures. It went quiet in May 1967. In November 1969, the Apollo 12 crew landed nearby, walked over, and brought pieces of it, including its camera, back to Earth.",
      whereItIsNow: "Still standing in the Ocean of Storms, close to the Apollo 12 landing site.",
      source: "https://science.nasa.gov/mission/surveyor-3/",
      sourceChecked: "",
      quiz: [
        {
          question: "Who visited Surveyor 3 after it went quiet?",
          options: ["Nobody", "A Russian rover", "The Apollo 12 astronauts"],
          answer: 2,
          whenRight: "Correct! The Apollo 12 crew walked over in 1969.",
          whenWrong: "Not quite. The Apollo 12 astronauts walked over to it in 1969."
        },
        {
          question: "What did Surveyor 3 use to dig into the soil?",
          options: ["A drill", "A scoop on an arm", "Its wheels"],
          answer: 1,
          whenRight: "Correct! It had a small scoop on an arm.",
          whenWrong: "Not quite. It dug with a small scoop on an arm."
        }
      ]
    },
    {
      name: "Apollo 11 mirror",
      year: 1969,
      image: "images/moon/apollo-11-retroreflector.jpg",
      imageType: "NASA photo",
      talkingLine: "They flew home. I'm still working.",
      whatItWas: "A panel of 100 small mirrors that Apollo 11 astronauts set up on the Moon. Its full name is the Laser Ranging Retroreflector.",
      whatItCarried: "No power and no moving parts. Just mirrors that bounce light straight back where it came from.",
      whatHappened: "Nothing stopped it. Observatories on Earth still fire lasers at it and time how long the light takes to come back. That tells us the Moon is drifting away from Earth by about 3.8 cm a year.",
      whereItIsNow: "At Tranquility Base, where Apollo 11 landed.",
      source: "https://science.nasa.gov/mission/apollo-11/",
      sourceChecked: "",
      quiz: [
        {
          question: "Is the Apollo 11 mirror still being used?",
          options: ["Yes, scientists still bounce lasers off it", "No, it broke in 1970", "It was brought back to Earth"],
          answer: 0,
          whenRight: "Correct! It still works because it has no parts to break.",
          whenWrong: "Not quite. Scientists still bounce lasers off it today."
        },
        {
          question: "What has the mirror helped us learn?",
          options: ["The Moon has water", "The Moon is drifting away from Earth", "The Moon is hollow"],
          answer: 1,
          whenRight: "Correct! About 3.8 cm farther every year.",
          whenWrong: "Not quite. It showed the Moon drifts away about 3.8 cm a year."
        }
      ]
    },
    {
      name: "Apollo 15 rover",
      year: 1971,
      image: "images/moon/apollo-15-rover.jpg",
      imageType: "NASA photo",
      talkingLine: "I was the first car on the Moon. They parked me and never came back.",
      whatItWas: "The Lunar Roving Vehicle, the first car driven on the Moon. Astronauts Dave Scott and Jim Irwin drove it.",
      whatItCarried: "Two astronauts, their tools, rock samples, a TV camera and an antenna to talk to Earth. It ran on batteries.",
      whatHappened: "It did its job. The crew drove it about 28 km across the Moon over three trips, then left it behind because bringing it home would have been far too heavy.",
      whereItIsNow: "Parked at the Hadley-Apennine landing site.",
      source: "https://science.nasa.gov/mission/apollo-15/",
      sourceChecked: "",
      quiz: [
        {
          question: "Why was the rover left on the Moon?",
          options: ["It broke down", "It was too heavy to bring home", "It got stuck in a crater"],
          answer: 1,
          whenRight: "Correct! Taking it home would have been far too heavy.",
          whenWrong: "Not quite. It worked fine. It was just too heavy to bring home."
        },
        {
          question: "What powered the Apollo 15 rover?",
          options: ["Batteries", "Solar panels", "Gasoline"],
          answer: 0,
          whenRight: "Correct! It ran on batteries.",
          whenWrong: "Not quite. It ran on batteries."
        }
      ]
    },
    {
      name: "LCROSS",
      year: 2009,
      image: "images/moon/lcross.jpg",
      imageType: "Drawing",
      talkingLine: "I chased my own rocket into a crater to find water.",
      whatItWas: "A spacecraft that crashed its used rocket stage into a dark crater, then flew through the cloud of dust to see what was inside.",
      whatItCarried: "Cameras and instruments that read what the dust cloud was made of.",
      whatHappened: "On October 9, 2009, the rocket stage hit Cabeus crater near the Moon's south pole. LCROSS measured the cloud and found water ice, then hit the Moon itself a few minutes later.",
      whereItIsNow: "In Cabeus crater, near the Moon's south pole.",
      source: "https://science.nasa.gov/mission/lcross/",
      sourceChecked: "",
      quiz: [
        {
          question: "What did LCROSS find in the dust cloud?",
          options: ["Gold", "Water ice", "Old Apollo parts"],
          answer: 1,
          whenRight: "Correct! It found water ice.",
          whenWrong: "Not quite. It found water ice."
        },
        {
          question: "Where did LCROSS crash?",
          options: ["Cabeus crater near the south pole", "The Apollo 11 site", "The far side's center"],
          answer: 0,
          whenRight: "Correct! Cabeus crater, near the south pole.",
          whenWrong: "Not quite. It crashed into Cabeus crater, near the south pole."
        }
      ]
    }
  ]
};
