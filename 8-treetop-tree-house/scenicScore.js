export const scenicScore = (input = '') => {
    // split input into rows
    input = input.split('\n').map(row => row.split(''));

    // initialize scenicScores
    let scenicScores = [...input].map(row => row.map((_) => { return { up: 0, left: 0, right: 0, down: 0, } }));

    // loop over rows
    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        // loop over columns
        for (let columnIndex = 0; columnIndex < input[0].length; columnIndex++) {
            // initialize initialTree
            let initialTreeHeight = input[rowIndex][columnIndex];

            // look up
            for (let directionIndex = rowIndex - 1; directionIndex >= 0; directionIndex--) {
                scenicScores[rowIndex][columnIndex].up++;
                // get current tree height
                const currentTreeHeight = input[directionIndex][columnIndex];

                // check if currentTreeHeight is larger or same as initialTreeHeight
                if (currentTreeHeight >= initialTreeHeight) break;
            }

            // look down
            for (let directionIndex = rowIndex + 1; directionIndex < input.length; directionIndex++) {
                scenicScores[rowIndex][columnIndex].down++;
                // get current tree height
                const currentTreeHeight = input[directionIndex][columnIndex];

                // check if currentTreeHeight is larger or same as initialTreeHeight
                if (currentTreeHeight >= initialTreeHeight) break;
            }

            // look right
            for (let directionIndex = columnIndex + 1; directionIndex < input[0].length; directionIndex++) {
                scenicScores[rowIndex][columnIndex].right++
                // get current tree height
                const currentTreeHeight = input[rowIndex][directionIndex];

                // check if currentTreeHeight is larger or same as initialTreeHeight
                if (currentTreeHeight >= initialTreeHeight) break;
            }

            // look left
            for (let directionIndex = columnIndex - 1; directionIndex >= 0; directionIndex--) {
                scenicScores[rowIndex][columnIndex].left++
                // get current tree height
                const currentTreeHeight = input[rowIndex][directionIndex];

                // check if currentTreeHeight is larger or same as initialTreeHeight
                if (currentTreeHeight >= initialTreeHeight) break;
            }
        }
    }

    scenicScores = scenicScores.map(row => row.map(scenicScore => Object.keys(scenicScore).reduce((total, key) => total *= scenicScore[key], 1)))

    return Math.max(...scenicScores.flat())
}