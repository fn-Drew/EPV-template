module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "airbnb",
        "prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "react-hooks"],
    rules: {
        "import/no-extraneous-dependencies": ["warn"],
    },
};
