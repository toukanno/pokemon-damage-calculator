import { Nature } from '@pokemon-calc/core';

export const NATURES: Nature[] = [
  { id: 'hardy', name: 'がんばりや' },
  { id: 'lonely', name: 'さみしがり', plus: 'こうげき', minus: 'ぼうぎょ' },
  { id: 'brave', name: 'ゆうかん', plus: 'こうげき', minus: 'すばやさ' },
  { id: 'adamant', name: 'いじっぱり', plus: 'こうげき', minus: 'とくこう' },
  { id: 'naughty', name: 'やんちゃ', plus: 'こうげき', minus: 'とくぼう' },
  { id: 'bold', name: 'ずぶとい', plus: 'ぼうぎょ', minus: 'こうげき' },
  { id: 'docile', name: 'すなお' },
  { id: 'relaxed', name: 'のんき', plus: 'ぼうぎょ', minus: 'すばやさ' },
  { id: 'impish', name: 'わんぱく', plus: 'ぼうぎょ', minus: 'とくこう' },
  { id: 'lax', name: 'のうてんき', plus: 'ぼうぎょ', minus: 'とくぼう' },
  { id: 'timid', name: 'おくびょう', plus: 'すばやさ', minus: 'こうげき' },
  { id: 'hasty', name: 'せっかち', plus: 'すばやさ', minus: 'ぼうぎょ' },
  { id: 'serious', name: 'まじめ' },
  { id: 'jolly', name: 'ようき', plus: 'すばやさ', minus: 'とくこう' },
  { id: 'naive', name: 'むじゃき', plus: 'すばやさ', minus: 'とくぼう' },
  { id: 'modest', name: 'ひかえめ', plus: 'とくこう', minus: 'こうげき' },
  { id: 'mild', name: 'おっとり', plus: 'とくこう', minus: 'ぼうぎょ' },
  { id: 'quiet', name: 'れいせい', plus: 'とくこう', minus: 'すばやさ' },
  { id: 'bashful', name: 'てれや' },
  { id: 'rash', name: 'うっかりや', plus: 'とくこう', minus: 'とくぼう' },
  { id: 'calm', name: 'おだやか', plus: 'とくぼう', minus: 'こうげき' },
  { id: 'gentle', name: 'おとなしい', plus: 'とくぼう', minus: 'ぼうぎょ' },
  { id: 'sassy', name: 'なまいき', plus: 'とくぼう', minus: 'すばやさ' },
  { id: 'careful', name: 'しんちょう', plus: 'とくぼう', minus: 'とくこう' },
  { id: 'quirky', name: 'きまぐれ' },
];

export function getNatureByName(name: string): Nature | undefined {
  return NATURES.find(n => n.name === name);
}

export function getNatureById(id: string): Nature | undefined {
  return NATURES.find(n => n.id === id);
}
