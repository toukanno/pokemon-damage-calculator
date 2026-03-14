import { MoveData } from '@pokemon-calc/core';

/** 対戦でよく使われる技を中心に収録 */
export const MOVE_LIST: MoveData[] = [
  // 物理技
  { id: 1, name: 'じしん', type: 'じめん', category: 'ぶつり', power: 100, accuracy: 100, pp: 10 },
  { id: 2, name: 'げきりん', type: 'ドラゴン', category: 'ぶつり', power: 120, accuracy: 100, pp: 10 },
  { id: 3, name: 'アイアンヘッド', type: 'はがね', category: 'ぶつり', power: 80, accuracy: 100, pp: 15 },
  { id: 4, name: 'がんせきふうじ', type: 'いわ', category: 'ぶつり', power: 60, accuracy: 95, pp: 15 },
  { id: 5, name: 'つるぎのまい', type: 'ノーマル', category: 'へんか', power: null, accuracy: null, pp: 20 },
  { id: 6, name: 'じゃれつく', type: 'フェアリー', category: 'ぶつり', power: 90, accuracy: 90, pp: 10 },
  { id: 7, name: 'かげうち', type: 'ゴースト', category: 'ぶつり', power: 40, accuracy: 100, pp: 30 },
  { id: 8, name: 'ドラゴンアロー', type: 'ドラゴン', category: 'ぶつり', power: 50, accuracy: 100, pp: 10 },
  { id: 9, name: 'ゴーストダイブ', type: 'ゴースト', category: 'ぶつり', power: 90, accuracy: 100, pp: 10 },
  { id: 10, name: 'インファイト', type: 'かくとう', category: 'ぶつり', power: 120, accuracy: 100, pp: 5 },
  { id: 11, name: 'アクアジェット', type: 'みず', category: 'ぶつり', power: 40, accuracy: 100, pp: 20 },
  { id: 12, name: 'すいりゅうれんだ', type: 'みず', category: 'ぶつり', power: 25, accuracy: 100, pp: 5 },
  { id: 13, name: 'こおりのつぶて', type: 'こおり', category: 'ぶつり', power: 40, accuracy: 100, pp: 30 },
  { id: 14, name: 'ふいうち', type: 'あく', category: 'ぶつり', power: 70, accuracy: 100, pp: 5 },
  { id: 15, name: 'せいなるつるぎ', type: 'かくとう', category: 'ぶつり', power: 90, accuracy: 100, pp: 15 },
  { id: 16, name: 'アイススピナー', type: 'こおり', category: 'ぶつり', power: 80, accuracy: 100, pp: 15 },
  { id: 17, name: 'しんそく', type: 'ノーマル', category: 'ぶつり', power: 80, accuracy: 100, pp: 5 },
  { id: 18, name: 'シザークロス', type: 'むし', category: 'ぶつり', power: 80, accuracy: 100, pp: 15 },
  { id: 19, name: 'バレットパンチ', type: 'はがね', category: 'ぶつり', power: 40, accuracy: 100, pp: 30 },
  { id: 20, name: 'ストーンエッジ', type: 'いわ', category: 'ぶつり', power: 100, accuracy: 80, pp: 5 },
  { id: 21, name: 'フレアドライブ', type: 'ほのお', category: 'ぶつり', power: 120, accuracy: 100, pp: 15 },
  { id: 22, name: 'たきのぼり', type: 'みず', category: 'ぶつり', power: 80, accuracy: 100, pp: 15 },
  { id: 23, name: 'アクアブレイク', type: 'みず', category: 'ぶつり', power: 85, accuracy: 100, pp: 10 },
  { id: 24, name: 'かみくだく', type: 'あく', category: 'ぶつり', power: 80, accuracy: 100, pp: 15 },
  { id: 25, name: 'ツタこんぼう', type: 'くさ', category: 'ぶつり', power: 100, accuracy: 100, pp: 10 },
  { id: 26, name: 'テラバースト', type: 'ノーマル', category: 'ぶつり', power: 80, accuracy: 100, pp: 10 },
  { id: 27, name: 'マッハパンチ', type: 'かくとう', category: 'ぶつり', power: 40, accuracy: 100, pp: 30 },
  { id: 28, name: 'タネマシンガン', type: 'くさ', category: 'ぶつり', power: 25, accuracy: 100, pp: 30 },
  { id: 29, name: 'アクアテール', type: 'みず', category: 'ぶつり', power: 90, accuracy: 90, pp: 10 },
  { id: 30, name: 'じだんだ', type: 'じめん', category: 'ぶつり', power: 75, accuracy: 100, pp: 10 },

  // 特殊技
  { id: 101, name: 'ゴールドラッシュ', type: 'はがね', category: 'とくしゅ', power: 120, accuracy: 100, pp: 5 },
  { id: 102, name: 'シャドーボール', type: 'ゴースト', category: 'とくしゅ', power: 80, accuracy: 100, pp: 15 },
  { id: 103, name: 'ムーンフォース', type: 'フェアリー', category: 'とくしゅ', power: 95, accuracy: 100, pp: 15 },
  { id: 104, name: 'りゅうせいぐん', type: 'ドラゴン', category: 'とくしゅ', power: 130, accuracy: 90, pp: 5 },
  { id: 105, name: 'あくのはどう', type: 'あく', category: 'とくしゅ', power: 80, accuracy: 100, pp: 15 },
  { id: 106, name: 'かえんほうしゃ', type: 'ほのお', category: 'とくしゅ', power: 90, accuracy: 100, pp: 15 },
  { id: 107, name: 'だいもんじ', type: 'ほのお', category: 'とくしゅ', power: 110, accuracy: 85, pp: 5 },
  { id: 108, name: 'オーバーヒート', type: 'ほのお', category: 'とくしゅ', power: 130, accuracy: 90, pp: 5 },
  { id: 109, name: 'ハイドロポンプ', type: 'みず', category: 'とくしゅ', power: 110, accuracy: 80, pp: 5 },
  { id: 110, name: 'なみのり', type: 'みず', category: 'とくしゅ', power: 90, accuracy: 100, pp: 15 },
  { id: 111, name: '10まんボルト', type: 'でんき', category: 'とくしゅ', power: 90, accuracy: 100, pp: 15 },
  { id: 112, name: 'ボルトチェンジ', type: 'でんき', category: 'とくしゅ', power: 70, accuracy: 100, pp: 20 },
  { id: 113, name: 'エナジーボール', type: 'くさ', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10 },
  { id: 114, name: 'れいとうビーム', type: 'こおり', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10 },
  { id: 115, name: 'ふぶき', type: 'こおり', category: 'とくしゅ', power: 110, accuracy: 70, pp: 5 },
  { id: 116, name: 'サイコキネシス', type: 'エスパー', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10 },
  { id: 117, name: 'きあいだま', type: 'かくとう', category: 'とくしゅ', power: 120, accuracy: 70, pp: 5 },
  { id: 118, name: 'ラスターカノン', type: 'はがね', category: 'とくしゅ', power: 80, accuracy: 100, pp: 10 },
  { id: 119, name: 'りゅうのはどう', type: 'ドラゴン', category: 'とくしゅ', power: 85, accuracy: 100, pp: 10 },
  { id: 120, name: 'ヘドロばくだん', type: 'どく', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10 },
  { id: 121, name: 'エアスラッシュ', type: 'ひこう', category: 'とくしゅ', power: 75, accuracy: 95, pp: 15 },
  { id: 122, name: 'だいちのちから', type: 'じめん', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10 },
  { id: 123, name: 'マジカルシャイン', type: 'フェアリー', category: 'とくしゅ', power: 80, accuracy: 100, pp: 10 },
  { id: 124, name: 'ぼうふう', type: 'ひこう', category: 'とくしゅ', power: 110, accuracy: 70, pp: 10 },
  { id: 125, name: 'じんらい', type: 'でんき', category: 'とくしゅ', power: 70, accuracy: 100, pp: 5 },
  { id: 126, name: 'ブラッドムーン', type: 'ノーマル', category: 'とくしゅ', power: 140, accuracy: 100, pp: 5 },

  // 変化技（計算対象外だが選択肢として必要）
  { id: 201, name: 'ステルスロック', type: 'いわ', category: 'へんか', power: null, accuracy: null, pp: 20 },
  { id: 202, name: 'でんじは', type: 'でんき', category: 'へんか', power: null, accuracy: 90, pp: 20 },
  { id: 203, name: 'おにび', type: 'ほのお', category: 'へんか', power: null, accuracy: 85, pp: 15 },
  { id: 204, name: 'キノコのほうし', type: 'くさ', category: 'へんか', power: null, accuracy: 100, pp: 15 },
  { id: 205, name: 'りゅうのまい', type: 'ドラゴン', category: 'へんか', power: null, accuracy: null, pp: 20 },
];

export function getMoveByName(name: string): MoveData | undefined {
  return MOVE_LIST.find(m => m.name === name);
}

export function getMoveById(id: number): MoveData | undefined {
  return MOVE_LIST.find(m => m.id === id);
}

export function searchMoves(query: string): MoveData[] {
  if (!query) return MOVE_LIST.filter(m => m.category !== 'へんか');
  const q = query.toLowerCase();
  return MOVE_LIST.filter(m => m.name.toLowerCase().includes(q));
}

export function getAttackMoves(): MoveData[] {
  return MOVE_LIST.filter(m => m.category !== 'へんか');
}
