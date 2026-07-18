# Hacker Typing

ハッカータイピング練習WEBアプリケーション

## 概要

このプロジェクトは、タイピング速度と精度を測定・練習できるWEBアプリケーションです。ハッカーテーマのUIで、楽しみながらタイピングスキルを向上させることができます。

## 機能（予定）

- タイピング練習モード
- スコア計測
- ランキング表示
- 難易度選択
- リアルタイム統計

## 技術スタック

- **フロントエンド**: React 18
- **言語**: TypeScript
- **ビルドツール**: Vite
- **スタイル**: CSS3

## セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` が自動的に開きます。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## プロジェクト構造

```
20260718_hackertyping/
├── public/           # 静的ファイル
├── src/
│   ├── App.tsx      # メインアプリケーション
│   ├── App.css      # アプリケーションスタイル
│   ├── index.css    # グローバルスタイル
│   └── main.tsx     # エントリーポイント
├── index.html       # HTMLテンプレート
├── package.json     # 依存パッケージ
├── tsconfig.json    # TypeScript設定
└── vite.config.ts   # Vite設定
```

## ライセンス

MIT

## 作成日

2026-07-18
