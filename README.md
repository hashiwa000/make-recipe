# make-recipe

AIを使って1週間分の献立（朝/昼/夜）を自動生成する Next.js アプリです。OpenAI API を用いて、アレルギーや嗜好、時間・予算などの条件に合わせたプランを返します。

## 概要
- フロントエンド: Next.js 14（App Router）
- サーバー: API Route（`app/api/mealplan/route.ts`）
- モデル呼び出し: `openai` Node SDK（`OPENAI_API_KEY` が必要）

## 要件
- Node.js 18 以上
- npm
- OpenAI API キー（環境変数 `OPENAI_API_KEY`）

## セットアップ
1. 依存関係をインストール
   ```bash
   make setup
   ```
2. 環境変数を設定（ルートに `.env.local` を作成）
   ```env
   OPENAI_API_KEY=あなたのAPIキー
   ```

## 起動
- 開発サーバー
  ```bash
  make dev
  # http://localhost:3000 を開く
  ```
- 本番ビルド/起動
  ```bash
  make build
  make start
  ```

## API
- エンドポイント: `POST /api/mealplan`
- リクエストBody:
  ```json
  {
    "preferences": {
      "allergies": "卵, 乳",
      "dislikes": "辛いものを避ける",
      "timePerMeal": "20分",
      "budget": "1500円",
      "servings": 2
    }
  }
  ```
- レスポンス（要旨）: 7日分（`week` 配列）の献立を返します。
  - `day`: 日付/曜日などの文字列
  - `meals`: `{ breakfast, lunch, dinner, calories?, ingredients? }`

サンプル（curl）:
```bash
curl -X POST http://localhost:3000/api/mealplan \
  -H 'Content-Type: application/json' \
  -d '{"preferences": {"servings": 2}}'
```

## 開発コマンド
- Lint: `make lint`
- 型チェック: `make typecheck`
- 開発起動: `make dev`
- ビルド: `make build`
- 起動: `make start`

※ フォーマットはプロジェクト設定に合わせて必要に応じて導入してください。

## ディレクトリ
```
app/
  api/mealplan/route.ts   # 献立生成API（OpenAI呼び出し）
  layout.tsx              # アプリのレイアウト
  page.tsx                # フロントUI（条件入力/結果表示）
```

## 環境・注意
- `OPENAI_API_KEY` は `.env.local` などに保存し、リポジトリへコミットしないでください。
- 外部APIに依存するため、ネットワーク環境とAPIキーの権限/残高に注意してください。

## ライセンス
Apache-2.0（`LICENSE` を参照）
