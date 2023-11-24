import { directionDeltas } from "./directionDeltas";

export const shortestDistance = (map, startPosition, endPosition, direction = 'up') => {
    // initiate completed variable
    let completed = false;

    // initiate total distance taken
    let totalDistance = 0;

    // initiate queue
    let queue = [];

    // add start position to queue
    queue.push({ ...startPosition, distance: totalDistance })

    // initiate visited set
    const visited = new Set();

    // add start position to visited set
    visited.add(`[${startPosition.x}, ${startPosition.y}]`)

    while (queue.length && !completed) {
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

            // exit if height is undefined (outside of map)
            if (lookup.height === undefined) return;

            // exit if height is too tall
            if (lookup.height > currentHeight + 1 && direction === 'up') return;

            // exit if height is too far down
            if (lookup.height < currentHeight - 1 && direction === 'down') return;

            // exit if position is already visited
            if (visited.has(`[${lookup.x}, ${lookup.y}]`)) return;

            // exit if reached the end
            if (lookup.x === endPosition.x && lookup.y === endPosition.y) {
                completed = true;
                totalDistance = distance + 1;
                return;
            }

            // add new lookup position to queue and visited set
            queue.push({ ...lookup, distance: distance + 1 })
            visited.add(`[${lookup.x}, ${lookup.y}]`)
        })

    }

    return completed ? totalDistance : Infinity
}