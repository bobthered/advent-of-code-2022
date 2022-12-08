import input from "./input.js";

// const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

const startOfPacketMarkerIndex = (input, length = 4) => {
  let index = -1;
  for (let i = length; i < input.length; i++) {
    const characters = input.substring(i - length, i).split("");
    const uniqueCharacters = [...new Set(characters)];
    if (characters.length === uniqueCharacters.length) {
      index = i;
      break;
    }
  }
  return index;
};

const startOfMessageMarkerIndex = (input) =>
  startOfPacketMarkerIndex(input, 14);

console.log(`Part 1: ${startOfPacketMarkerIndex(input)}`);
console.log(`Part 2: ${startOfMessageMarkerIndex(input)}`);
