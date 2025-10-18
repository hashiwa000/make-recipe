export const metadata = {
  title: "Make Recipe",
  description: "来週の献立をAIで提案",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Noto Sans JP, sans-serif', margin: 0 }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: 16 }}>
          <header style={{ padding: '16px 0' }}>
            <h1 style={{ margin: 0 }}>Make Recipe</h1>
            <p style={{ margin: '4px 0 0', color: '#555' }}>OpenAIで1週間の献立を自動生成</p>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

