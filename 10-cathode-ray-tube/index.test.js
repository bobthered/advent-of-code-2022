import { describe, it, expect } from 'vitest';
import { example1, input } from './input';
import { solution } from './solution';

describe('Part One', () => {
	it('Example', () => {
		expect(solution(example1)).toBe(13140);
	});

	it('User Puzzle Input', () => {
		expect(solution(input)).toBe(12880);
	})
})