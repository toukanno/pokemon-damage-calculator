import { ItemData } from '@pokemon-calc/core';

export const ITEM_LIST: ItemData[] = [
  { id: 'none', name: 'なし' },
  { id: 'life-orb', name: 'いのちのたま', effect: 'ダメージ1.3倍、攻撃時HP1/10減少' },
  { id: 'choice-band', name: 'こだわりハチマキ', effect: '攻撃1.5倍、同じ技しか出せない' },
  { id: 'choice-specs', name: 'こだわりメガネ', effect: '特攻1.5倍、同じ技しか出せない' },
  { id: 'choice-scarf', name: 'こだわりスカーフ', effect: '素早さ1.5倍、同じ技しか出せない' },
  { id: 'expert-belt', name: 'たつじんのおび', effect: '効果抜群の技のダメージ1.2倍' },
  { id: 'leftovers', name: 'たべのこし', effect: '毎ターンHP1/16回復' },
  { id: 'assault-vest', name: 'とつげきチョッキ', effect: '特防1.5倍、変化技使用不可' },
  { id: 'focus-sash', name: 'きあいのタスキ', effect: 'HP満タン時、一撃で倒されない' },
  { id: 'rocky-helmet', name: 'ゴツゴツメット', effect: '接触技を受けた時相手にHP1/6ダメージ' },
  { id: 'eviolite', name: 'しんかのきせき', effect: '進化前ポケモンの防御・特防1.5倍' },
  { id: 'heavy-duty-boots', name: 'あつぞこブーツ', effect: '設置技の影響を受けない' },
  { id: 'clear-amulet', name: 'クリアチャーム', effect: '能力ランクを下げられない' },
  { id: 'loaded-dice', name: 'いかさまダイス', effect: '連続技が4～5回当たる' },
  { id: 'booster-energy', name: 'ブーストエナジー', effect: 'こだいかっせい/クォークチャージ発動' },
];

export function getItemByName(name: string): ItemData | undefined {
  return ITEM_LIST.find(i => i.name === name);
}

export function searchItems(query: string): ItemData[] {
  if (!query) return ITEM_LIST;
  const q = query.toLowerCase();
  return ITEM_LIST.filter(i => i.name.toLowerCase().includes(q));
}
