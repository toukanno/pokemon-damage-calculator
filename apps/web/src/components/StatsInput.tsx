'use client';

import { StatValues, BaseStats, Nature, StatName } from '@pokemon-calc/core';
import { calcHP, calcStat, getNatureModifier } from '@pokemon-calc/core';

interface Props {
  baseStats: BaseStats | null;
  ivs: StatValues;
  evs: StatValues;
  level: number;
  nature: Nature;
  onIVsChange: (ivs: StatValues) => void;
  onEVsChange: (evs: StatValues) => void;
}

const STAT_NAMES: StatName[] = ['HP', 'こうげき', 'ぼうぎょ', 'とくこう', 'とくぼう', 'すばやさ'];
const STAT_SHORT: Record<StatName, string> = {
  'HP': 'H', 'こうげき': 'A', 'ぼうぎょ': 'B',
  'とくこう': 'C', 'とくぼう': 'D', 'すばやさ': 'S',
};

export default function StatsInput({ baseStats, ivs, evs, level, nature, onIVsChange, onEVsChange }: Props) {
  const totalEV = Object.values(evs).reduce((sum, v) => sum + v, 0);

  const getActualStat = (stat: StatName): number => {
    if (!baseStats) return 0;
    if (stat === 'HP') {
      return calcHP(baseStats.HP, ivs.HP, evs.HP, level);
    }
    return calcStat(baseStats[stat], ivs[stat], evs[stat], level, getNatureModifier(nature, stat));
  };

  const handleIVChange = (stat: StatName, value: number) => {
    const clamped = Math.max(0, Math.min(31, value || 0));
    onIVsChange({ ...ivs, [stat]: clamped });
  };

  const handleEVChange = (stat: StatName, value: number) => {
    const clamped = Math.max(0, Math.min(252, value || 0));
    const newTotal = totalEV - evs[stat] + clamped;
    if (newTotal <= 510) {
      onEVsChange({ ...evs, [stat]: clamped });
    }
  };

  const getNatureColor = (stat: StatName): string => {
    if (stat === 'HP') return '';
    if (nature.plus === stat) return '#ff6b81';
    if (nature.minus === stat) return '#5b9bd5';
    return '';
  };

  return (
    <div>
      <div className="stats-grid">
        <div></div>
        <div className="stats-header">種族値</div>
        <div className="stats-header">個体値</div>
        <div className="stats-header">努力値</div>
        <div className="stats-header">実数値</div>
        {STAT_NAMES.map((stat) => (
          <>
            <div key={`label-${stat}`} className="stat-label" style={{ color: getNatureColor(stat) || 'inherit' }}>
              {STAT_SHORT[stat]}
            </div>
            <div key={`base-${stat}`} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              {baseStats ? baseStats[stat] : '-'}
            </div>
            <input
              key={`iv-${stat}`}
              type="number"
              min={0}
              max={31}
              value={ivs[stat]}
              onChange={(e) => handleIVChange(stat, parseInt(e.target.value))}
            />
            <input
              key={`ev-${stat}`}
              type="number"
              min={0}
              max={252}
              step={4}
              value={evs[stat]}
              onChange={(e) => handleEVChange(stat, parseInt(e.target.value))}
            />
            <div key={`actual-${stat}`} className="stat-actual">
              {baseStats ? getActualStat(stat) : '-'}
            </div>
          </>
        ))}
      </div>
      <div style={{ fontSize: '0.75rem', color: totalEV > 510 ? 'var(--accent)' : 'var(--text-secondary)', marginTop: 4, textAlign: 'right' }}>
        努力値合計: {totalEV}/510
      </div>
    </div>
  );
}
