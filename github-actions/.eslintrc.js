module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
}
