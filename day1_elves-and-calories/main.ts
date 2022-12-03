// https://adventofcode.com/2022/day/1
import { elfString } from "./elfString";

export {};

const main = async () => {
  // Grab our input
  const elfStringsArray = elfString.split("\n\n");

  // Turn our big string array into a collection of objects that track some
  // key stats and original order.
  const elves = elfStringsArray.map((elfArray, index) => {
    const caloriesArray = elfArray.split("\n").map((elf) => parseInt(elf));

    return {
      originalIndex: index,
      caloriesArray,
      caloriesCarriedSum: caloriesArray.reduce((acc, curr) => acc + curr, 0),
    };
  });

  // Sort our array ... We still know where they were!
  elves.sort((a, b) => a.caloriesCarriedSum - b.caloriesCarriedSum);

  console.log(
    "Calories carried by top elf:",
    elves[elves.length - 1].caloriesCarriedSum
  );

  console.log(
    "Calories carried by top 3 elves:",
    elves
      .slice(elves.length - 3)
      .reduce((acc, curr) => acc + curr.caloriesCarriedSum, 0)
  );
};

main();
