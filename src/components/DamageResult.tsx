'use client';

import { DamageCalcResult } from '@/core/types';

interface Props {
  result: DamageCalcResult;
  attackerName: string;
  defenderName: string;
  moveName: string;
}

export default function DamageResult({ result, attackerName, defenderName, moveName }: Props) {
  if (!result.damages.length) {
    return (
      <div className="card text-center text-slate-400 py-8">
        <p className="text-sm">技を選択してダメージを計算</p>
      </div>
    );
  }

  const remainingHpPercent = Math.max(0, 100 - result.maxPercent);
  const hpBarClass = remainingHpPercent > 50 ? 'hp-high' : remainingHpPercent > 25 ? 'hp-mid' : 'hp-low';

  return (
    <div className="card space-y-4">
      <h2 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">
        計算結果
      </h2>

      {/* 概要 */}
      <div className="text-sm text-slate-600">
        <span className="font-bold text-slate-800">{attackerName}</span>
        <span className="mx-1">の</span>
        <span className="font-bold text-blue-600">{moveName}</span>
        <span className="mx-1">→</span>
        <span className="font-bold text-slate-800">{defenderName}</span>
      </div>

      {/* ダメージ範囲 */}
      <div className="bg-slate-50 rounded-lg p-3">
        <div className="text-2xl font-bold text-center text-slate-800">
          {result.minDamage} ~ {result.maxDamage}
        </div>
        <div className="text-center text-sm text-slate-500 mt-1">
          ({result.minPercent}% ~ {result.maxPercent}%)
          <span className="ml-2 text-slate-400">/ HP {result.defenderMaxHp}</span>
        </div>
      </div>

      {/* HPバー */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>残りHP</span>
          <span>{Math.max(0, result.defenderMaxHp - result.maxDamage)} ~ {Math.max(0, result.defenderMaxHp - result.minDamage)}</span>
        </div>
        <div className="hp-bar-container">
          <div
            className={`hp-bar ${hpBarClass}`}
            style={{ width: `${Math.max(0, remainingHpPercent)}%` }}
          />
        </div>
      </div>

      {/* 確定数 */}
      <div className="text-center">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
          result.koChance.hits === 1
            ? 'bg-red-100 text-red-700'
            : result.koChance.hits === 2
            ? 'bg-orange-100 text-orange-700'
            : 'bg-blue-100 text-blue-700'
        }`}>
          {result.koChance.text}
        </span>
      </div>

      {/* 乱数詳細 */}
      <details className="text-xs">
        <summary className="text-slate-400 cursor-pointer hover:text-slate-600">
          乱数詳細を表示
        </summary>
        <div className="mt-2 bg-slate-50 rounded p-2 font-mono text-slate-600 break-all">
          ({result.damages.join(', ')})
        </div>
      </details>
    </div>
  );
}
