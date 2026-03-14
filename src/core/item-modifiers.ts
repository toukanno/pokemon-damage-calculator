import { MoveData, PokemonType } from './types';

/** 持ち物によるダメージ補正を返す */
export function getItemDamageModifier(
  itemId: string,
  move: MoveData,
  attackerTypes: PokemonType[],
  isSTAB: boolean,
  typeEffectiveness: number
): number {
  switch (itemId) {
    case 'inochinotama': // いのちのたま
      return 1.3;
    case 'kodawari_hachimaki': // こだわりハチマキ
      return move.category === 'ぶつり' ? 1.5 : 1.0;
    case 'kodawari_megane': // こだわりメガネ
      return move.category === 'とくしゅ' ? 1.5 : 1.0;
    case 'tatsujin_no_obi': // たつじんのおび
      return typeEffectiveness > 1 ? 1.2 : 1.0;
    case 'type_kyouka': // タイプ強化アイテム（各種プレート等）
      return 1.2;
    case 'tonbogaeri_plate': // こだわりスカーフ → 火力補正なし
      return 1.0;
    default:
      return getTypeBoostItem(itemId, move.type);
  }
}

/** タイプ強化持ち物の補正 */
function getTypeBoostItem(itemId: string, moveType: PokemonType): number {
  const typeItems: Record<string, PokemonType> = {
    'silk_scarf': 'ノーマル',
    'charcoal': 'ほのお',
    'mystic_water': 'みず',
    'magnet': 'でんき',
    'miracle_seed': 'くさ',
    'never_melt_ice': 'こおり',
    'black_belt': 'かくとう',
    'poison_barb': 'どく',
    'soft_sand': 'じめん',
    'sharp_beak': 'ひこう',
    'twisted_spoon': 'エスパー',
    'silver_powder': 'むし',
    'hard_stone': 'いわ',
    'spell_tag': 'ゴースト',
    'dragon_fang': 'ドラゴン',
    'black_glasses': 'あく',
    'metal_coat': 'はがね',
    'fairy_feather': 'フェアリー',
  };

  if (typeItems[itemId] === moveType) return 1.2;
  return 1.0;
}
