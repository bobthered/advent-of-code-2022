export const visibleTreeCount = (input = '') => {
    // split input into rows
    input = input.split('\n').map(row => row.split(''));

    // initialize visible tree array
    const visibleTreeArray = [...input].map(row => row.map((_) => 0))

    // check looking east or west
    input.map((row, rowIndex) => {
        // initialize tallestTree height
        let tallestTree = -1;
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            // get current tree height
            const currentTreeHeight = row[columnIndex]

            // check if currentTreeHeight is larger than tallestTree
            if (currentTreeHeight > tallestTree) {
                visibleTreeArray[rowIndex][columnIndex] = 1;
                tallestTree = currentTreeHeight;
            }

            // exit if tallestTree is 9
            if (tallestTree === 9) break;
        }

        tallestTree = -1;
        for (let columnIndex = row.length - 1; columnIndex >= 0; columnIndex--) {
            // get current tree height
            const currentTreeHeight = row[columnIndex]

            // check if currentTreeHeight is larger than tallestTree
            if (currentTreeHeight > tallestTree) {
                visibleTreeArray[rowIndex][columnIndex] = 1;
                tallestTree = currentTreeHeight;
            }

            // exit if tallestTree is 9
            if (tallestTree === 9) break;
        }
    })

    // check looking north and south
    input[0].map((_, columnIndex) => {
        // initialize tallestTree height
        let tallestTree = -1;
        for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
            // get current tree height
            const currentTreeHeight = input[rowIndex][columnIndex];

            // check if currentTreeHeight is larger than tallestTree
            if (currentTreeHeight > tallestTree) {
                visibleTreeArray[rowIndex][columnIndex] = 1;
                tallestTree = currentTreeHeight;
            }

            // exit if tallestTree is 9
            if (tallestTree === 9) break;
        }

        tallestTree = -1;
        for (let rowIndex = input.length - 1; rowIndex >= 0; rowIndex--) {
            // get current tree height
            const currentTreeHeight = input[rowIndex][columnIndex];

            // check if currentTreeHeight is larger than tallestTree
            if (currentTreeHeight > tallestTree) {
                visibleTreeArray[rowIndex][columnIndex] = 1;
                tallestTree = currentTreeHeight;
            }

            // exit if tallestTree is 9
            if (tallestTree === 9) break;
        }
    })

    // count all visible trees
    return visibleTreeArray.flat().reduce((total, current) => total + current, 0)
}