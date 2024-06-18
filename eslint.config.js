/* eslint-disable no-undef */
/* eslint-env node */

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    {
        plugins: {
            "typescript-eslint": tseslint.plugin,
        },
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                project: "./tsconfig.json",
                extraFileExtensions: [".vue"],
                sourceType: "module",
            },
        },
    },
    {
        rules: {
            "no-console":
                process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger":
                process.env.NODE_ENV === "production" ? "warn" : "off",

            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],

            "vue/no-unused-components": "warn",
            "vue/no-unused-properties": [
                "warn",
                {
                    groups: ["props", "data", "computed", "methods"],
                    deepData: false,
                },
            ],
        },
    },
    // Any other config imports go at the top
    eslintPluginPrettierRecommended,
);
