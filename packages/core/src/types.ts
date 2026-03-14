/** ポケモンのタイプ */
export type PokemonType =
  | 'ノーマル' | 'ほのお' | 'みず' | 'でんき' | 'くさ'
  | 'こおり' | 'かくとう' | 'どく' | 'じめん' | 'ひこう'
  | 'エスパー' | 'むし' | 'いわ' | 'ゴースト' | 'ドラゴン'
  | 'あく' | 'はがね' | 'フェアリー';

/** 技の分類 */
export type MoveCategory = 'ぶつり' | 'とくしゅ' | 'へんか';

/** 性格による補正対象 */
export type StatName = 'HP' | 'こうげき' | 'ぼうぎょ' | 'とくこう' | 'とくぼう' | 'すばやさ';

/** 天候 */
export type Weather = 'なし' | 'はれ' | 'あめ' | 'すなあらし' | 'ゆき';

/** フィールド */
export type Field = 'なし' | 'エレキフィールド' | 'グラスフィールド' | 'サイコフィールド' | 'ミストフィールド';

/** 性格データ */
export interface Nature {
  id: string;
  name: string;
  plus?: StatName;  // 上昇補正
  minus?: StatName; // 下降補正
}

/** 個体値・努力値 */
export interface StatValues {
  HP: number;
  こうげき: number;
  ぼうぎょ: number;
  とくこう: number;
  とくぼう: number;
  すばやさ: number;
}

/** ポケモンの種族値 */
export interface BaseStats {
  HP: number;
  こうげき: number;
  ぼうぎょ: number;
  とくこう: number;
  とくぼう: number;
  すばやさ: number;
}

/** ポケモンマスタデータ */
export interface PokemonData {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: BaseStats;
  abilities: string[];
  weight: number; // kg
}

/** 技マスタデータ */
export interface MoveData {
  id: number;
  name: string;
  type: PokemonType;
  category: MoveCategory;
  power: number | null; // へんか技はnull
  accuracy: number | null;
  pp: number;
  description?: string;
  flags?: string[]; // 特殊フラグ（接触、音技など）
}

/** 持ち物データ */
export interface ItemData {
  id: string;
  name: string;
  effect?: string;
}

/** 特性データ */
export interface AbilityData {
  id: string;
  name: string;
  effect?: string;
}

/** ポケモンのビルド（育成済み個体） */
export interface PokemonBuild {
  pokemon: PokemonData;
  level: number;
  nature: Nature;
  ivs: StatValues;
  evs: StatValues;
  ability: string;
  item: string;
  teraType: PokemonType | null;
  moves: MoveData[];
}

/** バトル条件 */
export interface BattleCondition {
  weather: Weather;
  field: Field;
  isReflect: boolean;      // リフレクター
  isLightScreen: boolean;   // ひかりのかべ
  isCritical: boolean;      // 急所
  isBurned: boolean;        // やけど（攻撃側）
  isDoubleBattle: boolean;  // ダブルバトル
  isHelpingHand: boolean;   // てだすけ
  attackerRankAtk: number;  // 攻撃ランク (-6~+6)
  attackerRankSpAtk: number;
  defenderRankDef: number;
  defenderRankSpDef: number;
}

/** ダメージ計算リクエスト */
export interface DamageCalcRequest {
  attacker: PokemonBuild;
  defender: PokemonBuild;
  move: MoveData;
  condition: BattleCondition;
}

/** ダメージ計算結果 */
export interface DamageCalcResult {
  damages: number[];        // 乱数16パターン
  minDamage: number;
  maxDamage: number;
  defenderHP: number;
  minPercent: number;        // 最小ダメージ割合
  maxPercent: number;        // 最大ダメージ割合
  guaranteedKO: number | null; // 確定n発 (nullなら確定では落ちない)
  chanceToKO: number | null;  // 乱数n発の確率
  koDescription: string;     // 確定数の日本語表現
}
