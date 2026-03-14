'use client';

import { useState, useMemo } from 'react';
import { PokemonBuild, PokemonType, StatKey } from '@/core/types';
import { POKEMON } from '@/data/pokemon';
import { NATURES } from '@/data/natures';
import { ABILITIES } from '@/data/abilities';
import { ITEMS } from '@/data/items';
import { calcAllStats } from '@/core/stats';

const STAT_LABELS: Record<StatKey, string> = {
  hp: 'HP', atk: 'こうげき', def: 'ぼうぎょ',
  spa: 'とくこう', spd: 'とくぼう', spe: 'すばやさ',
};

const STAT_KEYS: StatKey[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

const ALL_TYPES: PokemonType[] = [
  'ノーマル', 'ほのお', 'みず', 'でんき', 'くさ', 'こおり',
  'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし',
  'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー',
];

interface Props {
  label: string;
  build: PokemonBuild;
  onChange: (build: PokemonBuild) => void;
}

export default function PokemonSelector({ label, build, onChange }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const selectedPokemon = POKEMON.find(p => p.id === build.pokemonId);

  const filteredPokemon = useMemo(() => {
    if (!searchQuery) return POKEMON;
    const q = searchQuery.toLowerCase();
    return POKEMON.filter(p =>
      p.name.includes(searchQuery) ||
      p.nameEn.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const actualStats = useMemo(() => {
    if (!selectedPokemon) return null;
    return calcAllStats(selectedPokemon.baseStats, build.ivs, build.evs, build.level, build.nature);
  }, [selectedPokemon, build.ivs, build.evs, build.level, build.nature]);

  const totalEvs = STAT_KEYS.reduce((sum, key) => sum + build.evs[key], 0);

  const update = (partial: Partial<PokemonBuild>) => {
    onChange({ ...build, ...partial });
  };

  const updateIv = (key: StatKey, value: number) => {
    update({ ivs: { ...build.ivs, [key]: Math.min(31, Math.max(0, value)) } });
  };

  const updateEv = (key: StatKey, value: number) => {
    const clamped = Math.min(252, Math.max(0, value));
    const newEvs = { ...build.evs, [key]: clamped };
    const newTotal = STAT_KEYS.reduce((sum, k) => sum + newEvs[k], 0);
    if (newTotal <= 510) {
      update({ evs: newEvs });
    }
  };

  return (
    <div className="card space-y-3">
      <h2 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">
        {label}
      </h2>

      {/* ポケモン選択 */}
      <div className="relative">
        <label className="label">ポケモン</label>
        <button
          className="input-field text-left flex items-center justify-between"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <span>
            {selectedPokemon ? (
              <>
                {selectedPokemon.name}
                <span className="text-slate-400 ml-1 text-xs">
                  {selectedPokemon.types.map(t => t).join('/')}
                </span>
              </>
            ) : 'ポケモンを選択'}
          </span>
          <span className="text-slate-400 text-xs">▼</span>
        </button>

        {isSearchOpen && (
          <div className="absolute z-40 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-auto">
            <div className="sticky top-0 bg-white p-2 border-b">
              <input
                type="text"
                className="input-field"
                placeholder="名前で検索..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            {filteredPokemon.map(p => (
              <button
                key={p.id}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm flex justify-between items-center"
                onClick={() => {
                  update({
                    pokemonId: p.id,
                    abilityId: p.abilities[0] || 'none',
                  });
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
              >
                <span className="font-medium">{p.name}</span>
                <span className="flex gap-1">
                  {p.types.map(t => (
                    <span key={t} className={`type-badge type-${t}`}>{t}</span>
                  ))}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* レベル */}
      <div>
        <label className="label">レベル</label>
        <input
          type="number"
          className="stat-input"
          value={build.level}
          min={1}
          max={100}
          onChange={e => update({ level: Number(e.target.value) || 50 })}
        />
      </div>

      {/* 性格 */}
      <div>
        <label className="label">性格</label>
        <select
          className="select-field"
          value={build.nature}
          onChange={e => update({ nature: e.target.value })}
        >
          {NATURES.map(n => (
            <option key={n.id} value={n.id}>
              {n.name}
              {n.plus ? ` (+${STAT_LABELS[n.plus]} -${STAT_LABELS[n.minus!]})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* ステータス表 */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="label mb-0">ステータス</label>
          <span className={`text-xs ${totalEvs > 510 ? 'text-red-500' : 'text-slate-400'}`}>
            努力値合計: {totalEvs}/510
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400">
                <th className="text-left py-1 w-16">能力</th>
                <th className="py-1 w-12">種族値</th>
                <th className="py-1 w-14">個体値</th>
                <th className="py-1 w-14">努力値</th>
                <th className="py-1 w-12">実数値</th>
              </tr>
            </thead>
            <tbody>
              {STAT_KEYS.map(key => (
                <tr key={key} className="border-t border-slate-50">
                  <td className="py-1 font-medium text-slate-600">{STAT_LABELS[key]}</td>
                  <td className="py-1 text-center text-slate-500">
                    {selectedPokemon?.baseStats[key] ?? '-'}
                  </td>
                  <td className="py-1 text-center">
                    <input
                      type="number"
                      className="stat-input w-12"
                      value={build.ivs[key]}
                      min={0}
                      max={31}
                      onChange={e => updateIv(key, Number(e.target.value))}
                    />
                  </td>
                  <td className="py-1 text-center">
                    <input
                      type="number"
                      className="stat-input w-14"
                      value={build.evs[key]}
                      min={0}
                      max={252}
                      step={4}
                      onChange={e => updateEv(key, Number(e.target.value))}
                    />
                  </td>
                  <td className="py-1 text-center font-bold text-slate-700">
                    {actualStats?.[key] ?? '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="text-xs text-blue-500 hover:text-blue-700"
            onClick={() => update({ evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })}
          >
            努力値リセット
          </button>
          <button
            className="text-xs text-blue-500 hover:text-blue-700"
            onClick={() => update({ ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 } })}
          >
            個体値MAX
          </button>
        </div>
      </div>

      {/* 特性 */}
      <div>
        <label className="label">特性</label>
        <select
          className="select-field"
          value={build.abilityId}
          onChange={e => update({ abilityId: e.target.value })}
        >
          <option value="none">なし</option>
          {ABILITIES.filter(a => a.id !== 'none').map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      {/* 持ち物 */}
      <div>
        <label className="label">持ち物</label>
        <select
          className="select-field"
          value={build.itemId}
          onChange={e => update({ itemId: e.target.value })}
        >
          {ITEMS.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* テラスタイプ */}
      <div>
        <label className="label">テラスタイプ</label>
        <select
          className="select-field"
          value={build.teraType || ''}
          onChange={e => update({ teraType: (e.target.value || null) as PokemonType | null })}
        >
          <option value="">なし</option>
          {ALL_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
