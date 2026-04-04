const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');
const globals = require('globals');

// eslint-config-next v16 exports a native flat config array
const nextConfig = require('eslint-config-next/core-web-vitals');

// FlatCompat is used only for airbnb-base (no React plugin), since airbnb's
// full config and airbnb-typescript both have circular reference / version
// incompatibility issues with eslint 9. React and TypeScript rules are already
// covered by next/core-web-vitals (which includes typescript-eslint v8).
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Scope airbnb-base to TypeScript files only, preserving the old --ext .ts,.tsx behaviour
const airbnbConfigs = compat.extends('airbnb-base').map((config) => ({
  ...config,
  files: ['**/*.{ts,tsx}'],
}));

module.exports = [
  { ignores: ['coverage/**', 'out/**', '.next/**'] },
  ...nextConfig,
  ...airbnbConfigs,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // TypeScript resolves modules without file extensions
      'import/extensions': 'off',
      // TypeScript itself enforces unused variables
      'no-unused-vars': 'off',
      // Allow devDependencies in test files
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: ['**/*.test.{ts,tsx}'],
      }],
      // Project-specific overrides
      'react/function-component-definition': [2, { namedComponents: 'function-declaration' }],
      'import/prefer-default-export': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
  // Jest globals for test files
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'react/display-name': 'off',
    },
  },
];
