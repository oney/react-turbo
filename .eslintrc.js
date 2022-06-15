module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['react-app', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': { node: { extensions: ['.ts', '.tsx'] } },
  },
};
