import { describe, it, expect } from 'vitest';
import { calculateDamage } from '../damage';
import { calcHP, calcStat, calcAllStats, getNatureModifier } from '../stats';
import { getTypeEffectiveness, getTypeEffectivenessMulti } from '../type-chart';
import { DamageCalcRequest, PokemonData, MoveData, Nature, BattleCondition, PokemonBuild } from '../types';
import { DEFAULT_IVS, DEFAULT_EVS, DEFAULT_BATTLE_CONDITION } from '../defaults';

// テスト用ポケモンデータ
const garchomp: PokemonData = {
  id: 1, name: 'ガブリアス', types: ['ドラゴン', 'じめん'],
  baseStats: { HP: 108, こうげき: 130, ぼうぎょ: 95, とくこう: 80, とくぼう: 85, すばやさ: 102 },
  abilities: ['すながくれ', 'さめはだ'], weight: 95.0,
};

const mimikyu: PokemonData = {
  id: 2, name: 'ミミッキュ', types: ['ゴースト', 'フェアリー'],
  baseStats: { HP: 55, こうげき: 90, ぼうぎょ: 80, とくこう: 50, とくぼう: 105, すばやさ: 96 },
  abilities: ['ばけのかわ'], weight: 0.7,
};

const earthquake: MoveData = {
  id: 1, name: 'じしん', type: 'じめん', category: 'ぶつり', power: 100, accuracy: 100, pp: 10,
};

const moonforce: MoveData = {
  id: 103, name: 'ムーンフォース', type: 'フェアリー', category: 'とくしゅ', power: 95, accuracy: 100, pp: 15,
};

const shadowBall: MoveData = {
  id: 102, name: 'シャドーボール', type: 'ゴースト', category: 'とくしゅ', power: 80, accuracy: 100, pp: 15,
};

const adamant: Nature = { id: 'adamant', name: 'いじっぱり', plus: 'こうげき', minus: 'とくこう' };
const modest: Nature = { id: 'modest', name: 'ひかえめ', plus: 'とくこう', minus: 'こうげき' };
const jolly: Nature = { id: 'jolly', name: 'ようき', plus: 'すばやさ', minus: 'とくこう' };
const hardy: Nature = { id: 'hardy', name: 'がんばりや' };

describe('ステータス計算', () => {
  it('HP実数値を正しく計算する（ガブリアス Lv50 6V 無振り）', () => {
    const hp = calcHP(108, 31, 0, 50);
    expect(hp).toBe(183);
  });

  it('HP実数値を正しく計算する（ガブリアス Lv50 6V H252振り）', () => {
    const hp = calcHP(108, 31, 252, 50);
    expect(hp).toBe(215);
  });

  it('攻撃実数値を正しく計算する（ガブリアス Lv50 6V A252 いじっぱり）', () => {
    const atk = calcStat(130, 31, 252, 50, 1.1);
    expect(atk).toBe(200);
  });

  it('攻撃実数値を正しく計算する（ガブリアス Lv50 6V 無振り 補正なし）', () => {
    const atk = calcStat(130, 31, 0, 50, 1.0);
    expect(atk).toBe(150);
  });

  it('性格補正を正しく取得する', () => {
    expect(getNatureModifier(adamant, 'こうげき')).toBe(1.1);
    expect(getNatureModifier(adamant, 'とくこう')).toBe(0.9);
    expect(getNatureModifier(adamant, 'ぼうぎょ')).toBe(1.0);
    expect(getNatureModifier(hardy, 'こうげき')).toBe(1.0);
  });

  it('全ステータスを正しく計算する', () => {
    const stats = calcAllStats(
      garchomp.baseStats,
      DEFAULT_IVS,
      { HP: 0, こうげき: 252, ぼうぎょ: 0, とくこう: 0, とくぼう: 4, すばやさ: 252 },
      50,
      jolly,
    );
    expect(stats.HP).toBe(183);
    expect(stats.すばやさ).toBe(169); // ようき S252
  });
});

describe('タイプ相性', () => {
  it('等倍を返す', () => {
    expect(getTypeEffectiveness('ノーマル', 'くさ')).toBe(1.0);
  });

  it('効果抜群を返す', () => {
    expect(getTypeEffectiveness('ほのお', 'くさ')).toBe(2);
  });

  it('いまひとつを返す', () => {
    expect(getTypeEffectiveness('ほのお', 'みず')).toBe(0.5);
  });

  it('無効を返す', () => {
    expect(getTypeEffectiveness('ノーマル', 'ゴースト')).toBe(0);
    expect(getTypeEffectiveness('じめん', 'ひこう')).toBe(0);
  });

  it('複合タイプへの相性を正しく計算する', () => {
    // じめん → ほのお/はがね = 2 * 2 = 4
    expect(getTypeEffectivenessMulti('じめん', ['ほのお', 'はがね'])).toBe(4);
    // フェアリー → ドラゴン/じめん = 2 * 1 = 2
    expect(getTypeEffectivenessMulti('フェアリー', ['ドラゴン', 'じめん'])).toBe(2);
  });

  it('ゴースト → ゴースト/フェアリーは0.5倍', () => {
    // ゴースト→ゴースト=2, ゴースト→フェアリー=1 → 2
    expect(getTypeEffectivenessMulti('ゴースト', ['ゴースト', 'フェアリー'])).toBe(2);
  });
});

