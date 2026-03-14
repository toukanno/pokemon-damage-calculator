import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ポケモンダメージ計算ツール',
  description: 'ポケモン対戦におけるダメージ計算を直感的かつ高速に行えるツール',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-bold text-slate-800">
              ポケモンダメージ計算ツール
            </h1>
            <div className="flex gap-2">
              <span className="text-xs text-slate-400">Gen 9</span>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
