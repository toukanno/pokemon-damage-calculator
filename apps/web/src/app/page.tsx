'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  PokemonData,
  MoveData,
  PokemonBuild,
  BattleCondition,
  StatValues,
  Nature,
  DamageCalcResult,
  PokemonType,
} from '@pokemon-calc/core';
import { calculateDamage } from '@pokemon-calc/core';
import { DEFAULT_IVS, DEFAULT_EVS, DEFAULT_BATTLE_CONDITION } from '@pokemon-calc/core';
import { NATURES } from '@pokemon-calc/data';
import { ITEM_LIST } from '@pokemon-calc/data';
import PokemonSelector from '@/components/PokemonSelector';
import StatsInput from '@/components/StatsInput';
import MoveSelector from '@/components/MoveSelector';
import ConditionPanel from '@/components/ConditionPanel';
import DamageResult from '@/components/DamageResult';

const TYPES: PokemonType[] = [
  'ノーマル', 'ほのお', 'みず', 'でんき', 'くさ', 'こおり',
  'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし',
  'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー',
];

const defaultNature = NATURES.find(n => n.id === 'hardy')!;

interface SavedCalc {
  id: string;
  timestamp: number;
  attackerName: string;
  defenderName: string;
  moveName: string;
  koDescription: string;
  percent: string;
  state: CalcState;
}

interface CalcState {
  attackerPokemonId: number | null;
  defenderPokemonId: number | null;
  moveId: number | null;
  attackerNatureId: string;
  defenderNatureId: string;
  attackerIvs: StatValues;
  defenderIvs: StatValues;
  attackerEvs: StatValues;
  defenderEvs: StatValues;
  attackerLevel: number;
  defenderLevel: number;
  attackerItem: string;
  defenderItem: string;
  attackerAbility: string;
  defenderAbility: string;
  attackerTeraType: PokemonType | null;
  defenderTeraType: PokemonType | null;
  condition: BattleCondition;
}

