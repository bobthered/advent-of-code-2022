const createPoint = (x = 0, y = 0) => {
	const follow = point => {
		const distance = Math.max(Math.abs(x - point.getX()), Math.abs(y - point.getY()))
		if (distance > 1) {
			const distanceX = point.getX() - x;
			const distanceY = point.getY() - y;
			x += Math.abs(distanceX) === 2 ? distanceX / 2 : distanceX;
			y += Math.abs(distanceY) === 2 ? distanceY / 2 : distanceY;
		}
	}
	const getPosition = () => `${x} - ${y}`;
	const getX = () => x;
	const getY = () => y;
	const move = direction => {
		x += moveDictionary[direction].x;
		y += moveDictionary[direction].y;
	}

	return {
		follow,
		getPosition,
		getX,
		getY,
		move,
	}
}

const moveDictionary = {
	'D': { x: 0, y: 1 },
	'L': { x: -1, y: 0 },
	'R': { x: 1, y: 0 },
	'U': { x: 0, y: -1 },
}

export const solution = (instructions = '', knotCount = 1) => {
	// initialize variables
	const knots = [...Array(knotCount + 1)].map((_) => createPoint())
	let tailPositionHistory = new Set();

	// initialize tail position
	tailPositionHistory.add(knots[knotCount].getPosition());

	// parse instructions
	instructions = instructions.split('\n').map(row => {
		const [direction, amount] = row.split(' ');
		return { direction, amount: +amount }
	})

	// loop over instructions
	for (let instructionIndex = 0; instructionIndex < instructions.length; instructionIndex++) {
		// destructure instruction
		const { direction, amount } = instructions[instructionIndex];

		// perform instruction amount times
		for (let _ = 0; _ < amount; _++) {
			// move the head position
			knots[0].move(direction)

			// loop over knots
			for (let knotIndex = 1; knotIndex < knots.length; knotIndex++) {
				knots[knotIndex].follow(knots[knotIndex - 1])
			}

			// update tail position history
			tailPositionHistory.add(knots[knots.length - 1].getPosition());
		}
	}

	return tailPositionHistory.size
}