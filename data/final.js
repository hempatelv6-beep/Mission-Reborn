// Final Mission: 10 questions, one per machine, across both worlds.
// Every answer is in that machine's text in data/moon.js or data/mars.js.
// "machine" is the id of the machine the answer comes from (used to check grounding).
const FINAL = {
  title: "Final Mission",
  intro: "Final Mission: 10 machines, 2 worlds. Are you ready?",
  badge: "Mission Reborn Explorer",
  questions: [
    {
      machine: "m1",
      question: "Which Moon machine did the Apollo 12 astronauts walk over to and take parts from?",
      options: ["LCROSS", "Surveyor 3", "The Apollo 15 rover", "Eagle"],
      answer: 1,
      whenRight: "Correct! Apollo 12 landed about 180 m from Surveyor 3.",
      whenWrong: "Not quite. It was Surveyor 3. Apollo 12 landed about 180 m away."
    },
    {
      machine: "m2",
      question: "Who rode in Eagle, the first crewed vehicle to land on the Moon?",
      options: ["David Scott and Jim Irwin", "Neil Armstrong and Buzz Aldrin", "Nobody, it was a robot", "The Apollo 12 crew"],
      answer: 1,
      whenRight: "Correct! Neil Armstrong and Buzz Aldrin.",
      whenWrong: "Not quite. Neil Armstrong and Buzz Aldrin rode in Eagle."
    },
    {
      machine: "m3",
      question: "What does a magnetometer, one of the ALSEP instruments, measure?",
      options: ["Moonquakes", "The Moon's magnetic field", "Temperature", "Dust"],
      answer: 1,
      whenRight: "Correct! It measures the Moon's magnetic field.",
      whenWrong: "Not quite. A magnetometer measures the Moon's magnetic field."
    },
    {
      machine: "m4",
      question: "Who drove the Apollo 15 Lunar Roving Vehicle?",
      options: ["Neil Armstrong and Buzz Aldrin", "A remote driver on Earth", "David Scott and Jim Irwin", "It drove itself"],
      answer: 2,
      whenRight: "Correct! David Scott and Jim Irwin, in two fold-out seats.",
      whenWrong: "Not quite. David Scott and Jim Irwin drove it."
    },
    {
      machine: "m5",
      question: "What did NASA say the LCROSS impact data showed?",
      options: ["Water", "Gold", "Lava", "Nothing at all"],
      answer: 0,
      whenRight: "Correct! NASA said the impact data showed water.",
      whenWrong: "Not quite. NASA said the impact data showed water."
    },
    {
      machine: "r1",
      question: "Which machine made the first truly successful landing on Mars?",
      options: ["Sojourner", "Viking 1", "InSight", "Spirit"],
      answer: 1,
      whenRight: "Correct! Viking 1, in 1976.",
      whenWrong: "Not quite. Viking 1 made the first truly successful landing on Mars."
    },
    {
      machine: "r2",
      question: "How did Sojourner get from the lander onto Mars?",
      options: ["It jumped", "It rolled down a ramp", "A robotic arm lifted it", "It flew"],
      answer: 1,
      whenRight: "Correct! It rolled down a ramp the night after landing.",
      whenWrong: "Not quite. Sojourner rolled down a ramp onto Mars."
    },
    {
      machine: "r3",
      question: "How far did Opportunity drive on Mars?",
      options: ["27.8 km", "1.5 km", "45.16 km", "180 km"],
      answer: 2,
      whenRight: "Correct! Opportunity drove 45.16 km.",
      whenWrong: "Not quite. Opportunity drove 45.16 km."
    },
    {
      machine: "r4",
      question: "InSight took Mars' \"vital signs\". Which of these was one of them?",
      options: ["Its pulse", "Its weight", "Its colour", "Its age"],
      answer: 0,
      whenRight: "Correct! Its pulse, temperature and reflexes.",
      whenWrong: "Not quite. InSight measured its pulse, temperature and reflexes."
    },
    {
      machine: "r5",
      question: "What was Ingenuity built to try for the first time?",
      options: ["Driving on Mars", "Powered, controlled flight on another planet", "Digging for water", "Landing on airbags"],
      answer: 1,
      whenRight: "Correct! The first powered, controlled flight on another planet.",
      whenWrong: "Not quite. It was built to try the first powered, controlled flight on another planet."
    }
  ]
};
