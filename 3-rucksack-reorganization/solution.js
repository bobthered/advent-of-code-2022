import input from "./input.js";

const convertCharacterToPriority = (char) => {
  let priority = char.charCodeAt(0);
  priority -= 96;
  if (priority < 0) priority += 58;
  return priority;
};

const sumOfCommonItemPriorities = (input, part = 1) => {
  let priorities;
  if (part === 1) {
    priorities = input.split("\n").map((items) => {
      const compartmentOne = items.substring(0, items.length / 2).split("");
      const compartmentTwo = items
        .substring(items.length / 2, items.length)
        .split("");
      const [sharedItem] = [
        ...new Set(
          compartmentOne.filter((value) => compartmentTwo.includes(value))
        ),
      ];
      return convertCharacterToPriority(sharedItem);
    });
  }
  if (part === 2) {
    priorities = input.match(/(?:.+\n?){3}/g).map((rucksacks) => {
      const [ruck1, ruck2, ruck3] = rucksacks
        .split("\n")
        .map((string) => string.split(""));
      const [sharedItem] = [
        ...new Set(
          ruck1.filter(
            (value) => ruck2.includes(value) && ruck3.includes(value)
          )
        ),
      ];
      return convertCharacterToPriority(sharedItem);
    });
  }
  return priorities.reduce((total, priority) => total + priority);
};

console.log(`Part 1: ${sumOfCommonItemPriorities(input)}`);
console.log(`Part 2: ${sumOfCommonItemPriorities(input, 2)}`);