export default function HomePage() {
  // Attacker state
  const [attackerPokemon, setAttackerPokemon] = useState<PokemonData | null>(null);
  const [attackerNature, setAttackerNature] = useState<Nature>(defaultNature);
  const [attackerIvs, setAttackerIvs] = useState<StatValues>({ ...DEFAULT_IVS });
  const [attackerEvs, setAttackerEvs] = useState<StatValues>({ ...DEFAULT_EVS });
  const [attackerLevel, setAttackerLevel] = useState(50);
  const [attackerItem, setAttackerItem] = useState('なし');
  const [attackerAbility, setAttackerAbility] = useState('');
  const [attackerTeraType, setAttackerTeraType] = useState<PokemonType | null>(null);

  // Defender state
  const [defenderPokemon, setDefenderPokemon] = useState<PokemonData | null>(null);
  const [defenderNature, setDefenderNature] = useState<Nature>(defaultNature);
  const [defenderIvs, setDefenderIvs] = useState<StatValues>({ ...DEFAULT_IVS });
  const [defenderEvs, setDefenderEvs] = useState<StatValues>({ ...DEFAULT_EVS });
  const [defenderLevel, setDefenderLevel] = useState(50);
  const [defenderItem, setDefenderItem] = useState('なし');
  const [defenderAbility, setDefenderAbility] = useState('');
  const [defenderTeraType, setDefenderTeraType] = useState<PokemonType | null>(null);

  // Move & condition
  const [move, setMove] = useState<MoveData | null>(null);
  const [condition, setCondition] = useState<BattleCondition>({ ...DEFAULT_BATTLE_CONDITION });

  // Result
  const [result, setResult] = useState<DamageCalcResult | null>(null);

  // Save/Share
  const [savedCalcs, setSavedCalcs] = useState<SavedCalc[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Load saved calcs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pokemon-calc-saved');
      if (saved) setSavedCalcs(JSON.parse(saved));
    } catch {}
  }, []);

  // Load from URL params
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const stateParam = params.get('s');
      if (stateParam) {
        const state: CalcState = JSON.parse(decodeURIComponent(atob(stateParam)));
        restoreState(state);
      }
    } catch {}
  }, []);

  // Set default ability when pokemon changes
  useEffect(() => {
    if (attackerPokemon?.abilities.length) {
      setAttackerAbility(attackerPokemon.abilities[0]);
    }
  }, [attackerPokemon]);

  useEffect(() => {
    if (defenderPokemon?.abilities.length) {
      setDefenderAbility(defenderPokemon.abilities[0]);
    }
  }, [defenderPokemon]);

  // Auto-calculate
  useEffect(() => {
    if (!attackerPokemon || !defenderPokemon || !move) {
      setResult(null);
      return;
    }

    const attacker: PokemonBuild = {
      pokemon: attackerPokemon,
      level: attackerLevel,
      nature: attackerNature,
      ivs: attackerIvs,
      evs: attackerEvs,
      ability: attackerAbility,
      item: attackerItem,
      teraType: attackerTeraType,
      moves: [move],
    };

    const defender: PokemonBuild = {
      pokemon: defenderPokemon,
      level: defenderLevel,
      nature: defenderNature,
      ivs: defenderIvs,
      evs: defenderEvs,
      ability: defenderAbility,
      item: defenderItem,
      teraType: defenderTeraType,
      moves: [],
    };

    const calcResult = calculateDamage({ attacker, defender, move, condition });
    setResult(calcResult);
  }, [
    attackerPokemon, attackerNature, attackerIvs, attackerEvs, attackerLevel,
    attackerItem, attackerAbility, attackerTeraType,
    defenderPokemon, defenderNature, defenderIvs, defenderEvs, defenderLevel,
    defenderItem, defenderAbility, defenderTeraType,
    move, condition,
  ]);

  const getCurrentState = useCallback((): CalcState => ({
    attackerPokemonId: attackerPokemon?.id ?? null,
    defenderPokemonId: defenderPokemon?.id ?? null,
    moveId: move?.id ?? null,
    attackerNatureId: attackerNature.id,
    defenderNatureId: defenderNature.id,
    attackerIvs, defenderIvs,
    attackerEvs, defenderEvs,
    attackerLevel, defenderLevel,
    attackerItem, defenderItem,
    attackerAbility, defenderAbility,
    attackerTeraType, defenderTeraType,
    condition,
  }), [
    attackerPokemon, defenderPokemon, move, attackerNature, defenderNature,
    attackerIvs, defenderIvs, attackerEvs, defenderEvs,
    attackerLevel, defenderLevel, attackerItem, defenderItem,
    attackerAbility, defenderAbility, attackerTeraType, defenderTeraType, condition,
  ]);

  const restoreState = (state: CalcState) => {
    const { POKEMON_LIST } = require('@pokemon-calc/data');
    const { MOVE_LIST } = require('@pokemon-calc/data');

    if (state.attackerPokemonId) {
      const p = POKEMON_LIST.find((p: PokemonData) => p.id === state.attackerPokemonId);
      if (p) setAttackerPokemon(p);
    }
    if (state.defenderPokemonId) {
      const p = POKEMON_LIST.find((p: PokemonData) => p.id === state.defenderPokemonId);
      if (p) setDefenderPokemon(p);
    }
    if (state.moveId) {
      const m = MOVE_LIST.find((m: MoveData) => m.id === state.moveId);
      if (m) setMove(m);
    }
    const aN = NATURES.find(n => n.id === state.attackerNatureId);
    if (aN) setAttackerNature(aN);
    const dN = NATURES.find(n => n.id === state.defenderNatureId);
    if (dN) setDefenderNature(dN);
    setAttackerIvs(state.attackerIvs);
    setDefenderIvs(state.defenderIvs);
    setAttackerEvs(state.attackerEvs);
    setDefenderEvs(state.defenderEvs);
    setAttackerLevel(state.attackerLevel);
    setDefenderLevel(state.defenderLevel);
    setAttackerItem(state.attackerItem);
    setDefenderItem(state.defenderItem);
    setAttackerAbility(state.attackerAbility);
    setDefenderAbility(state.defenderAbility);
    setAttackerTeraType(state.attackerTeraType);
    setDefenderTeraType(state.defenderTeraType);
    setCondition(state.condition);
  };

  const handleSave = () => {
    if (!result || !attackerPokemon || !defenderPokemon || !move) return;
    const saved: SavedCalc = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      attackerName: attackerPokemon.name,
      defenderName: defenderPokemon.name,
      moveName: move.name,
      koDescription: result.koDescription,
      percent: `${result.minPercent}%~${result.maxPercent}%`,
      state: getCurrentState(),
    };
    const newList = [saved, ...savedCalcs].slice(0, 50);
    setSavedCalcs(newList);
    localStorage.setItem('pokemon-calc-saved', JSON.stringify(newList));
    showToast('保存しました');
  };

  const handleShare = () => {
    const state = getCurrentState();
    const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
    const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('URLをコピーしました');
    }).catch(() => {
      showToast('URLの生成に失敗しました');
    });
  };

  const handleLoadSaved = (saved: SavedCalc) => {
    restoreState(saved.state);
  };

  const handleDeleteSaved = (id: string) => {
    const newList = savedCalcs.filter(s => s.id !== id);
    setSavedCalcs(newList);
    localStorage.setItem('pokemon-calc-saved', JSON.stringify(newList));
  };

  const handleSwap = () => {
    const tmpPokemon = attackerPokemon;
    const tmpNature = attackerNature;
    const tmpIvs = { ...attackerIvs };
    const tmpEvs = { ...attackerEvs };
    const tmpLevel = attackerLevel;
    const tmpItem = attackerItem;
    const tmpAbility = attackerAbility;
    const tmpTera = attackerTeraType;

    setAttackerPokemon(defenderPokemon);
    setAttackerNature(defenderNature);
    setAttackerIvs({ ...defenderIvs });
    setAttackerEvs({ ...defenderEvs });
    setAttackerLevel(defenderLevel);
    setAttackerItem(defenderItem);
    setAttackerAbility(defenderAbility);
    setAttackerTeraType(defenderTeraType);

    setDefenderPokemon(tmpPokemon);
    setDefenderNature(tmpNature);
    setDefenderIvs(tmpIvs);
    setDefenderEvs(tmpEvs);
    setDefenderLevel(tmpLevel);
    setDefenderItem(tmpItem);
    setDefenderAbility(tmpAbility);
    setDefenderTeraType(tmpTera);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>ポケモンダメージ計算ツール</h1>
        </div>
      </header>

      <main className="container">
        <div className="calc-layout">
          {/* Attacker */}
          <div className="card">
            <div className="card-header">
              <h2>攻撃側</h2>
            </div>
            <div className="form-group">
              <label>ポケモン</label>
              <PokemonSelector value={attackerPokemon} onChange={setAttackerPokemon} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '1 1 100px' }}>
                <label>Lv</label>
                <input
                  type="number" min={1} max={100} value={attackerLevel}
                  onChange={e => setAttackerLevel(Math.max(1, Math.min(100, parseInt(e.target.value) || 50)))}
                />
              </div>
              <div className="form-group" style={{ flex: '2 1 140px' }}>
                <label>性格</label>
                <select
                  value={attackerNature.id}
                  onChange={e => setAttackerNature(NATURES.find(n => n.id === e.target.value) || defaultNature)}
                >
                  {NATURES.map(n => (
                    <option key={n.id} value={n.id}>
                      {n.name}{n.plus ? ` (+${n.plus}/-${n.minus})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <StatsInput
                baseStats={attackerPokemon?.baseStats ?? null}
                ivs={attackerIvs} evs={attackerEvs}
                level={attackerLevel} nature={attackerNature}
                onIVsChange={setAttackerIvs} onEVsChange={setAttackerEvs}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '1 1 140px' }}>
                <label>特性</label>
                <select value={attackerAbility} onChange={e => setAttackerAbility(e.target.value)}>
                  {attackerPokemon?.abilities.map(a => (
                    <option key={a} value={a}>{a}</option>
                  )) || <option value="">-</option>}
                </select>
              </div>
              <div className="form-group" style={{ flex: '1 1 140px' }}>
                <label>持ち物</label>
                <select value={attackerItem} onChange={e => setAttackerItem(e.target.value)}>
                  {ITEM_LIST.map(i => (
                    <option key={i.id} value={i.name}>{i.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>テラスタイプ</label>
              <select
                value={attackerTeraType || ''}
                onChange={e => setAttackerTeraType(e.target.value ? e.target.value as PokemonType : null)}
              >
                <option value="">なし</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Defender */}
          <div className="card">
            <div className="card-header">
              <h2>防御側</h2>
            </div>
            <div className="form-group">
              <label>ポケモン</label>
              <PokemonSelector value={defenderPokemon} onChange={setDefenderPokemon} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '1 1 100px' }}>
                <label>Lv</label>
                <input
                  type="number" min={1} max={100} value={defenderLevel}
                  onChange={e => setDefenderLevel(Math.max(1, Math.min(100, parseInt(e.target.value) || 50)))}
                />
              </div>
              <div className="form-group" style={{ flex: '2 1 140px' }}>
                <label>性格</label>
                <select
                  value={defenderNature.id}
                  onChange={e => setDefenderNature(NATURES.find(n => n.id === e.target.value) || defaultNature)}
                >
                  {NATURES.map(n => (
                    <option key={n.id} value={n.id}>
                      {n.name}{n.plus ? ` (+${n.plus}/-${n.minus})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <StatsInput
                baseStats={defenderPokemon?.baseStats ?? null}
                ivs={defenderIvs} evs={defenderEvs}
                level={defenderLevel} nature={defenderNature}
                onIVsChange={setDefenderIvs} onEVsChange={setDefenderEvs}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '1 1 140px' }}>
                <label>特性</label>
                <select value={defenderAbility} onChange={e => setDefenderAbility(e.target.value)}>
                  {defenderPokemon?.abilities.map(a => (
                    <option key={a} value={a}>{a}</option>
                  )) || <option value="">-</option>}
                </select>
              </div>
              <div className="form-group" style={{ flex: '1 1 140px' }}>
                <label>持ち物</label>
                <select value={defenderItem} onChange={e => setDefenderItem(e.target.value)}>
                  {ITEM_LIST.map(i => (
                    <option key={i.id} value={i.name}>{i.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>テラスタイプ</label>
              <select
                value={defenderTeraType || ''}
                onChange={e => setDefenderTeraType(e.target.value ? e.target.value as PokemonType : null)}
              >
                <option value="">なし</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Move selector */}
          <div className="card condition-section">
            <div className="card-header">
              <h2>技</h2>
            </div>
            <MoveSelector value={move} onChange={setMove} />
          </div>

          {/* Battle conditions */}
          <ConditionPanel condition={condition} onChange={setCondition} />

          {/* Result */}
          <div className="result-section">
            <DamageResult
              result={result}
              attackerName={attackerPokemon?.name || '???'}
              defenderName={defenderPokemon?.name || '???'}
              moveName={move?.name || '???'}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="actions-bar">
          <button className="btn btn-secondary" onClick={handleSwap}>
            攻守入替
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!result}>
            保存
          </button>
          <button className="btn btn-secondary" onClick={handleShare}>
            URL共有
          </button>
        </div>

        {/* Saved calculations */}
        {savedCalcs.length > 0 && (
          <div className="saved-list">
            <h3 style={{ marginBottom: 8, fontSize: '0.9rem' }}>保存済み計算</h3>
            {savedCalcs.map(saved => (
              <div key={saved.id} className="saved-item" onClick={() => handleLoadSaved(saved)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="saved-title">
                      {saved.attackerName} → {saved.defenderName} ({saved.moveName})
                    </div>
                    <div className="saved-detail">
                      {saved.percent} {saved.koDescription}
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                    onClick={(e) => { e.stopPropagation(); handleDeleteSaved(saved.id); }}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
