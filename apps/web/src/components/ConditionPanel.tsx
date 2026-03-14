'use client';

import { BattleCondition, Weather, Field } from '@pokemon-calc/core';

interface Props {
  condition: BattleCondition;
  onChange: (condition: BattleCondition) => void;
}

const WEATHERS: Weather[] = ['なし', 'はれ', 'あめ', 'すなあらし', 'ゆき'];
const FIELDS: Field[] = ['なし', 'エレキフィールド', 'グラスフィールド', 'サイコフィールド', 'ミストフィールド'];

export default function ConditionPanel({ condition, onChange }: Props) {
  const toggle = (key: keyof BattleCondition) => {
    onChange({ ...condition, [key]: !condition[key] });
  };

  return (
    <div className="card condition-section">
      <div className="card-header">
        <h2>バトル条件</h2>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div className="form-group" style={{ flex: '1 1 180px' }}>
          <label>天候</label>
          <select
            value={condition.weather}
            onChange={(e) => onChange({ ...condition, weather: e.target.value as Weather })}
          >
            {WEATHERS.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div className="form-group" style={{ flex: '1 1 180px' }}>
          <label>フィールド</label>
          <select
            value={condition.field}
            onChange={(e) => onChange({ ...condition, field: e.target.value as Field })}
          >
            {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <div className="condition-grid">
        <label className={`condition-toggle ${condition.isCritical ? 'active' : ''}`}>
          <input type="checkbox" checked={condition.isCritical} onChange={() => toggle('isCritical')} />
          急所
        </label>
        <label className={`condition-toggle ${condition.isBurned ? 'active' : ''}`}>
          <input type="checkbox" checked={condition.isBurned} onChange={() => toggle('isBurned')} />
          やけど
        </label>
        <label className={`condition-toggle ${condition.isReflect ? 'active' : ''}`}>
          <input type="checkbox" checked={condition.isReflect} onChange={() => toggle('isReflect')} />
          リフレクター
        </label>
        <label className={`condition-toggle ${condition.isLightScreen ? 'active' : ''}`}>
          <input type="checkbox" checked={condition.isLightScreen} onChange={() => toggle('isLightScreen')} />
          ひかりのかべ
        </label>
        <label className={`condition-toggle ${condition.isDoubleBattle ? 'active' : ''}`}>
          <input type="checkbox" checked={condition.isDoubleBattle} onChange={() => toggle('isDoubleBattle')} />
          ダブル
        </label>
        <label className={`condition-toggle ${condition.isHelpingHand ? 'active' : ''}`}>
          <input type="checkbox" checked={condition.isHelpingHand} onChange={() => toggle('isHelpingHand')} />
          てだすけ
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
        <div className="form-group" style={{ flex: '1 1 100px' }}>
          <label>攻撃ランク</label>
          <select
            value={condition.attackerRankAtk}
            onChange={(e) => onChange({ ...condition, attackerRankAtk: parseInt(e.target.value), attackerRankSpAtk: parseInt(e.target.value) })}
          >
            {[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6].map(r =>
              <option key={r} value={r}>{r >= 0 ? `+${r}` : r}</option>
            )}
          </select>
        </div>
        <div className="form-group" style={{ flex: '1 1 100px' }}>
          <label>防御ランク</label>
          <select
            value={condition.defenderRankDef}
            onChange={(e) => onChange({ ...condition, defenderRankDef: parseInt(e.target.value), defenderRankSpDef: parseInt(e.target.value) })}
          >
            {[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6].map(r =>
              <option key={r} value={r}>{r >= 0 ? `+${r}` : r}</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
