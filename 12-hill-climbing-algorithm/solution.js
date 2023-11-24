import { directionDeltas } from "./directionDeltas";

export const solution = (input = '') => {
	// initiate positions
	let currentPosition = {};
	let endPosition = {};

	// create map
	const map = input.split('\n').map((row, y) => row.split('').map((v, x) => {
		if (v === 'S') {
			currentPosition = { height: 0, x, y };
			v = 'a';
		}
		if (v === 'E') {
			endPosition = { height: 25, x, y };
			v = 'z'
		}
		return v.charCodeAt(0) - 97
	}))

	// initiate total distance taken
	let totalDistance = 0;

	// initiate queue
	let queue = [];
	queue.push({ ...currentPosition, distance: totalDistance })

	// initiate visited set
	const visited = new Set();
	visited.add(`[${currentPosition.x}, ${currentPosition.y}]`)

	while (queue.length) {
		// remove first queue item
		const { distance, height: currentHeight, x: currentX, y: currentY } = queue.shift();

		// loop over directions
		[...directionDeltas].map(({ x, y }) => {
			// find lookup position
			const lookup = {
				x: currentX + x,
				y: currentY + y,
			}

			// find lookup height
			lookup.height = map?.[lookup.y]?.[lookup.x]

			// exit if height is undefind (outside of map)
			if (lookup.height === undefined) return;

			// exit if height is too tall
			if (lookup.height > currentHeight + 1) return;

			// exit if position is already visited
			if (visited.has(`[${lookup.x}, ${lookup.y}]`)) return;

			// exit if reached the end
			if (lookup.x === endPosition.x && lookup.y === endPosition.y) {
				totalDistance = distance + 1;
				return;
			}

			// add new lookup position to queue and visited set
			queue.push({ ...lookup, distance: distance + 1 })
			visited.add(`[${lookup.x}, ${lookup.y}]`)
		})
	}

	return totalDistance
}