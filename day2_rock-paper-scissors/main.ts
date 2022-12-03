// https://adventofcode.com/2022/day/2
import { strategyGuideString } from "./strategyGuideString";

export {};

/******************************************************************* */
// Part One Logic!
/******************************************************************* */
const elfPlayLookup = (elfPlayChar: string) => {
  switch (elfPlayChar) {
    case "A":
      return "rock" as const;
    case "B":
      return "paper" as const;
    case "C":
      return "scissors" as const;
    default:
      throw new Error("Invalid ElfPlay!");
  }
};

const myPlayLookupPartOne = (myPlayChar: string) => {
  switch (myPlayChar) {
    case "X":
      return "rock" as const;
    case "Y":
      return "paper" as const;
    case "Z":
      return "scissors" as const;
    default:
      throw new Error("Invalid My Play!");
  }
};

const calculateScore = (
  elfPlay: "rock" | "paper" | "scissors",
  myPlay: "rock" | "paper" | "scissors"
) => {
  const myPlayBonus = myPlay === "rock" ? 1 : myPlay === "paper" ? 2 : 3;
  // Draw
  if (elfPlay === myPlay) {
    return 3 + myPlayBonus;
  }

  // I lose
  if (
    (elfPlay === "rock" && myPlay === "scissors") ||
    (elfPlay === "paper" && myPlay === "rock") ||
    (elfPlay === "scissors" && myPlay === "paper")
  ) {
    return 0 + myPlayBonus;
  }

  // I win
  if (
    (elfPlay === "rock" && myPlay === "paper") ||
    (elfPlay === "paper" && myPlay === "scissors") ||
    (elfPlay === "scissors" && myPlay === "rock")
  ) {
    return 6 + myPlayBonus;
  }
  throw new Error("Invalid play!");
};

const calculatePartOneRound = (roundString: string) => {
  // split the round string into an array of characters
  const [elfChar, myChar] = roundString.split(" ");

  const elfPlay = elfPlayLookup(elfChar);
  const myPlay = myPlayLookupPartOne(myChar);

  return {
    elfPlay,
    myPlay,
    totalScore: calculateScore(elfPlay, myPlay),
  };
};

/******************************************************************* */
// Part Two Logic!
/******************************************************************* */
const myPlayLookupPartTwo = (
  elfPlay: "rock" | "paper" | "scissors",
  outcomeChar: string
) => {
  // Should draw
  if (outcomeChar === "Y") {
    return elfPlay;
  }

  // Should win
  if (outcomeChar === "Z") {
    if (elfPlay === "rock") {
      return "paper";
    }
    if (elfPlay === "paper") {
      return "scissors";
    }
    if (elfPlay === "scissors") {
      return "rock";
    }
  }
  // Should lose
  if (outcomeChar === "X") {
    if (elfPlay === "rock") {
      return "scissors";
    }
    if (elfPlay === "paper") {
      return "rock";
    }
    if (elfPlay === "scissors") {
      return "paper";
    }
  }

  throw new Error("Invalid Outcome Char!");
};

const calculatePartTwoRound = (roundString: string) => {
  // split the round string into an array of characters
  const [elfChar, outcomeChar] = roundString.split(" ");

  const elfPlay = elfPlayLookup(elfChar);
  const myPlay = myPlayLookupPartTwo(elfPlay, outcomeChar);

  return {
    elfPlay,
    myPlay,
    totalScore: calculateScore(elfPlay, myPlay),
  };
};

/******************************************************************* */
// Summation Logic!
/******************************************************************* */

const main = async () => {
  const roundsArray = strategyGuideString.split("\n");

  const roundOneOutcomes = roundsArray.map((round, index) => {
    const roundObject = calculatePartOneRound(round);
    return { ...roundObject, round: index + 1 };
  });

  console.log(
    "Part 1 Total Score",
    roundOneOutcomes.reduce((acc, curr) => acc + curr.totalScore, 0)
  );

  const roundTwoOutcomes = roundsArray.map((round, index) => {
    const roundObject = calculatePartTwoRound(round);
    return { ...roundObject, round: index + 1 };
  });

  console.log(
    "Part 2 Total Score",
    roundTwoOutcomes.reduce((acc, curr) => acc + curr.totalScore, 0)
  );
};

main();
