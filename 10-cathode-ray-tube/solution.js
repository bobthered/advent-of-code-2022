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
const createDisplay = (width = 40, height = 6) => {
	const display = [...Array(height)].map(_ => [...Array(width)].map(_ => '.'))
	let register = 1;
	let x = 0;
	let y = 0;

	const draw = () => {
		if (register >= x - 1 && register <= x + 1) display[y][x] = '#'
		x++;
		if (x > width - 1) {
			x = 0;
			y++;
		}
	}
	const incrementRegister = amount => register += amount;

	const print = () =>
		display.map(row => row.join('')).join('\n')

	const startCommand = () => {
		draw()
	}

	return {
		draw,
		incrementRegister,
		print,
		startCommand,
	}
}

export const part1 = (input = '') => {
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

export const part2 = (input = '') => {
	// initiate display
	const display = createDisplay();

	// parse input
	const commands = input.split('\n');

	// loop over commands
	for (const command of commands) {
		// start command
		display.startCommand();

		if (command !== 'noop') {

			// get instructions from command
			let [_, amount] = command.split(' ');

			// convert amount to integer
			amount = +amount;

			// draw pixel
			display.draw();

			// increment register
			display.incrementRegister(amount);
		}
	}

	return display.print();;
}