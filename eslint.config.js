const { defineConfig } = require("eslint/config");
const globals = require("globals");
// const path = require("node:path");
// ...existing code...
const js = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");

// __filename and __dirname are available by default in CommonJS
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 12,
      sourceType: "commonjs",
    },

    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-undef": "error",
    },
  },
]);
