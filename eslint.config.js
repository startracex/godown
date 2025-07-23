import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import stylisticRules from "@startracex/dev-config/stylistic";

export default defineConfig([
  globalIgnores(["**/*.d.ts", "**/*.js", "**/*.cjs", "**/*.jsx"]),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@stylistic": stylistic,
    },
    files: [
      "**/*.ts"
    ],
    rules: stylisticRules.rules,
  },
]);
