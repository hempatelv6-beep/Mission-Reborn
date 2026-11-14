// Mars machines. Writers edit this file, not app.js.
// PROTOTYPE: facts are drafts. sourceChecked stays "" until a teammate opens the link.
const MARS = {
  id: "mars",
  planet: "Mars",
  hook: "They kept working long after they were meant to stop.",
  machines: [
    {
      name: "Viking 1 lander",
      year: 1976,
      image: "images/mars/viking-1.jpg",
      imageType: "NASA photo",
      talkingLine: "I listened for six years. Then one wrong command cut me off.",
      whatItWas: "The first US spacecraft to land safely on Mars and send back pictures from the ground.",
      whatItCarried: "Cameras, a weather station, a robotic arm to scoop soil, and experiments that tested the soil for signs of life.",
      whatHappened: "It landed on July 20, 1976, and worked for over six years. In November 1982, a mistake in a command sent from Earth cut off contact for good.",
      whereItIsNow: "On the plain of Chryse Planitia. The site is named the Thomas Mutch Memorial Station.",
      source: "https://science.nasa.gov/mission/viking-1/",
      sourceChecked: "",
      quiz: [
        {
          question: "Why did Viking 1 stop talking to Earth?",
          options: ["A dust storm", "A wrong command sent from Earth", "It ran out of fuel"],
          answer: 1,
          whenRight: "Correct! A mistake in a command from Earth cut contact in 1982.",
          whenWrong: "Not quite. A wrong command sent from Earth cut contact in 1982."
        },
        {
          question: "What did Viking 1 test the soil for?",
          options: ["Signs of life", "Gold", "Oil"],
          answer: 0,
          whenRight: "Correct! It tested the soil for signs of life.",
          whenWrong: "Not quite. It tested the soil for signs of life."
        }
      ]
    },
    {
      name: "Sojourner",
      year: 1997,
      image: "images/mars/sojourner.jpg",
      imageType: "NASA photo",
      talkingLine: "I was the first rover on Mars. I was the size of a microwave.",
      whatItWas: "The first wheeled rover on another planet. It arrived with the Mars Pathfinder lander.",
      whatItCarried: "Cameras and a tool that read what rocks were made of. It rolled on six wheels.",
      whatHappened: "It landed on July 4, 1997, and was meant to last a week. It kept going for about 83 days. It talked to Earth through the lander, so when the lander went silent in September 1997, Sojourner did too.",
      whereItIsNow: "Near the Pathfinder lander in Ares Vallis.",
      source: "https://science.nasa.gov/mission/mars-pathfinder/",
      sourceChecked: "",
      quiz: [
        {
          question: "How long was Sojourner meant to last?",
          options: ["About a week", "Ten years", "One hour"],
          answer: 0,
          whenRight: "Correct! It was planned for a week and lasted about 83 days.",
          whenWrong: "Not quite. It was planned for about a week."
        },
        {
          question: "Why did Sojourner go silent?",
          options: ["It fell in a hole", "The lander it talked through went silent", "It was switched off on purpose"],
          answer: 1,
          whenRight: "Correct! It needed the lander to talk to Earth.",
          whenWrong: "Not quite. It went silent when the lander it talked through did."
        }
      ]
    },
    {
      name: "Spirit",
      year: 2004,
      image: "images/mars/spirit.jpg",
      imageType: "NASA photo",
      talkingLine: "I was supposed to last 90 days. I lasted six years.",
      whatItWas: "A six-wheeled rover sent to look for signs that Mars once had water.",
      whatItCarried: "Cameras, tools on a robotic arm that read rocks, and a grinder that scraped the outside off rocks to see inside.",
      whatHappened: "It landed in January 2004 for a 90-day mission. In 2009 its wheels got stuck in soft sand. It sent its last message in March 2010.",
      whereItIsNow: "Stuck in sand at a spot called Troy, inside Gusev Crater.",
      source: "https://science.nasa.gov/mission/mer-spirit/",
      sourceChecked: "",
      quiz: [
        {
          question: "What trapped Spirit in 2009?",
          options: ["Ice", "Soft sand", "A rock slide"],
          answer: 1,
          whenRight: "Correct! Spirit got stuck in soft sand in 2009.",
          whenWrong: "Not quite. Spirit got stuck in soft sand, not ice or rocks."
        },
        {
          question: "How long was Spirit's mission planned to be?",
          options: ["90 days", "10 years", "1 year"],
          answer: 0,
          whenRight: "Correct! 90 days, and it lasted six years.",
          whenWrong: "Not quite. It was planned for 90 days."
        }
      ]
    },
    {
      name: "Opportunity",
      year: 2004,
      image: "images/mars/opportunity.jpg",
      imageType: "NASA photo",
      talkingLine: "I drove a marathon. Then the dust came.",
      whatItWas: "Spirit's twin rover, sent to the other side of Mars. It found strong signs that water once flowed there.",
      whatItCarried: "The same tools as Spirit: cameras, a robotic arm and a rock grinder, powered by solar panels.",
      whatHappened: "It drove over 45 km, more than a marathon. In June 2018 a huge dust storm covered its solar panels and it lost power. NASA ended the mission in February 2019.",
      whereItIsNow: "In Perseverance Valley, on the edge of Endeavour Crater.",
      source: "https://science.nasa.gov/mission/mer-opportunity/",
      sourceChecked: "",
      quiz: [
        {
          question: "What ended Opportunity's mission?",
          options: ["A crash", "A dust storm covered its solar panels", "A broken wheel"],
          answer: 1,
          whenRight: "Correct! A 2018 dust storm cut off its solar power.",
          whenWrong: "Not quite. A dust storm covered its solar panels in 2018."
        },
        {
          question: "How far did Opportunity drive?",
          options: ["About 1 km", "Over 45 km", "Around 1,000 km"],
          answer: 1,
          whenRight: "Correct! Over 45 km, more than a marathon.",
          whenWrong: "Not quite. It drove over 45 km."
        }
      ]
    },
    {
      name: "InSight",
      year: 2018,
      image: "images/mars/insight.jpg",
      imageType: "NASA photo",
      talkingLine: "I felt Mars shake more than a thousand times.",
      whatItWas: "A lander that stayed in one place to study the inside of Mars.",
      whatItCarried: "A seismometer, which feels the ground shake, and a heat probe meant to dig into the soil.",
      whatHappened: "It landed in November 2018 and recorded over 1,300 marsquakes. Dust slowly covered its solar panels, and it sent its last message in December 2022.",
      whereItIsNow: "On the flat plain of Elysium Planitia.",
      source: "https://science.nasa.gov/mission/insight/",
      sourceChecked: "",
      quiz: [
        {
          question: "What did InSight's seismometer detect?",
          options: ["Marsquakes", "Water", "Aliens"],
          answer: 0,
          whenRight: "Correct! Over 1,300 marsquakes.",
          whenWrong: "Not quite. It detected over 1,300 marsquakes."
        },
        {
          question: "Why did InSight stop working?",
          options: ["Dust covered its solar panels", "It fell over", "It was hit by a meteor"],
          answer: 0,
          whenRight: "Correct! Dust slowly covered its panels.",
          whenWrong: "Not quite. Dust slowly covered its solar panels."
        }
      ]
    }
  ]
};