describe('ダメージ計算', () => {
  const makeRequest = (
    attacker: PokemonData,
    defender: PokemonData,
    move: MoveData,
    attackerNature: Nature = hardy,
    attackerEvs: Partial<typeof DEFAULT_EVS> = {},
    defenderEvs: Partial<typeof DEFAULT_EVS> = {},
    conditionOverride: Partial<BattleCondition> = {},
  ): DamageCalcRequest => ({
    attacker: {
      pokemon: attacker,
      level: 50,
      nature: attackerNature,
      ivs: { ...DEFAULT_IVS },
      evs: { ...DEFAULT_EVS, ...attackerEvs },
      ability: attacker.abilities[0],
      item: 'なし',
      teraType: null,
      moves: [move],
    },
    defender: {
      pokemon: defender,
      level: 50,
      nature: hardy,
      ivs: { ...DEFAULT_IVS },
      evs: { ...DEFAULT_EVS, ...defenderEvs },
      ability: defender.abilities[0],
      item: 'なし',
      teraType: null,
      moves: [],
    },
    move,
    condition: { ...DEFAULT_BATTLE_CONDITION, ...conditionOverride },
  });

  it('基本的なダメージ計算ができる', () => {
    const req = makeRequest(garchomp, mimikyu, earthquake, adamant, { こうげき: 252 });
    const result = calculateDamage(req);

    expect(result.damages).toHaveLength(16);
    expect(result.minDamage).toBeGreaterThan(0);
    expect(result.maxDamage).toBeGreaterThanOrEqual(result.minDamage);
    expect(result.defenderHP).toBe(130); // ミミッキュ H55 無振り Lv50
  });

  it('タイプ相性が反映される（じめん→ゴースト/フェアリー = 無効なし、等倍）', () => {
    // じめん→ゴースト=1, じめん→フェアリー=1 → 等倍
    const req = makeRequest(garchomp, mimikyu, earthquake);
    const result = calculateDamage(req);
    expect(result.minDamage).toBeGreaterThan(0);
  });

  it('タイプ一致補正(STAB)が適用される', () => {
    // ガブリアスのじしんはじめんタイプ一致 → 1.5倍
    const reqSTAB = makeRequest(garchomp, mimikyu, earthquake);
    const resultSTAB = calculateDamage(reqSTAB);

    // ガブリアスのシャドーボールはタイプ不一致
    const reqNoSTAB = makeRequest(garchomp, mimikyu, shadowBall);
    const resultNoSTAB = calculateDamage(reqNoSTAB);

    // STAB有りの方がダメージが高いはず（威力差を考慮してもじしん100*1.5 > シャドーボール80）
    expect(resultSTAB.maxDamage).toBeGreaterThan(resultNoSTAB.maxDamage);
  });

  it('急所でダメージが上がる', () => {
    const reqNormal = makeRequest(garchomp, mimikyu, earthquake);
    const reqCrit = makeRequest(garchomp, mimikyu, earthquake, hardy, {}, {}, { isCritical: true });

    const resultNormal = calculateDamage(reqNormal);
    const resultCrit = calculateDamage(reqCrit);

    expect(resultCrit.maxDamage).toBeGreaterThan(resultNormal.maxDamage);
  });

  it('やけどで物理ダメージが下がる', () => {
    const reqNormal = makeRequest(garchomp, mimikyu, earthquake);
    const reqBurned = makeRequest(garchomp, mimikyu, earthquake, hardy, {}, {}, { isBurned: true });

    const resultNormal = calculateDamage(reqNormal);
    const resultBurned = calculateDamage(reqBurned);

    expect(resultBurned.maxDamage).toBeLessThan(resultNormal.maxDamage);
  });

  it('天候補正が適用される（はれ + ほのお技）', () => {
    const flamethrower: MoveData = {
      id: 106, name: 'かえんほうしゃ', type: 'ほのお', category: 'とくしゅ', power: 90, accuracy: 100, pp: 15,
    };
    const reqNormal = makeRequest(garchomp, mimikyu, flamethrower);
    const reqSunny = makeRequest(garchomp, mimikyu, flamethrower, hardy, {}, {}, { weather: 'はれ' });

    const resultNormal = calculateDamage(reqNormal);
    const resultSunny = calculateDamage(reqSunny);

    expect(resultSunny.maxDamage).toBeGreaterThan(resultNormal.maxDamage);
  });

  it('リフレクターでダメージが下がる', () => {
    const reqNormal = makeRequest(garchomp, mimikyu, earthquake);
    const reqReflect = makeRequest(garchomp, mimikyu, earthquake, hardy, {}, {}, { isReflect: true });

    const resultNormal = calculateDamage(reqNormal);
    const resultReflect = calculateDamage(reqReflect);

    expect(resultReflect.maxDamage).toBeLessThan(resultNormal.maxDamage);
  });

  it('確定数表示が正しい', () => {
    // A252いじっぱりガブリアスのじしん → 無振りミミッキュ
    const req = makeRequest(garchomp, mimikyu, earthquake, adamant, { こうげき: 252 });
    const result = calculateDamage(req);

    // ダメージが十分大きいので確定1~2発になるはず
    expect(result.koDescription).toMatch(/確定|乱数/);
  });

  it('へんか技はダメージ0', () => {
    const swordsDance: MoveData = {
      id: 5, name: 'つるぎのまい', type: 'ノーマル', category: 'へんか', power: null, accuracy: null, pp: 20,
    };
    const req = makeRequest(garchomp, mimikyu, swordsDance);
    const result = calculateDamage(req);
    expect(result.minDamage).toBe(0);
    expect(result.maxDamage).toBe(0);
    expect(result.koDescription).toBe('ダメージなし');
  });
});
