// https://adventofcode.com/2022/day/3
import { rucksackContentString } from "./rucksackContentString";

const calculateCharacterPriority = (character: string) => {
  const characterCode = character.charCodeAt(0);
  if (characterCode >= 65 && characterCode <= 90) {
    return characterCode - 65 + 27;
  } else if (characterCode >= 97 && characterCode <= 122) {
    return characterCode - 97 + 1;
  } else {
    throw new Error("Invalid character Found!");
  }
};

const main = () => {
  const rucksacksArray = rucksackContentString.split("\n");

  // Figuring out an efficient way to work out priority of characters!
  // "a".charCodeAt(0); // 97
  // calculateCharacterPriority("a"); // 1
  // "z".charCodeAt(0); // 122
  // calculateCharacterPriority("z"); // 26
  // "A".charCodeAt(0); // 65
  // calculateCharacterPriority("A"); // 27
  // "Z".charCodeAt(0); // 90
  // calculateCharacterPriority("Z"); // 52

  /******************************************************************* */
  // Part One Logic!
  /******************************************************************* */
  const rucksackContent = rucksacksArray.map((rucksack, index) => {
    const leftCompartmentContents = rucksack.substring(0, rucksack.length / 2);
    const rightCompartmentContents = rucksack.substring(rucksack.length / 2);

    // find shared char between left and right compartments
    const sharedChar = leftCompartmentContents.split("").find((char) => {
      return rightCompartmentContents.includes(char);
    });

    if (!sharedChar) {
      throw new Error(`No shared char found in rucksack ${index}!`);
    }

    return {
      rucksackIndex: index,
      leftCompartmentContents,
      rightCompartmentContents,
      sharedChar,
      sharedCharPriority: calculateCharacterPriority(sharedChar),
    };
  });

  console.log(
    "Sum of total reorganisation priority:",
    rucksackContent.reduce((acc, curr) => acc + curr.sharedCharPriority, 0)
  );

  /******************************************************************* */
  // Part Two Logic!
  /******************************************************************* */

  // Group the rucksacks into groups of 3
  const rucksackElfGroups = [];
  for (let i = 0; i < rucksacksArray.length; i += 3) {
    rucksackElfGroups.push(rucksacksArray.slice(i, i + 3));
  }

  const rucksackElfGroupLetters = rucksackElfGroups.map(
    (rucksackElfGroup, index) => {
      // find the common letter in all 3 rucksacks of each group
      const sharedChar = rucksackElfGroup[0].split("").find((char) => {
        return (
          rucksackElfGroup[1].includes(char) &&
          rucksackElfGroup[2].includes(char)
        );
      });

      if (!sharedChar) {
        throw new Error(`No common char found in group ${index}!`);
      }

      return {
        rucksackElfGroupIndex: index,
        sharedChar,
        sharedCharPriority: calculateCharacterPriority(sharedChar),
      };
    }
  );

  console.log(
    "Sum of elf group priorities:",
    rucksackElfGroupLetters.reduce(
      (acc, curr) => acc + curr.sharedCharPriority,
      0
    )
  );
};

main();
