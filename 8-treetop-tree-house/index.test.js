import { describe, it, expect } from 'vitest';
import input from './input';
import { solution } from './solution';

describe('Part One', () => {
    it('Example', () => {
        let example = `30373
25512
65332
33549
35390`
        expect(solution(example)).toBe(21)
    });
    it('User Puzzle Input', () => {
        expect(solution(input)).toBe(1538)
    })
});
