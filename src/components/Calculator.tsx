'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { PokemonBuild, BattleCondition, DamageCalcRequest, DamageCalcResult } from '@/core/types';
import { calculateDamage } from '@/core/damage';
import { POKEMON } from '@/data/pokemon';
import { MOVES } from '@/data/moves';
import PokemonSelector from './PokemonSelector';
import MoveSelector from './MoveSelector';
import BattleConditions from './BattleConditions';
import DamageResult from './DamageResult';
import SavedPresets from './SavedPresets';
import { createDefaultBuild, createDefaultCondition } from '@/lib/defaults';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateShareUrl, decodeCalcRequest } from '@/lib/url-share';

interface SavedCalc {
  id: string;
  name: string;
  request: DamageCalcRequest;
  timestamp: number;
}

export default function Calculator() {
  const [attacker, setAttacker] = useState<PokemonBuild>(createDefaultBuild('garchomp'));
  const [defender, setDefender] = useState<PokemonBuild>(createDefaultBuild('gholdengo'));
  const [selectedMoveId, setSelectedMoveId] = useState<string>('earthquake');
  const [condition, setCondition] = useState<BattleCondition>(createDefaultCondition());
  const [savedCalcs, setSavedCalcs] = useLocalStorage<SavedCalc[]>('savedCalcs', []);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'attacker' | 'defender' | 'condition' | 'result'>('attacker');

  // URL パラメータからの復元
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const calcParam = params.get('calc');
    if (calcParam) {
      const request = decodeCalcRequest(calcParam);
      if (request) {
        setAttacker(request.attacker);
        setDefender(request.defender);
        setSelectedMoveId(request.moveId);
        setCondition(request.condition);
      }
    }
  }, []);

  const request: DamageCalcRequest = useMemo(() => ({
    attacker,
    defender,
    moveId: selectedMoveId,
    condition,
  }), [attacker, defender, selectedMoveId, condition]);

  const result: DamageCalcResult = useMemo(() => {
    return calculateDamage(request);
  }, [request]);

  const attackerData = POKEMON.find(p => p.id === attacker.pokemonId);
  const defenderData = POKEMON.find(p => p.id === defender.pokemonId);
  const moveData = MOVES.find(m => m.id === selectedMoveId);

  const handleShare = useCallback(() => {
    const url = generateShareUrl(request);
    setShareUrl(url);
    navigator.clipboard.writeText(url).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  }, [request]);

  const handleSave = useCallback(() => {
    const name = `${attackerData?.name ?? '?'} → ${defenderData?.name ?? '?'} (${moveData?.name ?? '?'})`;
    const newCalc: SavedCalc = {
      id: Date.now().toString(),
      name,
      request,
      timestamp: Date.now(),
    };
    setSavedCalcs(prev => [newCalc, ...prev].slice(0, 50));
  }, [request, attackerData, defenderData, moveData, setSavedCalcs]);

  const handleLoadPreset = useCallback((calc: SavedCalc) => {
    setAttacker(calc.request.attacker);
    setDefender(calc.request.defender);
    setSelectedMoveId(calc.request.moveId);
    setCondition(calc.request.condition);
  }, []);

  const handleDeletePreset = useCallback((id: string) => {
    setSavedCalcs(prev => prev.filter(c => c.id !== id));
  }, [setSavedCalcs]);

  const handleSwap = useCallback(() => {
    setAttacker(defender);
    setDefender(attacker);
  }, [attacker, defender]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* モバイルタブ */}
      <div className="lg:hidden flex gap-1 mb-4 bg-slate-100 p-1 rounded-lg">
        {[
          { key: 'attacker' as const, label: '攻撃側' },
          { key: 'defender' as const, label: '防御側' },
          { key: 'condition' as const, label: '条件' },
          { key: 'result' as const, label: '結果' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PC レイアウト */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4">
        {/* 攻撃側 */}
        <div>
          <PokemonSelector label="攻撃側" build={attacker} onChange={setAttacker} />
        </div>

        {/* 技 + 条件 */}
        <div className="space-y-4">
          <div className="card">
            <MoveSelector selectedMoveId={selectedMoveId} onChange={setSelectedMoveId} />
          </div>
          <BattleConditions condition={condition} onChange={setCondition} />
          <div className="flex gap-2">
            <button className="btn-secondary flex-1 text-xs" onClick={handleSwap}>
              攻守入替
            </button>
          </div>
        </div>

        {/* 防御側 */}
        <div>
          <PokemonSelector label="防御側" build={defender} onChange={setDefender} />
        </div>

        {/* 結果 */}
        <div className="space-y-4">
          <DamageResult
            result={result}
            attackerName={attackerData?.name ?? '?'}
            defenderName={defenderData?.name ?? '?'}
            moveName={moveData?.name ?? '?'}
          />

          <div className="flex gap-2">
            <button className="btn-primary flex-1 text-xs" onClick={handleSave}>
              保存
            </button>
            <button className="btn-secondary flex-1 text-xs" onClick={handleShare}>
              {copyFeedback ? 'コピー済み!' : 'URL共有'}
            </button>
          </div>

          <SavedPresets
            calcs={savedCalcs}
            onLoad={handleLoadPreset}
            onDelete={handleDeletePreset}
          />
        </div>
      </div>

      {/* モバイルレイアウト */}
      <div className="lg:hidden">
        {activeTab === 'attacker' && (
          <PokemonSelector label="攻撃側" build={attacker} onChange={setAttacker} />
        )}
        {activeTab === 'defender' && (
          <PokemonSelector label="防御側" build={defender} onChange={setDefender} />
        )}
        {activeTab === 'condition' && (
          <div className="space-y-4">
            <div className="card">
              <MoveSelector selectedMoveId={selectedMoveId} onChange={setSelectedMoveId} />
            </div>
            <BattleConditions condition={condition} onChange={setCondition} />
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 text-xs" onClick={handleSwap}>
                攻守入替
              </button>
            </div>
          </div>
        )}
        {activeTab === 'result' && (
          <div className="space-y-4">
            <DamageResult
              result={result}
              attackerName={attackerData?.name ?? '?'}
              defenderName={defenderData?.name ?? '?'}
              moveName={moveData?.name ?? '?'}
            />
            <div className="flex gap-2">
              <button className="btn-primary flex-1 text-xs" onClick={handleSave}>
                保存
              </button>
              <button className="btn-secondary flex-1 text-xs" onClick={handleShare}>
                {copyFeedback ? 'コピー済み!' : 'URL共有'}
              </button>
            </div>
            <SavedPresets
              calcs={savedCalcs}
              onLoad={handleLoadPreset}
              onDelete={handleDeletePreset}
            />
          </div>
        )}
      </div>
    </div>
  );
}
