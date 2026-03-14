'use client';

import { DamageCalcResult } from '@pokemon-calc/core';

interface Props {
  result: DamageCalcResult | null;
  attackerName: string;
  defenderName: string;
  moveName: string;
}

export default function DamageResult({ result, attackerName, defenderName, moveName }: Props) {
  if (!result) {
    return (
      <div className="result-card">
        <div className="result-main">
          <p style={{ color: 'var(--text-secondary)' }}>
            ポケモンと技を選択してください
          </p>
        </div>
      </div>
    );
  }

  const remainHP = Math.max(0, 100 - result.maxPercent);
  const hpClass = remainHP > 50 ? 'hp-high' : remainHP > 25 ? 'hp-mid' : 'hp-low';

  const koClass = result.guaranteedKO === 1 ? 'ko-1'
    : result.guaranteedKO === 2 ? 'ko-2'
    : result.guaranteedKO ? 'ko-3'
    : result.chanceToKO ? 'ko-2'
    : 'ko-none';

  return (
    <div className="result-card">
      <div className="result-main">
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
          {attackerName} の {moveName} → {defenderName}
        </p>
        <div className="result-damage">
          {result.minDamage} ~ {result.maxDamage}
        </div>
        <div className="result-percent">
          ({result.minPercent}% ~ {result.maxPercent}%)
        </div>
        <div className={`result-ko ${koClass}`}>
          {result.koDescription}
        </div>
      </div>

      <div className="hp-bar-container">
        <div
          className={`hp-bar ${hpClass}`}
          style={{ width: `${Math.max(0, Math.min(100, remainHP))}%` }}
        />
        <div className="hp-bar-text">
          HP: {result.defenderHP} (残り {Math.max(0, result.defenderHP - result.maxDamage)} ~ {Math.max(0, result.defenderHP - result.minDamage)})
        </div>
      </div>

      <div className="damage-dist">
        {result.damages.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}
