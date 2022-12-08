import input from "./input.js";

const largestCalorieElfCarrying = (input, topNElfs = 1) =>
  input
    .split("\n\n")
    .map((calorieStrings) =>
      calorieStrings
        .split("\n")
        .map((calorieString) => +calorieString)
        .reduce((total, calorie) => total + calorie, 0)
    )
    .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
    .slice(0, topNElfs)
    .reduce((total, calorie) => total + calorie, 0);

console.log(`Part 1: ${largestCalorieElfCarrying(input)}`);
console.log(`Part 2: ${largestCalorieElfCarrying(input, 3)}`);
