'use client';

import { useState, useMemo } from 'react';
import { MOVES } from '@/data/moves';

interface Props {
  selectedMoveId: string;
  onChange: (moveId: string) => void;
}

export default function MoveSelector({ selectedMoveId, onChange }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedMove = MOVES.find(m => m.id === selectedMoveId);

  const filteredMoves = useMemo(() => {
    if (!searchQuery) return MOVES.filter(m => m.category !== 'へんか');
    const q = searchQuery.toLowerCase();
    return MOVES.filter(m =>
      m.category !== 'へんか' &&
      (m.name.includes(searchQuery) || m.nameEn.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="relative">
      <label className="label">技</label>
      <button
        className="input-field text-left flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedMove ? (
            <>
              {selectedMove.name}
              <span className="text-slate-400 ml-1 text-xs">
                {selectedMove.type} / {selectedMove.category} / 威力{selectedMove.power}
              </span>
            </>
          ) : '技を選択'}
        </span>
        <span className="text-slate-400 text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b">
            <input
              type="text"
              className="input-field"
              placeholder="技を検索..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          {filteredMoves.map(m => (
            <button
              key={m.id}
              className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm flex justify-between items-center"
              onClick={() => {
                onChange(m.id);
                setIsOpen(false);
                setSearchQuery('');
              }}
            >
              <span className="font-medium">{m.name}</span>
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <span className={`type-badge type-${m.type}`}>{m.type}</span>
                <span>{m.category}</span>
                <span>威力{m.power}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
