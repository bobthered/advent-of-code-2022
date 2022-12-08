import input from "./input.js";

// const input = `2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8`;

const countAssignmentPairsFullyContained = (input) =>
  input
    .split("\n")
    .map((pairString) => pairString.split(","))
    .map((pairs) => pairs.map((string) => string.split("-").map(Number)))
    .filter(
      ([range1, range2]) =>
        (range1[0] >= range2[0] && range1[1] <= range2[1]) ||
        (range2[0] >= range1[0] && range2[1] <= range1[1])
    ).length;

const countAssignmentPairsPartiallyContained = (input) =>
  input
    .split("\n")
    .map((pairString) => pairString.split(","))
    .map((pairs) => pairs.map((string) => string.split("-").map(Number)))
    .filter(
      ([range1, range2]) =>
        (range1[0] <= range2[1] && range1[1] >= range2[0]) ||
        (range2[0] <= range1[1] && range2[1] >= range1[0])
    ).length;

console.log(`Part 1: ${countAssignmentPairsFullyContained(input)}`);
console.log(`Part 2: ${countAssignmentPairsPartiallyContained(input)}`);
