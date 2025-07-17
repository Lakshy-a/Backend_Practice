import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules", "dist", "*.test.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // instead of `env: { node: true }`
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      // Replace deprecated `@eslint/js` with explicit recommended rules
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  {
    rules: {
      // disable formatting rules that conflict with Prettier
      ...prettierConfig.rules,
      "no-unused-vars": "off", // ⚠️ disables the check
      // "no-console": "off", // ⚠️ disables the check
      // "no-debugger": "off", // ⚠️ disables the check
      // "no-undef": "off", // ⚠️ disables the check
      // "no-unused-expressions": "off", // ⚠️ disables the check
      // "no-redeclare": "off", // ⚠️ disables the check
      // "no-shadow": "off", // ⚠️ disables the check
      // "no-constant-condition": "off", // ⚠️ disables the check
      // "no-async-promise-executor": "off", // ⚠️ disables the check
      // "no-unsafe-optional-chaining": "off", // ⚠️ disables
    },
  },
]);
