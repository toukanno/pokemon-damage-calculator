import { StatValues, BattleCondition } from './types';

/** デフォルト個体値 (6V) */
export const DEFAULT_IVS: StatValues = {
  HP: 31, こうげき: 31, ぼうぎょ: 31,
  とくこう: 31, とくぼう: 31, すばやさ: 31,
};

/** デフォルト努力値 (無振り) */
export const DEFAULT_EVS: StatValues = {
  HP: 0, こうげき: 0, ぼうぎょ: 0,
  とくこう: 0, とくぼう: 0, すばやさ: 0,
};

/** デフォルトバトル条件 */
export const DEFAULT_BATTLE_CONDITION: BattleCondition = {
  weather: 'なし',
  field: 'なし',
  isReflect: false,
  isLightScreen: false,
  isCritical: false,
  isBurned: false,
  isDoubleBattle: false,
  isHelpingHand: false,
  attackerRankAtk: 0,
  attackerRankSpAtk: 0,
  defenderRankDef: 0,
  defenderRankSpDef: 0,
};
