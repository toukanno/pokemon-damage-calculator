import { PokemonData } from '@pokemon-calc/core';

/** SV対戦で使用率の高いポケモンを中心に収録 */
export const POKEMON_LIST: PokemonData[] = [
  {
    id: 1, name: 'ガブリアス', types: ['ドラゴン', 'じめん'],
    baseStats: { HP: 108, こうげき: 130, ぼうぎょ: 95, とくこう: 80, とくぼう: 85, すばやさ: 102 },
    abilities: ['すながくれ', 'さめはだ'], weight: 95.0,
  },
  {
    id: 2, name: 'ミミッキュ', types: ['ゴースト', 'フェアリー'],
    baseStats: { HP: 55, こうげき: 90, ぼうぎょ: 80, とくこう: 50, とくぼう: 105, すばやさ: 96 },
    abilities: ['ばけのかわ'], weight: 0.7,
  },
  {
    id: 3, name: 'ドラパルト', types: ['ドラゴン', 'ゴースト'],
    baseStats: { HP: 88, こうげき: 120, ぼうぎょ: 75, とくこう: 100, とくぼう: 75, すばやさ: 142 },
    abilities: ['クリアボディ', 'すりぬけ', 'のろわれボディ'], weight: 50.0,
  },
  {
    id: 4, name: 'サーフゴー', types: ['はがね', 'ゴースト'],
    baseStats: { HP: 87, こうげき: 60, ぼうぎょ: 95, とくこう: 133, とくぼう: 91, すばやさ: 84 },
    abilities: ['おうごんのからだ'], weight: 30.0,
  },
  {
    id: 5, name: 'カイリュー', types: ['ドラゴン', 'ひこう'],
    baseStats: { HP: 91, こうげき: 134, ぼうぎょ: 95, とくこう: 100, とくぼう: 100, すばやさ: 80 },
    abilities: ['せいしんりょく', 'マルチスケイル'], weight: 210.0,
  },
  {
    id: 6, name: 'ハバタクカミ', types: ['ゴースト', 'フェアリー'],
    baseStats: { HP: 55, こうげき: 55, ぼうぎょ: 55, とくこう: 135, とくぼう: 135, すばやさ: 135 },
    abilities: ['こだいかっせい'], weight: 4.0,
  },
  {
    id: 7, name: 'パオジアン', types: ['あく', 'こおり'],
    baseStats: { HP: 80, こうげき: 120, ぼうぎょ: 80, とくこう: 65, とくぼう: 65, すばやさ: 135 },
    abilities: ['わざわいのつるぎ'], weight: 72.0,
  },
  {
    id: 8, name: 'ウーラオス（れんげき）', types: ['かくとう', 'みず'],
    baseStats: { HP: 100, こうげき: 130, ぼうぎょ: 100, とくこう: 63, とくぼう: 60, すばやさ: 97 },
    abilities: ['ふかしのこぶし'], weight: 105.0,
  },
  {
    id: 9, name: 'ランドロス（霊獣）', types: ['じめん', 'ひこう'],
    baseStats: { HP: 89, こうげき: 145, ぼうぎょ: 90, とくこう: 105, とくぼう: 80, すばやさ: 91 },
    abilities: ['いかく'], weight: 68.0,
  },
  {
    id: 10, name: 'ヒードラン', types: ['ほのお', 'はがね'],
    baseStats: { HP: 91, こうげき: 90, ぼうぎょ: 106, とくこう: 130, とくぼう: 106, すばやさ: 77 },
    abilities: ['もらいび', 'ほのおのからだ'], weight: 430.0,
  },
  {
    id: 11, name: 'キョジオーン', types: ['いわ'],
    baseStats: { HP: 100, こうげき: 100, ぼうぎょ: 130, とくこう: 45, とくぼう: 90, すばやさ: 35 },
    abilities: ['きよめのしお', 'がんじょう', 'クリアボディ'], weight: 230.0,
  },
  {
    id: 12, name: 'テツノツツミ', types: ['こおり', 'みず'],
    baseStats: { HP: 56, こうげき: 80, ぼうぎょ: 114, とくこう: 124, とくぼう: 60, すばやさ: 136 },
    abilities: ['クォークチャージ'], weight: 120.0,
  },
  {
    id: 13, name: 'ハッサム', types: ['むし', 'はがね'],
    baseStats: { HP: 70, こうげき: 130, ぼうぎょ: 100, とくこう: 55, とくぼう: 80, すばやさ: 65 },
    abilities: ['むしのしらせ', 'テクニシャン', 'ライトメタル'], weight: 118.0,
  },
  {
    id: 14, name: 'キノガッサ', types: ['くさ', 'かくとう'],
    baseStats: { HP: 60, こうげき: 130, ぼうぎょ: 80, とくこう: 60, とくぼう: 60, すばやさ: 70 },
    abilities: ['ほうし', 'ポイズンヒール', 'テクニシャン'], weight: 39.2,
  },
  {
    id: 15, name: 'ウォッシュロトム', types: ['でんき', 'みず'],
    baseStats: { HP: 50, こうげき: 65, ぼうぎょ: 107, とくこう: 105, とくぼう: 107, すばやさ: 86 },
    abilities: ['ふゆう'], weight: 0.3,
  },
  {
    id: 16, name: 'サザンドラ', types: ['あく', 'ドラゴン'],
    baseStats: { HP: 92, こうげき: 105, ぼうぎょ: 90, とくこう: 125, とくぼう: 90, すばやさ: 98 },
    abilities: ['ふゆう'], weight: 160.0,
  },
  {
    id: 17, name: 'ドオー', types: ['どく', 'じめん'],
    baseStats: { HP: 130, こうげき: 75, ぼうぎょ: 60, とくこう: 45, とくぼう: 100, すばやさ: 20 },
    abilities: ['どくのトゲ', 'ちょすい', 'てんねん'], weight: 223.0,
  },
  {
    id: 18, name: 'ヘイラッシャ', types: ['みず'],
    baseStats: { HP: 150, こうげき: 100, ぼうぎょ: 115, とくこう: 65, とくぼう: 65, すばやさ: 35 },
    abilities: ['てんねん', 'どんかん'], weight: 220.0,
  },
  {
    id: 19, name: 'イーユイ', types: ['ほのお', 'あく'],
    baseStats: { HP: 55, こうげき: 80, ぼうぎょ: 80, とくこう: 135, とくぼう: 120, すばやさ: 100 },
    abilities: ['わざわいのたま'], weight: 4.9,
  },
  {
    id: 20, name: 'テツノカイナ', types: ['かくとう', 'でんき'],
    baseStats: { HP: 154, こうげき: 140, ぼうぎょ: 108, とくこう: 50, とくぼう: 68, すばやさ: 50 },
    abilities: ['クォークチャージ'], weight: 380.0,
  },
  {
    id: 21, name: 'オーガポン', types: ['くさ'],
    baseStats: { HP: 80, こうげき: 120, ぼうぎょ: 84, とくこう: 60, とくぼう: 96, すばやさ: 110 },
    abilities: ['まけんき'], weight: 39.8,
  },
  {
    id: 22, name: 'ブリジュラス', types: ['はがね', 'ドラゴン'],
    baseStats: { HP: 90, こうげき: 105, ぼうぎょ: 130, とくこう: 125, とくぼう: 65, すばやさ: 85 },
    abilities: ['じきゅうりょく', 'がんじょう', 'すじがねいり'], weight: 60.0,
  },
  {
    id: 23, name: 'タケルライコ', types: ['でんき', 'ドラゴン'],
    baseStats: { HP: 125, こうげき: 73, ぼうぎょ: 91, とくこう: 137, とくぼう: 89, すばやさ: 85 },
    abilities: ['こだいかっせい'], weight: 380.0,
  },
  {
    id: 24, name: 'ガチグマ（アカツキ）', types: ['じめん', 'ノーマル'],
    baseStats: { HP: 113, こうげき: 70, ぼうぎょ: 120, とくこう: 135, とくぼう: 65, すばやさ: 52 },
    abilities: ['しんがん'], weight: 303.0,
  },
  {
    id: 25, name: 'ピカチュウ', types: ['でんき'],
    baseStats: { HP: 35, こうげき: 55, ぼうぎょ: 40, とくこう: 50, とくぼう: 50, すばやさ: 90 },
    abilities: ['せいでんき', 'ひらいしん'], weight: 6.0,
  },
  {
    id: 26, name: 'リザードン', types: ['ほのお', 'ひこう'],
    baseStats: { HP: 78, こうげき: 84, ぼうぎょ: 78, とくこう: 109, とくぼう: 85, すばやさ: 100 },
    abilities: ['もうか', 'サンパワー'], weight: 90.5,
  },
  {
    id: 27, name: 'ゲンガー', types: ['ゴースト', 'どく'],
    baseStats: { HP: 60, こうげき: 65, ぼうぎょ: 60, とくこう: 130, とくぼう: 75, すばやさ: 110 },
    abilities: ['のろわれボディ'], weight: 40.5,
  },
  {
    id: 28, name: 'ギャラドス', types: ['みず', 'ひこう'],
    baseStats: { HP: 95, こうげき: 125, ぼうぎょ: 79, とくこう: 60, とくぼう: 100, すばやさ: 81 },
    abilities: ['いかく', 'じしんかじょう'], weight: 235.0,
  },
  {
    id: 29, name: 'マリルリ', types: ['みず', 'フェアリー'],
    baseStats: { HP: 100, こうげき: 50, ぼうぎょ: 80, とくこう: 60, とくぼう: 80, すばやさ: 50 },
    abilities: ['あついしぼう', 'ちからもち', 'そうしょく'], weight: 28.5,
  },
  {
    id: 30, name: 'バンギラス', types: ['いわ', 'あく'],
    baseStats: { HP: 100, こうげき: 134, ぼうぎょ: 110, とくこう: 95, とくぼう: 100, すばやさ: 61 },
    abilities: ['すなおこし', 'きんちょうかん'], weight: 202.0,
  },
];

export function getPokemonByName(name: string): PokemonData | undefined {
  return POKEMON_LIST.find(p => p.name === name);
}

export function getPokemonById(id: number): PokemonData | undefined {
  return POKEMON_LIST.find(p => p.id === id);
}

export function searchPokemon(query: string): PokemonData[] {
  if (!query) return POKEMON_LIST;
  const q = query.toLowerCase();
  return POKEMON_LIST.filter(p => p.name.toLowerCase().includes(q));
}
