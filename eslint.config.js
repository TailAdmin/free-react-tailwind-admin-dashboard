import js from "@eslint/js";
import oxlint from "eslint-plugin-oxlint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "public/maplibre"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended, // non-type-aware only; Oxlint owns type-aware
      reactHooks.configs.flat.recommended, // keeps the newer v7 compiler-based rules
      reactRefresh.configs.vite,
    ],
    languageOptions: { ecmaVersion: "latest", globals: globals.browser },
  },
  // MUST be last: disables every rule already enabled in .oxlintrc.json
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json", {
    typeAware: true,
  }),
]);
