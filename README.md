# UnownedMintImageCreator

OpenSea出品用の画像を生成するWEBアプリケーションです。

## 機能

- **SVG画像生成**: 1024x1024px の正方形SVG画像を生成
- **リアルタイムプレビュー**: パラメータの変更をリアルタイムで確認
- **作者表示機能**: 画像の右下に作者名を表示可能
- **日本語UI**: 全ての操作が日本語で可能
- **レスポンシブデザイン**: モバイルデバイスにも対応
- **ダウンロード機能**: 生成した画像をSVGファイルとしてダウンロード

## パラメータ

| パラメータ名 | 型 | 説明 | デフォルト値 |
|-------------|----|----- |-------------|
| text | string | 中央に表示する文字列 | "愛" |
| authorText | string (任意) | 右下に表示する作者名 | "" (空文字) |
| font | string | 使用フォント | "Noto Sans JP" |
| fontSize | number (任意) | 文字サイズ（px） | 自動調整 |
| fontColor | string (任意) | 文字色 | "#333333" |
| outlineColor | string (任意) | ふちの色 | "#000000" |
| outlineWidth | number (任意) | ふちの太さ（px） | 5 |
| cornerRadius | number (任意) | 角丸半径（px） | 30 |
| borderColor | string (任意) | 外周線色 | "#000000" |
| borderWidth | number (任意) | 外周線太さ（px） | 8 |

## 画像仕様

- **形式**: SVG
- **アスペクト比**: 正方形（1:1）
- **サイズ**: 1024x1024px
- **背景色**: 白（#FFFFFF）
- **テキスト配置**: 中央
- **作者表示**: 右下（任意）

## 技術スタック

- React 19 with TypeScript
- Vite (ビルドツール)
- CSS Grid (レスポンシブレイアウト)
- GitHub Pages (ホスティング)

## 開発

### 前提条件

- Node.js 20以上
- npm

### セットアップ

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### デプロイ

GitHub Actionsにより、mainブランチへのプッシュ時に自動的にGitHub Pagesにデプロイされます。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
