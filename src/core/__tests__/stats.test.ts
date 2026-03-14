import { describe, it, expect } from 'vitest';
import { calcHpStat, calcOtherStat, applyRankModifier } from '../stats';

describe('calcHpStat', () => {
  it('ガブリアスHP (種族値108, 個体31, 努力252, Lv50)', () => {
    // (2*108+31+252/4)*50/100 + 50 + 10 = 215
    expect(calcHpStat(108, 31, 252, 50)).toBe(215);
  });

  it('ガブリアスHP (種族値108, 個体31, 努力0, Lv50)', () => {
    // (2*108+31+0)*50/100 + 50 + 10 = 183
    expect(calcHpStat(108, 31, 0, 50)).toBe(183);
  });

  it('ヌケニン (HP1固定)', () => {
    expect(calcHpStat(1, 31, 252, 50)).toBe(1);
  });

  it('Lv100 ガブリアスHP (種族値108, 個体31, 努力252, Lv100)', () => {
    // (2*108+31+63)*100/100 + 100 + 10 = 419
    expect(calcHpStat(108, 31, 252, 100)).toBe(420);
  });
});

describe('calcOtherStat', () => {
  it('ガブリアスこうげき (種族値130, 個体31, 努力252, Lv50, 性格補正1.1)', () => {
    // floor(((2*130+31+63)*50/100+5)*1.1) = floor(200*1.1) = 200
    // Actually: floor((floor((2*130+31+63)*50/100)+5)*1.1)
    // = floor((floor(354*50/100)+5)*1.1) = floor((177+5)*1.1) = floor(182*1.1) = floor(200.2) = 200
    expect(calcOtherStat(130, 31, 252, 50, 1.1)).toBe(200);
  });

  it('ガブリアスこうげき (種族値130, 個体31, 努力0, Lv50, 性格補正1.0)', () => {
    // floor((floor((2*130+31)*50/100)+5)*1.0) = floor((floor(291*50/100)+5)*1.0)
    // = floor((145+5)*1.0) = 150
    expect(calcOtherStat(130, 31, 0, 50, 1.0)).toBe(150);
  });

  it('性格下降補正', () => {
    // floor((floor((2*130+31)*50/100)+5)*0.9) = floor(150*0.9) = 135
    expect(calcOtherStat(130, 31, 0, 50, 0.9)).toBe(135);
  });
});

describe('applyRankModifier', () => {
  it('ランク+1', () => {
    expect(applyRankModifier(100, 1)).toBe(150);
  });

  it('ランク+2', () => {
    expect(applyRankModifier(100, 2)).toBe(200);
  });

  it('ランク-1', () => {
    expect(applyRankModifier(100, -1)).toBe(66);
  });

  it('ランク0', () => {
    expect(applyRankModifier(100, 0)).toBe(100);
  });
});
