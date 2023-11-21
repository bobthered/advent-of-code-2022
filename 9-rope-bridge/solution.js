export const solution = (instructions = '') => {
	// initialize variables
	const head = { x: 0, y: 0 };
	const tail = { x: 0, y: 0 };
	let tailPositionHistory = new Set();
	tailPositionHistory.add(`${tail.x}-${tail.y}`);

	// parse instructions
	instructions = instructions.split('\n').map(row => {
		const [direction, amount] = row.split(' ');
		return { direction, amount: +amount }
	})

	// direction change dictionary
	const directionChangeDictionary = {
		'D': { x: 0, y: 1 },
		'L': { x: -1, y: 0 },
		'R': { x: 1, y: 0 },
		'U': { x: 0, y: -1 },
	}
	// loop over instructions
	for (let instructionIndex = 0; instructionIndex < instructions.length; instructionIndex++) {
		// destructure instruction
		const { direction, amount } = instructions[instructionIndex];

		// perform instruction amount times
		for (let _ = 0; _ < amount; _++) {
			// move the head position
			head.x += directionChangeDictionary[direction].x;
			head.y += directionChangeDictionary[direction].y;

			// check if tail needs to move
			if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
				// check if in the same row or column
				if (head.x === tail.x || head.y === tail.y) {
					tail.x += directionChangeDictionary[direction].x;
					tail.y += directionChangeDictionary[direction].y;
					// check if diaganol DL
				} else if (head.x < tail.x && head.y > tail.y) {
					tail.x -= Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
					tail.y += Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
					// check if diaganol DR
				} else if (head.x > tail.x && head.y > tail.y) {
					tail.x += Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
					tail.y += Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
					// check if diaganol UL
				} else if (head.x < tail.x && head.y < tail.y) {
					tail.x -= Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
					tail.y -= Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
					// check if diaganol UR
				} else if (head.x > tail.x && head.y < tail.y) {
					tail.x += Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
					tail.y -= Math.max(Math.abs(directionChangeDictionary[direction].x), Math.abs(directionChangeDictionary[direction].y));
				}
			}

			// update tail position history
			tailPositionHistory.add(`${tail.x}-${tail.y}`);
		}
	}

	return [...tailPositionHistory].length
}