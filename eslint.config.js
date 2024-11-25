import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
    {ignores: ["dist"]},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        rules: {
            "indent": ["error", 2, {"SwitchCase": 2}],
            "quotes": ["error", "double"],
            "semi": ["error", "never"],
            "linebreak-style": ["error", "unix"],
            "max-len": ["error", {"code": 120}],
            "no-trailing-spaces": "error",
            "space-before-function-paren": ["error", "never"],
            "eol-last": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "object-curly-spacing": ["error", "always"]
        }
    }
)
