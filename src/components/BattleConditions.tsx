'use client';

import { BattleCondition, Weather, Terrain } from '@/core/types';

interface Props {
  condition: BattleCondition;
  onChange: (condition: BattleCondition) => void;
}

const WEATHERS: { value: Weather; label: string }[] = [
  { value: 'none', label: 'なし' },
  { value: 'sun', label: 'はれ' },
  { value: 'rain', label: 'あめ' },
  { value: 'sand', label: 'すなあらし' },
  { value: 'snow', label: 'ゆき' },
];

const TERRAINS: { value: Terrain; label: string }[] = [
  { value: 'none', label: 'なし' },
  { value: 'electric', label: 'エレキフィールド' },
  { value: 'grassy', label: 'グラスフィールド' },
  { value: 'psychic', label: 'サイコフィールド' },
  { value: 'misty', label: 'ミストフィールド' },
];

export default function BattleConditions({ condition, onChange }: Props) {
  const update = (partial: Partial<BattleCondition>) => {
    onChange({ ...condition, ...partial });
  };

  return (
    <div className="card space-y-3">
      <h2 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">
        バトル条件
      </h2>

      {/* 天候 */}
      <div>
        <label className="label">天候</label>
        <select
          className="select-field"
          value={condition.weather}
          onChange={e => update({ weather: e.target.value as Weather })}
        >
          {WEATHERS.map(w => (
            <option key={w.value} value={w.value}>{w.label}</option>
          ))}
        </select>
      </div>

      {/* フィールド */}
      <div>
        <label className="label">フィールド</label>
        <select
          className="select-field"
          value={condition.terrain}
          onChange={e => update({ terrain: e.target.value as Terrain })}
        >
          {TERRAINS.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* ランク補正 */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">攻撃側ランク</label>
          <select
            className="select-field"
            value={condition.attackerRank}
            onChange={e => update({ attackerRank: Number(e.target.value) })}
          >
            {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(r => (
              <option key={r} value={r}>{r >= 0 ? `+${r}` : r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">防御側ランク</label>
          <select
            className="select-field"
            value={condition.defenderRank}
            onChange={e => update({ defenderRank: Number(e.target.value) })}
          >
            {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(r => (
              <option key={r} value={r}>{r >= 0 ? `+${r}` : r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* トグル条件 */}
      <div className="space-y-2">
        {[
          { key: 'isCritical' as const, label: '急所' },
          { key: 'isBurned' as const, label: 'やけど' },
          { key: 'isReflect' as const, label: 'リフレクター' },
          { key: 'isLightScreen' as const, label: 'ひかりのかべ' },
          { key: 'isHelpingHand' as const, label: 'てだすけ' },
          { key: 'isTerastallized' as const, label: 'テラスタル' },
          { key: 'isDoubleBattle' as const, label: 'ダブルバトル' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
              checked={condition[key]}
              onChange={e => update({ [key]: e.target.checked })}
            />
            <span className="text-slate-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
