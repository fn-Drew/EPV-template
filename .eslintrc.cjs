module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'airbnb',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
    ],
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
    },
};
