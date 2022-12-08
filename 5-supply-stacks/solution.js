import input from "./input.js";

// const input = `    [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2`;

const topCratesAfterRearrangement = (input, round = 1) => {
  input = input.split("\n");
  const numberRowIndex = input.findIndex((row) => row.substring(0, 2) === " 1");
  const numberOfStacks = input[numberRowIndex].trim().split(/\s+/g).length;
  const stacks = [...Array(numberOfStacks)].map((_) => [...Array(0)]);
  input
    .slice(0, numberOfStacks)
    .reverse()
    .map((row) => {
      [...Array(numberOfStacks)].map((_, stackIndex) => {
        const crate = row.substring(stackIndex * 4 + 1, stackIndex * 4 + 2);
        if (crate !== " ") stacks[stackIndex].push(crate);
      });
    });
  const procedures = input.slice(numberRowIndex + 2);
  procedures.map((procedure) => {
    const [crateQuantity, stackIndexFrom, stackIndexTo] = procedure
      .replace(/move\s/, "")
      .replace(/from\s/, "")
      .replace(/to\s/, "")
      .split(" ")
      .map(Number);
    let cratesToMove = stacks[stackIndexFrom - 1].splice(crateQuantity * -1);
    if (round === 1) cratesToMove = cratesToMove.reverse();
    stacks[stackIndexTo - 1] = [...stacks[stackIndexTo - 1], ...cratesToMove];
  });
  return stacks.map((stack) => stack[stack.length - 1]).join("");
};

console.log(`Part 1: ${topCratesAfterRearrangement(input)}`);
console.log(`Part 2: ${topCratesAfterRearrangement(input, 2)}`);
