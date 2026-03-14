import {
  DamageCalcRequest,
  DamageCalcResult,
  PokemonBuild,
  MoveData,
  BattleCondition,
  PokemonType,
} from './types';
import { calcAllStats } from './stats';
import { getTypeEffectivenessMulti } from './type-chart';

/** 乱数の16パターン (85~100) */
const RANDOM_FACTORS = [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

/**
 * ダメージ計算のメインエントリ
 */
export function calculateDamage(request: DamageCalcRequest): DamageCalcResult {
  const { attacker, defender, move, condition } = request;

  // へんか技はダメージなし
  if (move.category === 'へんか' || move.power === null) {
    return createEmptyResult(defender);
  }

  const attackerStats = calcAllStats(
    attacker.pokemon.baseStats,
    attacker.ivs,
    attacker.evs,
    attacker.level,
    attacker.nature,
  );
  const defenderStats = calcAllStats(
    defender.pokemon.baseStats,
    defender.ivs,
    defender.evs,
    defender.level,
    defender.nature,
  );

  const defenderHP = defenderStats.HP;

  // 攻撃・防御の実数値を決定
  const isPhysical = move.category === 'ぶつり';
  let attackStat = isPhysical ? attackerStats.こうげき : attackerStats.とくこう;
  let defenseStat = isPhysical ? defenderStats.ぼうぎょ : defenderStats.とくぼう;

  // ランク補正
  const atkRank = isPhysical ? condition.attackerRankAtk : condition.attackerRankSpAtk;
  const defRank = isPhysical ? condition.defenderRankDef : condition.defenderRankSpDef;
  attackStat = applyRankModifier(attackStat, condition.isCritical ? Math.max(0, atkRank) : atkRank);
  defenseStat = applyRankModifier(defenseStat, condition.isCritical ? Math.min(0, defRank) : defRank);

  // 技の威力
  let power = move.power;

  // 持ち物による威力補正
  power = applyItemPowerModifier(power, attacker.item, move);

  // 特性による威力補正
  power = applyAbilityPowerModifier(power, attacker.ability, move, attacker);

  // 基本ダメージ計算
  // ダメージ = ((レベル×2÷5+2) × 威力 × A÷D) ÷ 50 + 2
  const level = attacker.level;
  const baseDamage = Math.floor(
    Math.floor(
      Math.floor(level * 2 / 5 + 2) * power * attackStat / defenseStat
    ) / 50 + 2
  );

  // 各種補正を適用
  let modifiedDamage = baseDamage;

  // ダブルバトルの範囲技補正（0.75倍）- 簡易実装
  if (condition.isDoubleBattle && isSpreadMove(move)) {
    modifiedDamage = Math.floor(modifiedDamage * 0.75);
  }

  // 天候補正
  modifiedDamage = applyWeatherModifier(modifiedDamage, condition, move.type);

  // 急所補正 (1.5倍)
  if (condition.isCritical) {
    modifiedDamage = Math.floor(modifiedDamage * 1.5);
  }

  // 壁補正
  if (!condition.isCritical) {
    if (isPhysical && condition.isReflect) {
      modifiedDamage = Math.floor(modifiedDamage * (condition.isDoubleBattle ? 2 / 3 : 0.5));
    }
    if (!isPhysical && condition.isLightScreen) {
      modifiedDamage = Math.floor(modifiedDamage * (condition.isDoubleBattle ? 2 / 3 : 0.5));
    }
  }

  // やけど補正 (物理技のみ、0.5倍)
  if (condition.isBurned && isPhysical && attacker.ability !== 'こんじょう') {
    modifiedDamage = Math.floor(modifiedDamage * 0.5);
  }

  // 乱数16パターン計算（STAB・タイプ相性適用前の値に乱数をかける）
  const damages: number[] = RANDOM_FACTORS.map(factor => {
    let dmg = Math.floor(modifiedDamage * factor / 100);

    // STAB (タイプ一致補正)
    dmg = applySTAB(dmg, attacker, move);

    // タイプ相性
    const defTypes = defender.teraType ? [defender.teraType] : defender.pokemon.types;
    const effectiveness = getTypeEffectivenessMulti(
      attacker.teraType && attacker.teraType === move.type ? attacker.teraType : move.type,
      defTypes,
    );
    dmg = Math.floor(dmg * effectiveness);

    // 持ち物ダメージ補正
    dmg = applyItemDamageModifier(dmg, attacker.item, effectiveness);

    // てだすけ補正
    if (condition.isHelpingHand) {
      dmg = Math.floor(dmg * 1.5);
    }

    // フィールド補正
    dmg = applyFieldModifier(dmg, condition, move.type);

    return Math.max(1, dmg); // 最低1ダメージ
  });

  const minDamage = Math.min(...damages);
  const maxDamage = Math.max(...damages);
  const minPercent = Math.round((minDamage / defenderHP) * 1000) / 10;
  const maxPercent = Math.round((maxDamage / defenderHP) * 1000) / 10;

  // 確定数計算
  const { guaranteedKO, chanceToKO, koDescription } = calcKO(damages, defenderHP);

  return {
    damages,
    minDamage,
    maxDamage,
    defenderHP,
    minPercent,
    maxPercent,
    guaranteedKO,
    chanceToKO,
    koDescription,
  };
}

/** ランク補正を適用 */
function applyRankModifier(stat: number, rank: number): number {
  if (rank >= 0) {
    return Math.floor(stat * (2 + rank) / 2);
  } else {
    return Math.floor(stat * 2 / (2 - rank));
  }
}

/** STAB (タイプ一致補正) */
function applySTAB(damage: number, attacker: PokemonBuild, move: MoveData): number {
  const attackerTypes = attacker.pokemon.types;
  const teraType = attacker.teraType;
  const moveType = move.type;

  const isSTAB = attackerTypes.includes(moveType);
  const isTeraSTAB = teraType !== null && teraType === moveType;

  if (isTeraSTAB && isSTAB) {
    // テラスタル一致 + 元タイプ一致 = 2.0倍
    return Math.floor(damage * 2.0);
  } else if (isTeraSTAB || isSTAB) {
    // テラスタル一致 or 元タイプ一致 = 1.5倍
    return Math.floor(damage * 1.5);
  }

  // 適応力
  if (attacker.ability === 'てきおうりょく' && isSTAB) {
    return Math.floor(damage * 2.0);
  }

  return damage;
}

/** 天候補正 */
function applyWeatherModifier(damage: number, condition: BattleCondition, moveType: PokemonType): number {
  if (condition.weather === 'はれ') {
    if (moveType === 'ほのお') return Math.floor(damage * 1.5);
    if (moveType === 'みず') return Math.floor(damage * 0.5);
  }
  if (condition.weather === 'あめ') {
    if (moveType === 'みず') return Math.floor(damage * 1.5);
    if (moveType === 'ほのお') return Math.floor(damage * 0.5);
  }
  return damage;
}

/** フィールド補正 */
function applyFieldModifier(damage: number, condition: BattleCondition, moveType: PokemonType): number {
  if (condition.field === 'エレキフィールド' && moveType === 'でんき') {
    return Math.floor(damage * 1.3);
  }
  if (condition.field === 'グラスフィールド' && moveType === 'くさ') {
    return Math.floor(damage * 1.3);
  }
  if (condition.field === 'サイコフィールド' && moveType === 'エスパー') {
    return Math.floor(damage * 1.3);
  }
  if (condition.field === 'ミストフィールド' && moveType === 'ドラゴン') {
    return Math.floor(damage * 0.5);
  }
  return damage;
}

/** 持ち物による威力補正 */
function applyItemPowerModifier(power: number, item: string, move: MoveData): number {
  switch (item) {
    case 'こだわりハチマキ':
      if (move.category === 'ぶつり') return Math.floor(power * 1.5);
      break;
    case 'こだわりメガネ':
      if (move.category === 'とくしゅ') return Math.floor(power * 1.5);
      break;
  }
  return power;
}

/** 特性による威力補正 */
function applyAbilityPowerModifier(
  power: number,
  ability: string,
  move: MoveData,
  _attacker: PokemonBuild,
): number {
  switch (ability) {
    case 'テクニシャン':
      if (move.power !== null && move.power <= 60) return Math.floor(power * 1.5);
      break;
    case 'ちからもち':
    case 'ヨガパワー':
      // これらは攻撃力2倍だが、簡易的に威力で代用
      if (move.category === 'ぶつり') return Math.floor(power * 2);
      break;
  }
  return power;
}

/** 持ち物によるダメージ補正 */
function applyItemDamageModifier(damage: number, item: string, effectiveness: number): number {
  switch (item) {
    case 'いのちのたま':
      return Math.floor(damage * 1.3);
    case 'たつじんのおび':
      if (effectiveness > 1) return Math.floor(damage * 1.2);
      break;
  }
  return damage;
}

/** 範囲技判定（簡易） */
function isSpreadMove(_move: MoveData): boolean {
  // 将来的にはフラグで判定
  return false;
}

/** 確定数計算 */
function calcKO(
  damages: number[],
  hp: number,
): { guaranteedKO: number | null; chanceToKO: number | null; koDescription: string } {
  const sorted = [...damages].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  // 確定1発チェック
  if (min >= hp) {
    return { guaranteedKO: 1, chanceToKO: null, koDescription: '確定1発' };
  }

  // 乱数1発チェック
  if (max >= hp) {
    const koCount = sorted.filter(d => d >= hp).length;
    const chance = Math.round((koCount / 16) * 1000) / 10;
    return { guaranteedKO: null, chanceToKO: chance, koDescription: `乱数1発 (${chance}%)` };
  }

  // 確定2発〜6発チェック
  for (let hits = 2; hits <= 6; hits++) {
    const minTotal = min * hits;
    const maxTotal = max * hits;

    if (minTotal >= hp) {
      return { guaranteedKO: hits, chanceToKO: null, koDescription: `確定${hits}発` };
    }

    if (maxTotal >= hp) {
      // 乱数n発の確率を概算（簡易計算）
      const avgDamage = sorted.reduce((sum, d) => sum + d, 0) / sorted.length;
      const avgTotal = avgDamage * hits;
      const chance = Math.round((avgTotal / hp) * 100);
      const clampedChance = Math.min(99.9, Math.max(0.1, chance));
      return {
        guaranteedKO: null,
        chanceToKO: clampedChance,
        koDescription: `乱数${hits}発 (${clampedChance > 99 ? '高乱数' : clampedChance < 10 ? '低乱数' : `約${clampedChance}%`})`,
      };
    }
  }

  return { guaranteedKO: null, chanceToKO: null, koDescription: '確定6発以上' };
}

/** 空の結果を返す */
function createEmptyResult(defender: PokemonBuild): DamageCalcResult {
  const defenderStats = calcAllStats(
    defender.pokemon.baseStats,
    defender.ivs,
    defender.evs,
    defender.level,
    defender.nature,
  );
  return {
    damages: [0],
    minDamage: 0,
    maxDamage: 0,
    defenderHP: defenderStats.HP,
    minPercent: 0,
    maxPercent: 0,
    guaranteedKO: null,
    chanceToKO: null,
    koDescription: 'ダメージなし',
  };
}
