import { describe, it, expect } from 'vitest';
import { calculateDamage } from '../damage';
import { DamageCalcRequest, PokemonBuild, BattleCondition } from '../types';

function makeBuild(overrides: Partial<PokemonBuild> = {}): PokemonBuild {
  return {
    pokemonId: 'garchomp',
    level: 50,
    nature: 'ganbare',
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    abilityId: 'none',
    itemId: 'none',
    teraType: null,
    moves: [],
    ...overrides,
  };
}

function makeCondition(overrides: Partial<BattleCondition> = {}): BattleCondition {
  return {
    weather: 'none',
    terrain: 'none',
    isReflect: false,
    isLightScreen: false,
    isHelpingHand: false,
    isCritical: false,
    isBurned: false,
    isDoubleBattle: false,
    attackerRank: 0,
    defenderRank: 0,
    isTerastallized: false,
    ...overrides,
  };
}

describe('calculateDamage', () => {
  it('ガブリアス(A252いじっぱり) → サーフゴー じしん', () => {
    const request: DamageCalcRequest = {
      attacker: makeBuild({
        pokemonId: 'garchomp',
        nature: 'ijippari',
        evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 0 },
      }),
      defender: makeBuild({ pokemonId: 'gholdengo' }),
      moveId: 'earthquake',
      condition: makeCondition(),
    };

    const result = calculateDamage(request);

    // じしんは等倍 (じめん → はがね/ゴースト: はがね2倍 * ゴースト等倍 = 2倍)
    expect(result.damages).toHaveLength(16);
    expect(result.minDamage).toBeGreaterThan(0);
    expect(result.maxDamage).toBeGreaterThanOrEqual(result.minDamage);
    expect(result.minPercent).toBeGreaterThan(0);
    expect(result.koChance.hits).toBeGreaterThanOrEqual(1);
  });

  it('タイプ相性0倍の場合はダメージ0', () => {
    const request: DamageCalcRequest = {
      attacker: makeBuild({ pokemonId: 'garchomp' }),
      defender: makeBuild({ pokemonId: 'dragonite' }), // ひこうタイプ
      moveId: 'earthquake', // じめん技
      condition: makeCondition(),
    };

    const result = calculateDamage(request);
    expect(result.damages).toHaveLength(0);
    expect(result.minDamage).toBe(0);
  });

  it('天候晴れでほのお技が強化される', () => {
    const base: DamageCalcRequest = {
      attacker: makeBuild({
        pokemonId: 'charizard',
        nature: 'hikaeme',
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 0 },
      }),
      defender: makeBuild({ pokemonId: 'garchomp' }),
      moveId: 'kaen_housya',
      condition: makeCondition(),
    };

    const sunny: DamageCalcRequest = {
      ...base,
      condition: makeCondition({ weather: 'sun' }),
    };

    const normalResult = calculateDamage(base);
    const sunnyResult = calculateDamage(sunny);

    expect(sunnyResult.maxDamage).toBeGreaterThan(normalResult.maxDamage);
  });

  it('急所で壁を無視', () => {
    const withWall: DamageCalcRequest = {
      attacker: makeBuild({
        pokemonId: 'garchomp',
        nature: 'ijippari',
        evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 0 },
      }),
      defender: makeBuild({ pokemonId: 'garganacl' }),
      moveId: 'earthquake',
      condition: makeCondition({ isReflect: true }),
    };

    const withWallCrit: DamageCalcRequest = {
      ...withWall,
      condition: makeCondition({ isReflect: true, isCritical: true }),
    };

    const wallResult = calculateDamage(withWall);
    const critResult = calculateDamage(withWallCrit);

    // 急所は壁を無視し、さらに1.5倍なので明確に大きい
    expect(critResult.maxDamage).toBeGreaterThan(wallResult.maxDamage);
  });

  it('こだわりハチマキでぶつり技のダメージが1.5倍', () => {
    const base: DamageCalcRequest = {
      attacker: makeBuild({
        pokemonId: 'garchomp',
        nature: 'ijippari',
        evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 0 },
      }),
      defender: makeBuild({ pokemonId: 'garganacl' }),
      moveId: 'earthquake',
      condition: makeCondition(),
    };

    const withBand: DamageCalcRequest = {
      ...base,
      attacker: { ...base.attacker, itemId: 'kodawari_hachimaki' },
    };

    const normalResult = calculateDamage(base);
    const bandResult = calculateDamage(withBand);

    // 1.5倍の補正
    expect(bandResult.maxDamage).toBeGreaterThan(normalResult.maxDamage);
    // だいたい1.5倍になるはず
    const ratio = bandResult.maxDamage / normalResult.maxDamage;
    expect(ratio).toBeGreaterThan(1.4);
    expect(ratio).toBeLessThan(1.6);
  });

  it('存在しないポケモンIDの場合は空の結果', () => {
    const request: DamageCalcRequest = {
      attacker: makeBuild({ pokemonId: 'nonexistent' }),
      defender: makeBuild(),
      moveId: 'earthquake',
      condition: makeCondition(),
    };

    const result = calculateDamage(request);
    expect(result.damages).toHaveLength(0);
  });

  it('STAB (タイプ一致) が適用される', () => {
    // ガブリアスのじしん（じめんタイプ一致）
    const stabRequest: DamageCalcRequest = {
      attacker: makeBuild({ pokemonId: 'garchomp' }),
      defender: makeBuild({ pokemonId: 'garganacl' }),
      moveId: 'earthquake',
      condition: makeCondition(),
    };

    // ガブリアスのアイアンヘッド（タイプ不一致）
    const noStabRequest: DamageCalcRequest = {
      ...stabRequest,
      moveId: 'iron_head',
    };

    const stabResult = calculateDamage(stabRequest);
    const noStabResult = calculateDamage(noStabRequest);

    // じしん(威力100, STAB) vs アイアンヘッド(威力80, 半減)
    // STABの効果でじしんの方がダメージが大きい
    expect(stabResult.maxDamage).toBeGreaterThan(noStabResult.maxDamage);
  });
});
