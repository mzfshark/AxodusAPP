// .eslintrc.js
module.exports = {
    parser: 'babel-eslint', // Usar o parser Babel para entender JSX
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true, // Permitir JSX
      },
    },
    plugins: ['react'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Desativa a regra que exige o React no escopo (não é mais necessário no React 17+)
    },
  };
  