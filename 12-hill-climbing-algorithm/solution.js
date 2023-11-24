import { parseInput } from "./parseInput";
import { shortestDistance } from "./shortestDistance";

export const partOne = (input = '') => {
	// parse input
	const { startPosition, endPosition, map } = parseInput(input)

	return shortestDistance(map, startPosition, endPosition);
}

export const partTwo = (input = '') => {
	// parse input
	const { endPosition, map } = parseInput(input)

	// initiate start positions
	let startPositions = []

	// find all end positions
	map.map((row, y) => row.map((height, x) => {
		if (height === 0) startPositions.push({ height, x, y })
	}))

	// find shortest distance of all end positions
	const [shortestSteps, ..._] = startPositions.map(startPosition => shortestDistance(map, startPosition, endPosition)).sort();

	return shortestSteps
}