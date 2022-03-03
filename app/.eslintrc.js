module.exports = {
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
      },
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'import/prefer-default-export': 'off',
    '@next/next/no-img-element': 'off',
  }
}
