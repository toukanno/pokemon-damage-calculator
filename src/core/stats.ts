import { Stats, StatKey, Nature } from './types';
import { NATURES } from '@/data/natures';

/** 性格補正値を取得 */
export function getNatureModifier(nature: Nature, stat: StatKey): number {
  if (stat === 'hp') return 1.0;
  if (nature.plus === stat) return 1.1;
  if (nature.minus === stat) return 0.9;
  return 1.0;
}

/** HP実数値を計算 */
export function calcHpStat(
  base: number,
  iv: number,
  ev: number,
  level: number
): number {
  if (base === 1) return 1; // ヌケニン
  return Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100) + level + 10;
}

/** HP以外の実数値を計算 */
export function calcOtherStat(
  base: number,
  iv: number,
  ev: number,
  level: number,
  natureModifier: number
): number {
  return Math.floor(
    (Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100) + 5) * natureModifier
  );
}

/** 全ステータスの実数値を計算 */
export function calcAllStats(
  baseStats: Stats,
  ivs: Stats,
  evs: Stats,
  level: number,
  natureId: string
): Stats {
  const nature = NATURES.find(n => n.id === natureId) || NATURES[0];

  return {
    hp: calcHpStat(baseStats.hp, ivs.hp, evs.hp, level),
    atk: calcOtherStat(baseStats.atk, ivs.atk, evs.atk, level, getNatureModifier(nature, 'atk')),
    def: calcOtherStat(baseStats.def, ivs.def, evs.def, level, getNatureModifier(nature, 'def')),
    spa: calcOtherStat(baseStats.spa, ivs.spa, evs.spa, level, getNatureModifier(nature, 'spa')),
    spd: calcOtherStat(baseStats.spd, ivs.spd, evs.spd, level, getNatureModifier(nature, 'spd')),
    spe: calcOtherStat(baseStats.spe, ivs.spe, evs.spe, level, getNatureModifier(nature, 'spe')),
  };
}

/** ランク補正を適用 */
export function applyRankModifier(stat: number, rank: number): number {
  if (rank >= 0) {
    return Math.floor(stat * (2 + rank) / 2);
  } else {
    return Math.floor(stat * 2 / (2 - rank));
  }
}
