import { describe, it, expect } from 'vitest';
import { input } from './input';
import { solution } from './solution';

describe('Part One', () => {
	it('Example', () => {
		const instructions = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
		expect(solution(instructions)).toBe(13);
	})

	it('User Puzzle Input', () => {
		expect(solution(input)).toBe(6098);
	})
})