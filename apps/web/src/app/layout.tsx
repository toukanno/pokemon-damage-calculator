import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ポケモンダメージ計算ツール',
  description: 'ポケモン対戦のダメージ計算を直感的かつ高速に行えるツール',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
