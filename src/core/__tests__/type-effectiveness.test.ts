import { describe, it, expect } from 'vitest';
import { getTypeEffectiveness } from '../type-effectiveness';

describe('getTypeEffectiveness', () => {
  it('ほのお → くさ (2倍)', () => {
    expect(getTypeEffectiveness('ほのお', ['くさ'])).toBe(2);
  });

  it('みず → ほのお (2倍)', () => {
    expect(getTypeEffectiveness('みず', ['ほのお'])).toBe(2);
  });

  it('ノーマル → ゴースト (0倍)', () => {
    expect(getTypeEffectiveness('ノーマル', ['ゴースト'])).toBe(0);
  });

  it('じめん → ひこう (0倍)', () => {
    expect(getTypeEffectiveness('じめん', ['ひこう'])).toBe(0);
  });

  it('こおり → ドラゴン/じめん (4倍)', () => {
    expect(getTypeEffectiveness('こおり', ['ドラゴン', 'じめん'])).toBe(4);
  });

  it('ほのお → みず/じめん (0.5倍)', () => {
    // ほのお→みず: 0.5, ほのお→じめん: 等倍 = 0.5
    expect(getTypeEffectiveness('ほのお', ['みず', 'じめん'])).toBeCloseTo(0.5);
  });

  it('等倍の場合', () => {
    expect(getTypeEffectiveness('ほのお', ['ノーマル'])).toBe(1);
  });

  it('かくとう → ノーマル/いわ (4倍)', () => {
    expect(getTypeEffectiveness('かくとう', ['ノーマル', 'いわ'])).toBe(4);
  });
});
