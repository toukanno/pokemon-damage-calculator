import { BaseStats, StatValues, Nature, StatName } from './types';

/**
 * HP実数値を計算する
 * HP = (種族値×2 + 個体値 + 努力値÷4) × レベル÷100 + レベル + 10
 * ヌケニンの場合は常に1
 */
export function calcHP(
  base: number,
  iv: number,
  ev: number,
  level: number,
  isShedinja: boolean = false,
): number {
  if (isShedinja) return 1;
  return Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level / 100) + level + 10;
}

/**
 * HP以外の実数値を計算する
 * ステータス = ((種族値×2 + 個体値 + 努力値÷4) × レベル÷100 + 5) × 性格補正
 */
export function calcStat(
  base: number,
  iv: number,
  ev: number,
  level: number,
  natureModifier: number, // 1.0, 1.1, 0.9
): number {
  const raw = Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level / 100) + 5;
  return Math.floor(raw * natureModifier);
}

/**
 * 性格補正値を取得する
 */
export function getNatureModifier(nature: Nature, stat: StatName): number {
  if (stat === 'HP') return 1.0;
  if (nature.plus === stat) return 1.1;
  if (nature.minus === stat) return 0.9;
  return 1.0;
}

/**
 * 全ステータスの実数値を計算する
 */
export function calcAllStats(
  baseStats: BaseStats,
  ivs: StatValues,
  evs: StatValues,
  level: number,
  nature: Nature,
  isShedinja: boolean = false,
): StatValues {
  return {
    HP: calcHP(baseStats.HP, ivs.HP, evs.HP, level, isShedinja),
    こうげき: calcStat(baseStats.こうげき, ivs.こうげき, evs.こうげき, level, getNatureModifier(nature, 'こうげき')),
    ぼうぎょ: calcStat(baseStats.ぼうぎょ, ivs.ぼうぎょ, evs.ぼうぎょ, level, getNatureModifier(nature, 'ぼうぎょ')),
    とくこう: calcStat(baseStats.とくこう, ivs.とくこう, evs.とくこう, level, getNatureModifier(nature, 'とくこう')),
    とくぼう: calcStat(baseStats.とくぼう, ivs.とくぼう, evs.とくぼう, level, getNatureModifier(nature, 'とくぼう')),
    すばやさ: calcStat(baseStats.すばやさ, ivs.すばやさ, evs.すばやさ, level, getNatureModifier(nature, 'すばやさ')),
  };
}

/**
 * 努力値から実数値を逆算する（将来拡張用）
 */
export function calcEVFromStat(
  targetStat: number,
  base: number,
  iv: number,
  level: number,
  natureModifier: number,
): number | null {
  // 逆算: ev = ((targetStat / natureModifier - 5) * 100 / level - base * 2 - iv) * 4
  const raw = Math.ceil(targetStat / natureModifier) - 5;
  const ev = (Math.ceil(raw * 100 / level) - base * 2 - iv) * 4;
  if (ev < 0 || ev > 252) return null;
  return Math.max(0, ev);
}
