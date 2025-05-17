// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname の代用
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompatインスタンスの作成
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// エクスポートするeslint設定
export default [...compat.extends("next/core-web-vitals")];
