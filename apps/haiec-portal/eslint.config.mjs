// @ts-check
import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";

const srcRuleOverrides = {
  "prettier/prettier": 1,
  "@typescript-eslint/no-unused-vars": 1,
  "@typescript-eslint/no-non-null-assertion": "error",
  "@typescript-eslint/no-empty-object-type": 1,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,

  // @ts-ignore
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const patchedConfig = fixupConfigRules([
  ...compat.extends("next/core-web-vitals"),
]);

const config = [
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  // Add more flat configs here
  { ignores: [".next/*"], rules: srcRuleOverrides },
];

export default config;
