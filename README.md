Create React App無しでreactアプリの初期化
====

## STEP1. ライブラリのインストールとWebPackServerの起動まで

```bash
$ npm int -y

# install typescript
$ npm install typescript

# install react
# see https://react.dev/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page
$ npm install react react-dom

# mkdir
$ mkdir src
$ echo "console.log('Hello TypeScript');" > src/index.ts
```

webpack.config.jsの作成

```bash
# webpack
# see https://webpack.js.org/guides/installation/
$ npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
$ touch webpack.config.js
```

```js
//webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
```

package.jsonのscriptsに追加

```json
{ 
  ...
  "scripts": {
    "build": "webpack --config webpack.config.js --mode=development"
  },
  ...
}
```

```bash
$ npm run build
```

webpack-dev-serverの設定

```bash
$ mkdir public
$ touch public/index.html
```

```html:
// public/index.html
<!DOCTYPE html>
<html lang="ja">
<head></head>
<body>
<p>Example</p>
<div id="root"></div>
</body>
</html>
```

webpack dev server起動のコマンドをscriptsに追加

```json
{ 
  ...
  "scripts": {
    "start": "webpack serve --config webpack.config.js --mode=development"
  },
  ...
}
```


## STEP2. Reactのアプリを立ち上げるまで


```bash
# TypeScript + React開発に必要なライブラリと型情報を取得
$ npm install --save-dev ts-loader @types/react @types/react-dom

# index.tsをindex.tsxにリネーム
$ mv src/index.ts src/index.tsx
```

webpack.config.jsのentrypointも修正

```js
entry: "./src/index.ts",
↓
entry: "./src/index.tsx",
```

```tsx
// src/index.tsx
import { createRoot } from 'react-dom/client';
import App from "./components/App";

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

```tsx
// src/components/App.tsx
export default function App(){
  return (
    <div>App Component</div>
  )
}
```

tsxのロードが出来るように修正を行う。

```bash
$ npx tsc --init
```

tsconfig.jsonはサバイバルTypeScriptを参考

```json
//tsconfig.json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "jsx": "react-jsx",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "src",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"],
  "compileOnSave": false
}
```

※ ```"jsx": "react"```ではなく```"jsx": "react-jsx"```とする必要あり

webpack.config.jsにts-loaderを追加

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
}
```

画面表示を確認


## STEP3. React Routerを導入

```bash
$ npm install react-router-dom@latest
```

React Router DOMに合わせてindex.tsxを書き換える

https://reactrouter.com/en/main/start/tutorial


```tsx
//src/index.tsx
import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";

import {
  createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <div>Test Page</div>,
  },
]);
  

// Render your React component instead
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
```

## Tailwindcssの導入

参考 https://zenn.dev/kazuma_r5/articles/e6ca05ad2a30dd

```bash
$ npm install --save-dev tailwindcss
$ npx tailwindcss init
```

```json
# taildinw.config.jsを修正
content: [],
↓
content: ["./src/**/*.tsx"],
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 関連プラグインのインストール

```bash
$ npm install --save-dev mini-css-extract-plugin css-loader postcss postcss-loader
※ css-minimizer-webpack-pluginとautoprefixerは外した
```

## webpackの設定

```js
# webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

plugins: [
	...
	new MiniCssExtractPlugin({
		filename: "./css/index.css",
	}),
]

rules: [
	...
	{
		test: /\.css$/i,
		use: [
			MiniCssExtractPlugin.loader,
			"css-loader",
			"postcss-loader"
		],
	},
]
```

## postcss.config.js

```js
module.exports = {
	plugins: {
		tailwindcss: {},
	},
};
```

## index.ts

```ts
import './index.css';
```