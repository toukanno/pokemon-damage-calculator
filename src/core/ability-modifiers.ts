import { MoveData, BattleCondition } from './types';

/** 特性によるダメージ補正を返す */
export function getAbilityDamageModifier(
  attackerAbility: string,
  defenderAbility: string,
  move: MoveData,
  condition: BattleCondition
): number {
  let modifier = 1.0;

  // 攻撃側の特性
  switch (attackerAbility) {
    case 'chikarazuku': // ちからずく
      if (move.flags?.includes('secondary_effect')) modifier *= 1.3;
      break;
    case 'tekunishan': // テクニシャン
      if (move.power !== null && move.power <= 60) modifier *= 1.5;
      break;
    case 'irotinted': // いろめがね
      // タイプ相性はdamage.ts側で処理するのでここではスキップ
      break;
    case 'sunanonochikara': // すなのちから
      if (condition.weather === 'sand' && ['じめん', 'いわ', 'はがね'].includes(move.type)) {
        modifier *= 1.3;
      }
      break;
    case 'hagane_no_seishin': // はがねのせいしん (はがねつかい)
      if (move.type === 'はがね') modifier *= 1.5;
      break;
    case 'youryokuso': // ようりょくそ → 素早さ上昇のみ
      break;
    case 'sutoraiku': // ストライカー → キック技の威力1.3倍
      if (move.flags?.includes('kick')) modifier *= 1.3;
      break;
  }

  // 防御側の特性
  switch (defenderAbility) {
    case 'multiscale': // マルチスケイル
      // HPが満タンの時ダメージ半減（ここでは条件不明なので適用しない）
      break;
    case 'moufubuki': // もふもふ
      if (move.contact) modifier *= 0.5;
      if (move.type === 'ほのお') modifier *= 2.0;
      break;
    case 'atsuishibou': // あついしぼう
      if (move.type === 'ほのお' || move.type === 'こおり') modifier *= 0.5;
      break;
    case 'fuyu': // ふゆう → じめん無効はタイプ相性で処理
      break;
  }

  return modifier;
}
