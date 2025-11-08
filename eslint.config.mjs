// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
  // Disable all TypeScript strictness
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/await-thenable': 'off',
  '@typescript-eslint/no-misused-promises': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/consistent-type-imports': 'off',

  // Disable core JS rules that might complain
  'no-console': 'off',
  'no-empty-function': 'off',
  'no-unused-vars': 'off',
  'no-undef': 'off',
  'no-var': 'off',
  'prefer-const': 'off',
  eqeqeq: 'off',

  // Keep Prettier for formatting only
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      semi: true,
      trailingComma: 'all',
      printWidth: 100,
      tabWidth: 2,
      endOfLine: 'auto',
    },
  ],
},

  },
);
