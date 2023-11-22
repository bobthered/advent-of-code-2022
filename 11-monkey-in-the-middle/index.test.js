import { describe, it, expect } from 'vitest';
import { example1, input } from './input';
import { solution } from './solution';

describe('Part One', () => {
  it('Example', () => {
    expect(solution(example1)).toBe(10605);
  })

  it('User Puzzle Input', () => {
    expect(solution(input)).toBe(118674);
  })
})

describe('Part Two', () => {
  it('Example', () => {
    expect(solution(example1, 10000, 1)).toBe(2713310158);
  })

  it('User Puzzle Input', () => {
    expect(solution(input, 10000, 1)).toBe(32333418600);
  })
})