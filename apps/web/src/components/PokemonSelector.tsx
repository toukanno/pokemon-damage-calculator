'use client';

import { useState, useRef, useEffect } from 'react';
import { PokemonData } from '@pokemon-calc/core';
import { POKEMON_LIST, searchPokemon } from '@pokemon-calc/data';

interface Props {
  value: PokemonData | null;
  onChange: (pokemon: PokemonData) => void;
}

const TYPE_COLORS: Record<string, string> = {
  'ノーマル': '#a8a878', 'ほのお': '#f08030', 'みず': '#6890f0',
  'でんき': '#f8d030', 'くさ': '#78c850', 'こおり': '#98d8d8',
  'かくとう': '#c03028', 'どく': '#a040a0', 'じめん': '#e0c068',
  'ひこう': '#a890f0', 'エスパー': '#f85888', 'むし': '#a8b820',
  'いわ': '#b8a038', 'ゴースト': '#705898', 'ドラゴン': '#7038f8',
  'あく': '#705848', 'はがね': '#b8b8d0', 'フェアリー': '#ee99ac',
};

export default function PokemonSelector({ value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<PokemonData[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(searchPokemon(query).slice(0, 20));
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

  const handleSelect = (pokemon: PokemonData) => {
    onChange(pokemon);
    setQuery(pokemon.name);
    setIsOpen(false);
  };

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={isOpen ? query : (value?.name || query)}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => { setIsOpen(true); setQuery(''); }}
        placeholder="ポケモン名を入力..."
      />
      {isOpen && (
        <div className="autocomplete-list">
          {results.map((p) => (
            <div
              key={p.id}
              className="autocomplete-item"
              onClick={() => handleSelect(p)}
            >
              <span>{p.name}</span>
              <span>
                {p.types.map(t => (
                  <span
                    key={t}
                    className="type-badge"
                    style={{ backgroundColor: TYPE_COLORS[t], marginLeft: 4 }}
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
