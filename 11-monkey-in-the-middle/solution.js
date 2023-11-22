const createMonkey = (monkeyLines, divideBy) => {
	// split lines
	monkeyLines = monkeyLines.split('\n');

	// parse instructons
	const index = +monkeyLines[0].replace(/(\:|Monkey\s)/g, '');
	let itemWorryLevels = monkeyLines[1].replace(/Starting\sitems:\s/g, '').split(', ').map(v => +v);
	const operation = monkeyLines[2].replace(/Operation:\snew\s=\s/g, '')
	const divisibleBy = +monkeyLines[3].replace(/Test:\sdivisible\sby\s/g, '');
	const ifTrueMonkeyIndex = +monkeyLines[4].replace(/If\strue:\sthrow\sto\smonkey/g, '')
	const ifFalseMonkeyIndex = +monkeyLines[5].replace(/If\sfalse:\sthrow\sto\smonkey/g, '')
	let numberItemsInspected = 0;

	// methods
	const addItem = itemWorryLevel => {
		itemWorryLevels.push(itemWorryLevel)
	}
	const determineItemsToThrow = () => {
		// initiate items to throw
		let itemsToThrow = [];

		// loop over current items
		itemWorryLevels = itemWorryLevels.filter(itemWorryLevel => {
			itemWorryLevel = eval(operation.replace(/old/g, itemWorryLevel))
			itemWorryLevel = Math.floor(itemWorryLevel / divideBy)
			itemsToThrow.push({ itemWorryLevel, monkeyIndex: itemWorryLevel % divisibleBy === 0 ? ifTrueMonkeyIndex : ifFalseMonkeyIndex })
			numberItemsInspected++;
			return false;
		})

		return itemsToThrow;
	}
	const getDivisibleBy = () => divisibleBy;
	const getNumberItemsInspected = () => numberItemsInspected;

	return {
		addItem,
		determineItemsToThrow,
		getDivisibleBy,
		getNumberItemsInspected
	}
}

export const solution = (input = '', rounds = 20, divideBy = 3) => {
	// parse input
	let monkeys = input.split('\n\n').map(monkeyInput => createMonkey(monkeyInput, divideBy));
	const divider = monkeys.reduce((total, monkey) => total * monkey.getDivisibleBy(), 1)

	// round loop
	for (let round = 0; round < rounds; round++) {
		// loop over monkeys
		for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
			const monkey = monkeys[monkeyIndex];
			const itemsToThrow = monkey.determineItemsToThrow();
			itemsToThrow.map(({ itemWorryLevel, monkeyIndex }) => {
				monkeys[monkeyIndex].addItem(itemWorryLevel % divider)
			})
		}
	}
	// get two most active monkeys
	const [activeMonkey1, activeMonkey2] = monkeys.sort((a, b) => a.getNumberItemsInspected() > b.getNumberItemsInspected() ? -1 : a.getNumberItemsInspected() < b.getNumberItemsInspected() ? 1 : 0)

	return activeMonkey1.getNumberItemsInspected() * activeMonkey2.getNumberItemsInspected();
}