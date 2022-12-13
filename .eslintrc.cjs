/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-strongly-recommended",
        "plugin:vue/vue3-recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-typescript/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

        "no-unused-vars": "off",

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
};
