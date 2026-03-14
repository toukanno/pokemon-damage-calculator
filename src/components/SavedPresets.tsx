'use client';

import { DamageCalcRequest } from '@/core/types';

interface SavedCalc {
  id: string;
  name: string;
  request: DamageCalcRequest;
  timestamp: number;
}

interface Props {
  calcs: SavedCalc[];
  onLoad: (calc: SavedCalc) => void;
  onDelete: (id: string) => void;
}

export default function SavedPresets({ calcs, onLoad, onDelete }: Props) {
  if (calcs.length === 0) return null;

  return (
    <div className="card">
      <h3 className="text-xs font-bold text-slate-500 mb-2">保存済み</h3>
      <div className="space-y-1 max-h-48 overflow-auto">
        {calcs.map(calc => (
          <div
            key={calc.id}
            className="flex items-center justify-between text-xs bg-slate-50 rounded px-2 py-1.5 group"
          >
            <button
              className="text-left text-slate-700 hover:text-blue-600 flex-1 truncate"
              onClick={() => onLoad(calc)}
            >
              {calc.name}
            </button>
            <button
              className="text-slate-300 hover:text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(calc.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
