import {
  DamageCalcRequest,
  DamageCalcResult,
  KoChance,
  PokemonType,
  Stats,
} from './types';
import { calcAllStats, applyRankModifier } from './stats';
import { getTypeEffectiveness } from './type-effectiveness';
import { POKEMON } from '@/data/pokemon';
import { MOVES } from '@/data/moves';
import { getAbilityDamageModifier } from './ability-modifiers';
import { getItemDamageModifier } from './item-modifiers';

/** ポケモンのダメージ計算のコア関数 (Gen 9準拠) */
export function calculateDamage(request: DamageCalcRequest): DamageCalcResult {
  const { attacker, defender, moveId, condition } = request;

  const attackerData = POKEMON.find(p => p.id === attacker.pokemonId);
  const defenderData = POKEMON.find(p => p.id === defender.pokemonId);
  const moveData = MOVES.find(m => m.id === moveId);

  if (!attackerData || !defenderData || !moveData) {
    return emptyResult();
  }

  if (moveData.category === 'へんか' || moveData.power === null) {
    return emptyResult();
  }

  // 実数値計算
  const attackerStats = calcAllStats(
    attackerData.baseStats, attacker.ivs, attacker.evs,
    attacker.level, attacker.nature
  );
  const defenderStats = calcAllStats(
    defenderData.baseStats, defender.ivs, defender.evs,
    defender.level, defender.nature
  );

  const isPhysical = moveData.category === 'ぶつり';
  const level = attacker.level;

  // 攻撃・防御ステータス選択
  let atkStat = isPhysical ? attackerStats.atk : attackerStats.spa;
  let defStat = isPhysical ? defenderStats.def : defenderStats.spd;

  // ランク補正
  const atkRank = condition.isCritical && condition.attackerRank < 0 ? 0 : condition.attackerRank;
  const defRank = condition.isCritical && condition.defenderRank > 0 ? 0 : condition.defenderRank;
  atkStat = applyRankModifier(atkStat, atkRank);
  defStat = applyRankModifier(defStat, defRank);

  // 技の威力
  let power = moveData.power;

  // タイプ一致 (STAB)
  const attackerTypes = condition.isTerastallized && attacker.teraType
    ? [attacker.teraType]
    : attackerData.types;
  const isSTAB = attackerTypes.includes(moveData.type) ||
    (condition.isTerastallized && attacker.teraType === moveData.type);

  // テラスタル時の元タイプ一致ボーナス
  const hasOriginalSTAB = attackerData.types.includes(moveData.type);
  let stabModifier = 1.0;
  if (isSTAB) {
    stabModifier = 1.5;
    // 適応力
    if (attacker.abilityId === 'tekiouryoku') {
      stabModifier = 2.0;
    }
    // テラスタル + 元タイプ一致
    if (condition.isTerastallized && hasOriginalSTAB && attacker.teraType === moveData.type) {
      stabModifier = 2.0;
      if (attacker.abilityId === 'tekiouryoku') {
        stabModifier = 2.25;
      }
    }
  }

  // タイプ相性
  const defenderTypes = defenderData.types;
  const typeEffectiveness = getTypeEffectiveness(moveData.type, defenderTypes);

  if (typeEffectiveness === 0) {
    return emptyResult();
  }

  // 天候補正
  let weatherModifier = 1.0;
  if (condition.weather === 'sun') {
    if (moveData.type === 'ほのお') weatherModifier = 1.5;
    if (moveData.type === 'みず') weatherModifier = 0.5;
  } else if (condition.weather === 'rain') {
    if (moveData.type === 'みず') weatherModifier = 1.5;
    if (moveData.type === 'ほのお') weatherModifier = 0.5;
  }

  // 急所補正
  const criticalModifier = condition.isCritical ? 1.5 : 1.0;

  // やけど補正
  const burnModifier = (condition.isBurned && isPhysical && attacker.abilityId !== 'konjou') ? 0.5 : 1.0;

  // 壁補正
  let screenModifier = 1.0;
  if (!condition.isCritical) {
    if (isPhysical && condition.isReflect) {
      screenModifier = condition.isDoubleBattle ? 2 / 3 : 0.5;
    }
    if (!isPhysical && condition.isLightScreen) {
      screenModifier = condition.isDoubleBattle ? 2 / 3 : 0.5;
    }
  }

  // ダブルバトルの複数対象補正
  const targetModifier = 1.0; // シングル前提、ダブル時は個別対応

  // フィールド補正
  let terrainModifier = 1.0;
  if (condition.terrain === 'electric' && moveData.type === 'でんき') {
    terrainModifier = 1.3;
  } else if (condition.terrain === 'grassy' && moveData.type === 'くさ') {
    terrainModifier = 1.3;
  } else if (condition.terrain === 'psychic' && moveData.type === 'エスパー') {
    terrainModifier = 1.3;
  } else if (condition.terrain === 'misty' && moveData.type === 'ドラゴン') {
    terrainModifier = 0.5;
  }

  // てだすけ補正
  const helpingHandModifier = condition.isHelpingHand ? 1.5 : 1.0;

  // 特性補正
  const abilityModifier = getAbilityDamageModifier(
    attacker.abilityId, defender.abilityId, moveData, condition
  );

  // 持ち物補正
  const itemModifier = getItemDamageModifier(
    attacker.itemId, moveData, attackerTypes, isSTAB, typeEffectiveness
  );

  // 基本ダメージ計算
  const baseDamage = Math.floor(
    Math.floor(
      Math.floor(2 * level / 5 + 2) * power * atkStat / defStat
    ) / 50 + 2
  );

  // 乱数以外の補正をまとめる
  const modifier = weatherModifier * criticalModifier * stabModifier *
    typeEffectiveness * burnModifier * screenModifier * targetModifier *
    terrainModifier * helpingHandModifier * abilityModifier * itemModifier;

  // 乱数16パターン (85% ~ 100%)
  const damages: number[] = [];
  for (let i = 0; i < 16; i++) {
    const randomFactor = (85 + i) / 100;
    const damage = Math.max(1, Math.floor(baseDamage * randomFactor * modifier));
    damages.push(damage);
  }

  const defenderMaxHp = defenderStats.hp;
  const minDamage = damages[0];
  const maxDamage = damages[15];
  const minPercent = Math.round((minDamage / defenderMaxHp) * 1000) / 10;
  const maxPercent = Math.round((maxDamage / defenderMaxHp) * 1000) / 10;

  const koChance = calcKoChance(damages, defenderMaxHp);

  return {
    damages,
    minDamage,
    maxDamage,
    defenderMaxHp,
    minPercent,
    maxPercent,
    koChance,
  };
}

