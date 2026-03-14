/** ポケモンのタイプ */
export type PokemonType =
  | 'ノーマル' | 'ほのお' | 'みず' | 'でんき' | 'くさ'
  | 'こおり' | 'かくとう' | 'どく' | 'じめん' | 'ひこう'
  | 'エスパー' | 'むし' | 'いわ' | 'ゴースト' | 'ドラゴン'
  | 'あく' | 'はがね' | 'フェアリー';

/** 技の分類 */
export type MoveCategory = 'ぶつり' | 'とくしゅ' | 'へんか';

/** 性格 */
export interface Nature {
  id: string;
  name: string;
  plus?: StatKey;
  minus?: StatKey;
}

/** ステータスキー */
export type StatKey = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';

/** 6ステータス */
export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

/** ポケモンマスタデータ */
export interface PokemonData {
  id: string;
  name: string;
  nameEn: string;
  types: PokemonType[];
  baseStats: Stats;
  abilities: string[];
  weight: number;
}

/** 技マスタデータ */
export interface MoveData {
  id: string;
  name: string;
  nameEn: string;
  type: PokemonType;
  category: MoveCategory;
  power: number | null;
  accuracy: number | null;
  pp: number;
  /** 接触技かどうか */
  contact: boolean;
  /** 特殊な効果フラグ */
  flags?: string[];
}

/** 特性マスタデータ */
export interface AbilityData {
  id: string;
  name: string;
  nameEn: string;
}

/** 持ち物マスタデータ */
export interface ItemData {
  id: string;
  name: string;
  nameEn: string;
}

/** 天候 */
export type Weather = 'none' | 'sun' | 'rain' | 'sand' | 'snow' | 'hail';

/** フィールド */
export type Terrain = 'none' | 'electric' | 'grassy' | 'misty' | 'psychic';

/** ポケモンのビルド（育成型） */
export interface PokemonBuild {
  pokemonId: string;
  level: number;
  nature: string;
  ivs: Stats;
  evs: Stats;
  abilityId: string;
  itemId: string;
  teraType: PokemonType | null;
  moves: string[];
}

/** バトル条件 */
export interface BattleCondition {
  weather: Weather;
  terrain: Terrain;
  isReflect: boolean;
  isLightScreen: boolean;
  isHelpingHand: boolean;
  isCritical: boolean;
  isBurned: boolean;
  isDoubleBattle: boolean;
  attackerRank: number;
  defenderRank: number;
  isTerastallized: boolean;
}

/** ダメージ計算リクエスト */
export interface DamageCalcRequest {
  attacker: PokemonBuild;
  defender: PokemonBuild;
  moveId: string;
  condition: BattleCondition;
}

/** ダメージ計算結果 */
export interface DamageCalcResult {
  damages: number[];
  minDamage: number;
  maxDamage: number;
  defenderMaxHp: number;
  minPercent: number;
  maxPercent: number;
  koChance: KoChance;
}

/** 確定数 */
export interface KoChance {
  hits: number;
  chance: number;
  text: string;
}
