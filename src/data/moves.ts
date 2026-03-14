import { MoveData } from '@/core/types';

export const MOVES: MoveData[] = [
  // ノーマル
  { id: 'karai_shime', name: 'からげんき', nameEn: 'Facade', type: 'ノーマル', category: 'ぶつり', power: 70, accuracy: 100, pp: 20, contact: true },
  { id: 'shinen_soku', name: 'しんそく', nameEn: 'Extreme Speed', type: 'ノーマル', category: 'ぶつり', power: 80, accuracy: 100, pp: 5, contact: true },
  { id: 'body_press', name: 'ボディプレス', nameEn: 'Body Press', type: 'かくとう', category: 'ぶつり', power: 80, accuracy: 100, pp: 10, contact: true },
  { id: 'terastal_burst', name: 'テラバースト', nameEn: 'Tera Blast', type: 'ノーマル', category: 'とくしゅ', power: 80, accuracy: 100, pp: 10, contact: false },

  // ほのお
  { id: 'flare_blitz', name: 'フレアドライブ', nameEn: 'Flare Blitz', type: 'ほのお', category: 'ぶつり', power: 120, accuracy: 100, pp: 15, contact: true },
  { id: 'kaen_housya', name: 'かえんほうしゃ', nameEn: 'Flamethrower', type: 'ほのお', category: 'とくしゅ', power: 90, accuracy: 100, pp: 15, contact: false },
  { id: 'overheats', name: 'オーバーヒート', nameEn: 'Overheat', type: 'ほのお', category: 'とくしゅ', power: 130, accuracy: 90, pp: 5, contact: false },
  { id: 'daimonji', name: 'だいもんじ', nameEn: 'Fire Blast', type: 'ほのお', category: 'とくしゅ', power: 110, accuracy: 85, pp: 5, contact: false },
  { id: 'torch_song', name: 'フレアソング', nameEn: 'Torch Song', type: 'ほのお', category: 'とくしゅ', power: 80, accuracy: 100, pp: 10, contact: false },

  // みず
  { id: 'aqua_jet', name: 'アクアジェット', nameEn: 'Aqua Jet', type: 'みず', category: 'ぶつり', power: 40, accuracy: 100, pp: 20, contact: true },
  { id: 'naminori', name: 'なみのり', nameEn: 'Surf', type: 'みず', category: 'とくしゅ', power: 90, accuracy: 100, pp: 15, contact: false },
  { id: 'hydro_pump', name: 'ハイドロポンプ', nameEn: 'Hydro Pump', type: 'みず', category: 'とくしゅ', power: 110, accuracy: 80, pp: 5, contact: false },
  { id: 'surging_strikes', name: 'すいりゅうれんだ', nameEn: 'Surging Strikes', type: 'みず', category: 'ぶつり', power: 25, accuracy: 100, pp: 5, contact: true, flags: ['multi_hit_3'] },
  { id: 'liquidation', name: 'アクアブレイク', nameEn: 'Liquidation', type: 'みず', category: 'ぶつり', power: 85, accuracy: 100, pp: 10, contact: true },

  // でんき
  { id: 'thunderbolt', name: '10まんボルト', nameEn: 'Thunderbolt', type: 'でんき', category: 'とくしゅ', power: 90, accuracy: 100, pp: 15, contact: false },
  { id: 'volt_switch', name: 'ボルトチェンジ', nameEn: 'Volt Switch', type: 'でんき', category: 'とくしゅ', power: 70, accuracy: 100, pp: 20, contact: false },
  { id: 'thunder', name: 'かみなり', nameEn: 'Thunder', type: 'でんき', category: 'とくしゅ', power: 110, accuracy: 70, pp: 10, contact: false },
  { id: 'make_it_rain', name: 'ゴールドラッシュ', nameEn: 'Make It Rain', type: 'はがね', category: 'とくしゅ', power: 120, accuracy: 100, pp: 5, contact: false },
  { id: 'thunderclap', name: 'でんこうそうげき', nameEn: 'Thunderclap', type: 'でんき', category: 'とくしゅ', power: 70, accuracy: 100, pp: 5, contact: false },

  // くさ
  { id: 'leaf_blade', name: 'リーフブレード', nameEn: 'Leaf Blade', type: 'くさ', category: 'ぶつり', power: 90, accuracy: 100, pp: 15, contact: true },
  { id: 'energy_ball', name: 'エナジーボール', nameEn: 'Energy Ball', type: 'くさ', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10, contact: false },
  { id: 'flower_trick', name: 'トリックフラワー', nameEn: 'Flower Trick', type: 'くさ', category: 'ぶつり', power: 70, accuracy: 100, pp: 10, contact: false },
  { id: 'wood_hammer', name: 'ウッドハンマー', nameEn: 'Wood Hammer', type: 'くさ', category: 'ぶつり', power: 120, accuracy: 100, pp: 15, contact: true },
  { id: 'ivy_cudgel', name: 'ツタこんぼう', nameEn: 'Ivy Cudgel', type: 'くさ', category: 'ぶつり', power: 100, accuracy: 100, pp: 10, contact: false },

  // こおり
  { id: 'ice_shard', name: 'こおりのつぶて', nameEn: 'Ice Shard', type: 'こおり', category: 'ぶつり', power: 40, accuracy: 100, pp: 30, contact: false },
  { id: 'ice_beam', name: 'れいとうビーム', nameEn: 'Ice Beam', type: 'こおり', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10, contact: false },
  { id: 'blizzard', name: 'ふぶき', nameEn: 'Blizzard', type: 'こおり', category: 'とくしゅ', power: 110, accuracy: 70, pp: 5, contact: false },
  { id: 'icicle_crash', name: 'つららおとし', nameEn: 'Icicle Crash', type: 'こおり', category: 'ぶつり', power: 85, accuracy: 90, pp: 10, contact: false },
  { id: 'glaive_rush', name: 'きょけんとつげき', nameEn: 'Glaive Rush', type: 'ドラゴン', category: 'ぶつり', power: 120, accuracy: 100, pp: 5, contact: true },

  // かくとう
  { id: 'close_combat', name: 'インファイト', nameEn: 'Close Combat', type: 'かくとう', category: 'ぶつり', power: 120, accuracy: 100, pp: 5, contact: true },
  { id: 'drain_punch', name: 'ドレインパンチ', nameEn: 'Drain Punch', type: 'かくとう', category: 'ぶつり', power: 75, accuracy: 100, pp: 10, contact: true },
  { id: 'mach_punch', name: 'マッハパンチ', nameEn: 'Mach Punch', type: 'かくとう', category: 'ぶつり', power: 40, accuracy: 100, pp: 30, contact: true },
  { id: 'wicked_blow', name: 'あんこくきょうだ', nameEn: 'Wicked Blow', type: 'あく', category: 'ぶつり', power: 75, accuracy: 100, pp: 5, contact: true },

  // どく
  { id: 'sludge_bomb', name: 'ヘドロばくだん', nameEn: 'Sludge Bomb', type: 'どく', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10, contact: false },
  { id: 'gunk_shot', name: 'ダストシュート', nameEn: 'Gunk Shot', type: 'どく', category: 'ぶつり', power: 120, accuracy: 80, pp: 5, contact: false },

  // じめん
  { id: 'earthquake', name: 'じしん', nameEn: 'Earthquake', type: 'じめん', category: 'ぶつり', power: 100, accuracy: 100, pp: 10, contact: false },
  { id: 'earth_power', name: 'だいちのちから', nameEn: 'Earth Power', type: 'じめん', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10, contact: false },
  { id: 'headlong_rush', name: 'ぶちかまし', nameEn: 'Headlong Rush', type: 'じめん', category: 'ぶつり', power: 120, accuracy: 100, pp: 5, contact: true },

  // ひこう
  { id: 'brave_bird', name: 'ブレイブバード', nameEn: 'Brave Bird', type: 'ひこう', category: 'ぶつり', power: 120, accuracy: 100, pp: 15, contact: true },
  { id: 'hurricane', name: 'ぼうふう', nameEn: 'Hurricane', type: 'ひこう', category: 'とくしゅ', power: 110, accuracy: 70, pp: 10, contact: false },

  // エスパー
  { id: 'psychic', name: 'サイコキネシス', nameEn: 'Psychic', type: 'エスパー', category: 'とくしゅ', power: 90, accuracy: 100, pp: 10, contact: false },
  { id: 'psyshock', name: 'サイコショック', nameEn: 'Psyshock', type: 'エスパー', category: 'とくしゅ', power: 80, accuracy: 100, pp: 10, contact: false },

  // むし
  { id: 'u_turn', name: 'とんぼがえり', nameEn: 'U-turn', type: 'むし', category: 'ぶつり', power: 70, accuracy: 100, pp: 20, contact: true },
  { id: 'bullet_punch', name: 'バレットパンチ', nameEn: 'Bullet Punch', type: 'はがね', category: 'ぶつり', power: 40, accuracy: 100, pp: 30, contact: true },

  // いわ
  { id: 'stone_edge', name: 'ストーンエッジ', nameEn: 'Stone Edge', type: 'いわ', category: 'ぶつり', power: 100, accuracy: 80, pp: 5, contact: false },
  { id: 'rock_blast', name: 'ロックブラスト', nameEn: 'Rock Blast', type: 'いわ', category: 'ぶつり', power: 25, accuracy: 90, pp: 10, contact: false },
  { id: 'salt_cure', name: 'しおづけ', nameEn: 'Salt Cure', type: 'いわ', category: 'ぶつり', power: 40, accuracy: 100, pp: 15, contact: false },

  // ゴースト
  { id: 'shadow_ball', name: 'シャドーボール', nameEn: 'Shadow Ball', type: 'ゴースト', category: 'とくしゅ', power: 80, accuracy: 100, pp: 15, contact: false },
  { id: 'shadow_claw', name: 'シャドークロー', nameEn: 'Shadow Claw', type: 'ゴースト', category: 'ぶつり', power: 70, accuracy: 100, pp: 15, contact: true },
  { id: 'shadow_sneak', name: 'かげうち', nameEn: 'Shadow Sneak', type: 'ゴースト', category: 'ぶつり', power: 40, accuracy: 100, pp: 30, contact: true },
  { id: 'poltergeist', name: 'ポルターガイスト', nameEn: 'Poltergeist', type: 'ゴースト', category: 'ぶつり', power: 110, accuracy: 90, pp: 5, contact: false },

  // ドラゴン
  { id: 'dragon_claw', name: 'ドラゴンクロー', nameEn: 'Dragon Claw', type: 'ドラゴン', category: 'ぶつり', power: 80, accuracy: 100, pp: 15, contact: true },
  { id: 'outrage', name: 'げきりん', nameEn: 'Outrage', type: 'ドラゴン', category: 'ぶつり', power: 120, accuracy: 100, pp: 10, contact: true },
  { id: 'draco_meteor', name: 'りゅうせいぐん', nameEn: 'Draco Meteor', type: 'ドラゴン', category: 'とくしゅ', power: 130, accuracy: 90, pp: 5, contact: false },
  { id: 'dragon_pulse', name: 'りゅうのはどう', nameEn: 'Dragon Pulse', type: 'ドラゴン', category: 'とくしゅ', power: 85, accuracy: 100, pp: 10, contact: false },
  { id: 'scale_shot', name: 'スケイルショット', nameEn: 'Scale Shot', type: 'ドラゴン', category: 'ぶつり', power: 25, accuracy: 90, pp: 20, contact: false },

  // あく
  { id: 'knock_off', name: 'はたきおとす', nameEn: 'Knock Off', type: 'あく', category: 'ぶつり', power: 65, accuracy: 100, pp: 20, contact: true },
  { id: 'sucker_punch', name: 'ふいうち', nameEn: 'Sucker Punch', type: 'あく', category: 'ぶつり', power: 70, accuracy: 100, pp: 5, contact: true },
  { id: 'crunch', name: 'かみくだく', nameEn: 'Crunch', type: 'あく', category: 'ぶつり', power: 80, accuracy: 100, pp: 15, contact: true },
  { id: 'dark_pulse', name: 'あくのはどう', nameEn: 'Dark Pulse', type: 'あく', category: 'とくしゅ', power: 80, accuracy: 100, pp: 15, contact: false },
  { id: 'kowtow_cleave', name: 'ドゲザン', nameEn: 'Kowtow Cleave', type: 'あく', category: 'ぶつり', power: 85, accuracy: 100, pp: 10, contact: true },

  // はがね
  { id: 'iron_head', name: 'アイアンヘッド', nameEn: 'Iron Head', type: 'はがね', category: 'ぶつり', power: 80, accuracy: 100, pp: 15, contact: true },
  { id: 'flash_cannon', name: 'ラスターカノン', nameEn: 'Flash Cannon', type: 'はがね', category: 'とくしゅ', power: 80, accuracy: 100, pp: 10, contact: false },
  { id: 'electro_shot', name: 'エレクトロビーム', nameEn: 'Electro Shot', type: 'でんき', category: 'とくしゅ', power: 130, accuracy: 100, pp: 10, contact: false },

  // フェアリー
  { id: 'moonblast', name: 'ムーンフォース', nameEn: 'Moonblast', type: 'フェアリー', category: 'とくしゅ', power: 95, accuracy: 100, pp: 15, contact: false },
  { id: 'play_rough', name: 'じゃれつく', nameEn: 'Play Rough', type: 'フェアリー', category: 'ぶつり', power: 90, accuracy: 90, pp: 10, contact: true },
  { id: 'dazzling_gleam', name: 'マジカルシャイン', nameEn: 'Dazzling Gleam', type: 'フェアリー', category: 'とくしゅ', power: 80, accuracy: 100, pp: 10, contact: false },
  { id: 'spirit_break', name: 'ソウルクラッシュ', nameEn: 'Spirit Break', type: 'フェアリー', category: 'ぶつり', power: 75, accuracy: 100, pp: 15, contact: true },

  // 特殊な技
  { id: 'rage_fist', name: 'ふんどのこぶし', nameEn: 'Rage Fist', type: 'ゴースト', category: 'ぶつり', power: 50, accuracy: 100, pp: 10, contact: true },
  { id: 'population_bomb', name: 'ネズミざん', nameEn: 'Population Bomb', type: 'ノーマル', category: 'ぶつり', power: 20, accuracy: 90, pp: 10, contact: true },
];
