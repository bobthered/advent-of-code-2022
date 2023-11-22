import { describe, it, expect } from 'vitest';
import { example1, example2, input } from './input';
import { solution } from './solution';

describe('Part One', () => {
  it('Example', () => {
    expect(solution(example1)).toBe(10605);
  })

  it('User Puzzle Input', () => {
    expect(solution(input)).toBe(118674);
  })
})