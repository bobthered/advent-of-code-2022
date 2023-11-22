const createCathodeRayTube = () => {
	// initiate variables
	let cycleCount = 0;
	const cycleCountMilestones = [20, 60, 100, 140, 180, 220]
	let signalStrengths = [];
	let x = 1;

	const add = amount => x += amount;
	const getTotalSignalStrength = () => signalStrengths.reduce((total, current) => total + current, 0);
	const incrementCycleCount = () => {
		// increment cycleCount
		cycleCount++;

		// check if signalStrength should be logged
		if (cycleCountMilestones.includes(cycleCount)) {
			signalStrengths.push(x * cycleCount)
		}
	}

	return { add, getTotalSignalStrength, incrementCycleCount }
}

export const solution = (input = '') => {
	// initiate cathodeRayTube
	const cathodeRayTube = createCathodeRayTube();

	// parse input
	const commands = input.split('\n');

	// loop over commands
	for (const command of commands) {
		// increment cycleCount
		cathodeRayTube.incrementCycleCount();

		// skip if command is noop
		if (command === 'noop') continue;

		// get instructions from command
		let [instruction, amount] = command.split(' ');

		// check instruction
		if (instruction === 'addx') cathodeRayTube.incrementCycleCount();

		// convert amount to integer
		amount = +amount;

		// add amount
		cathodeRayTube.add(amount)
	}
	return cathodeRayTube.getTotalSignalStrength()
}