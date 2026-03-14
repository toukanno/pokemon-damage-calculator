'use client';

import { useState, useRef, useEffect } from 'react';
import { MoveData } from '@pokemon-calc/core';
import { getAttackMoves, searchMoves } from '@pokemon-calc/data';

interface Props {
  value: MoveData | null;
  onChange: (move: MoveData) => void;
}

const TYPE_COLORS: Record<string, string> = {
  'ノーマル': '#a8a878', 'ほのお': '#f08030', 'みず': '#6890f0',
  'でんき': '#f8d030', 'くさ': '#78c850', 'こおり': '#98d8d8',
  'かくとう': '#c03028', 'どく': '#a040a0', 'じめん': '#e0c068',
  'ひこう': '#a890f0', 'エスパー': '#f85888', 'むし': '#a8b820',
  'いわ': '#b8a038', 'ゴースト': '#705898', 'ドラゴン': '#7038f8',
  'あく': '#705848', 'はがね': '#b8b8d0', 'フェアリー': '#ee99ac',
};

export default function MoveSelector({ value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<MoveData[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = query ? searchMoves(query) : getAttackMoves();
    setResults(filtered.filter(m => m.category !== 'へんか').slice(0, 20));
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (move: MoveData) => {
    onChange(move);
    setQuery(move.name);
    setIsOpen(false);
  };

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={isOpen ? query : (value?.name || query)}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => { setIsOpen(true); setQuery(''); }}
        placeholder="技名を入力..."
      />
      {isOpen && (
        <div className="autocomplete-list">
          {results.map((m) => (
            <div
              key={m.id}
              className="autocomplete-item"
              onClick={() => handleSelect(m)}
            >
              <span>{m.name}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  className="type-badge"
                  style={{ backgroundColor: TYPE_COLORS[m.type] }}
                >
                  {m.type}
                </span>
                <span className="sub-text">
                  {m.category} {m.power}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
