import input from "./input.js";

// A = Rock
// B = Paper
// C = Scissors

// X = Rock
// Y = Paper
// Z = Scissors

const choiceDictionary = {
  A: {
    1: {
      X: 1 + 3, // Draw
      Y: 2 + 6, // Win
      Z: 3 + 0, // Lose
    },
    2: {
      X: 3 + 0, // Rock loses to scissors
      Y: 1 + 3, // Rock draws to rock
      Z: 2 + 6, // Rock wins to paper
    },
  },
  B: {
    1: {
      X: 1 + 0, // Lose
      Y: 2 + 3, // Draw
      Z: 3 + 6, // Win
    },
    2: {
      X: 1 + 0, // Paper loses to rock
      Y: 2 + 3, // Paper draws to paper
      Z: 3 + 6, // Paper wins to scissors
    },
  },
  C: {
    1: {
      X: 1 + 6, // Win
      Y: 2 + 0, // Lose
      Z: 3 + 3, // Draw
    },
    2: {
      X: 2 + 0, // Scissors loses to paper
      Y: 3 + 3, // Scissors draws to scissors
      Z: 1 + 6, // Scissors wins to rock
    },
  },
};

const getTotalScore = (input, round = 1) =>
  input
    .split("\n")
    .map((guesses) => {
      const [opponent, player] = guesses.split(" ");
      return choiceDictionary[opponent][round][player];
    })
    .reduce((total, score) => total + score, 0);

console.log(`Part 1: ${getTotalScore(input)}`);
console.log(`Part 2: ${getTotalScore(input, 2)}`);
