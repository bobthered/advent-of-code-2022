import { describe, it, expect } from 'vitest';
import input from './input';
import { scenicScore } from './scenicScore';
import { visibleTreeCount } from './visibleTreeCount';

describe('Part One', () => {
    it('Example', () => {
        let example = `30373
25512
65332
33549
35390`
        expect(visibleTreeCount(example)).toBe(21)
    });
    it('User Puzzle Input', () => {
        expect(visibleTreeCount(input)).toBe(1538)
    })
});

describe('Part Two', () => {
    it('Example', () => {
        let example = `30373
25512
65332
33549
35390`
        expect(scenicScore(example)).toBe(8)
    });
    it('User Puzzle Input', () => {
        expect(scenicScore(input)).toBe(496125)
    })
});