/** 確定数を計算 */
function calcKoChance(damages: number[], hp: number): KoChance {
  // 確定1発チェック
  if (damages[0] >= hp) {
    return { hits: 1, chance: 100, text: '確定1発' };
  }

  // 乱数1発チェック
  const oneshotCount = damages.filter(d => d >= hp).length;
  if (oneshotCount > 0) {
    const chance = Math.round((oneshotCount / 16) * 1000) / 10;
    return { hits: 1, chance, text: `乱数1発 (${chance}%)` };
  }

  // 確定2発〜6発チェック
  for (let hits = 2; hits <= 6; hits++) {
    const minTotal = damages[0] * hits;
    const maxTotal = damages[15] * hits;

    if (minTotal >= hp) {
      return { hits, chance: 100, text: `確定${hits}発` };
    }

    if (maxTotal >= hp) {
      // 乱数確定数を簡易計算
      let koCount = 0;
      for (const d of damages) {
        if (d * hits >= hp) koCount++;
      }
      const chance = Math.round((koCount / 16) * 1000) / 10;
      return { hits, chance, text: `乱数${hits}発 (${chance}%)` };
    }
  }

  return { hits: 7, chance: 100, text: '7発以上' };
}

function emptyResult(): DamageCalcResult {
  return {
    damages: [],
    minDamage: 0,
    maxDamage: 0,
    defenderMaxHp: 0,
    minPercent: 0,
    maxPercent: 0,
    koChance: { hits: 0, chance: 0, text: '-' },
  };
}
