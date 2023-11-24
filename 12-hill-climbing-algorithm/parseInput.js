export const parseInput = input => {
    // initiate positions
    let startPosition = {};
    let endPosition = {};

    const map = input.split('\n').map((row, y) => row.split('').map((v, x) => {
        if (v === 'S') {
            startPosition = { height: 0, x, y };
            v = 'a';
        }
        if (v === 'E') {
            endPosition = { height: 25, x, y };
            v = 'z'
        }
        return v.charCodeAt(0) - 97
    }))

    return { startPosition, endPosition, map }
}