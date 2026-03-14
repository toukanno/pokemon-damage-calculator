# ポケモンダメージ計算ツール

ポケモン対戦におけるダメージ計算を、直感的かつ高速に行えるWebアプリケーション。

## 機能

- 攻撃側・防御側ポケモンの選択と育成型の入力
- レベル、性格、個体値、努力値、実数値の自動計算
- 特性、持ち物、技の選択
- タイプ相性の自動反映
- 天候、フィールド、壁、急所、テラスタル等の補正対応
- 最小～最大乱数ダメージ、割合、確定数の表示
- HPバー表示
- 計算結果の保存（ローカルストレージ）
- URL共有機能
- PC/スマホ対応レスポンシブUI

## 技術スタック

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# テスト実行
npm test

# ビルド
npm run build
```

## プロジェクト構成

```
src/
├── app/          # Next.js App Router
├── components/   # React UIコンポーネント
├── core/         # ダメージ計算エンジン（UI非依存）
│   ├── types.ts           # 型定義
│   ├── stats.ts           # ステータス計算
│   ├── damage.ts          # ダメージ計算
│   ├── type-effectiveness.ts  # タイプ相性
│   ├── ability-modifiers.ts   # 特性補正
│   └── item-modifiers.ts     # 持ち物補正
├── data/         # マスタデータ（ポケモン、技、特性、持ち物、性格）
├── hooks/        # React Hooks
└── lib/          # ユーティリティ（URL共有、デフォルト値）
```
