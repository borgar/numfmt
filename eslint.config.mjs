import borgarLint from '@borgar/eslint-config';
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.mjs',
    ],
    ignores: [
      'dist/*',
    ],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { projectService: { allowDefaultProject: [] } },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  borgarLint.config.recommended,
  borgarLint.config.stylistic({
    commaDangle: false,
    singleBlocks: true,
    lineLength: 120,
  }),
  {
    rules: {
      '@stylistic/array-element-newline': 'off',
      // // next 2 rules are brittle and not really doing much that TS isn't already doing
      // '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      // '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      // 'no-use-before-define': 'error',
      // 'no-labels': 'error',
      // 'no-restricted-syntax': [ 'error', 'SwitchStatement' ],
      // 'no-shadow': [ 'error', { builtinGlobals: false } ],
    },
  },
);

/*

{
  "extends": [ "@borgar/eslint-config", "@borgar/eslint-config/jsdoc" ],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "requireConfigFile": false,
  },
  "rules": {
    "import/export": "error",
    "import/no-unresolved": "error",
    "no-mixed-operators": "off",
    "jsdoc/no-undefined-types": "off",
    "newline-per-chained-call": "off"
  },
  "globals": {
    "BigInt": true,
    "console": true,
    "Set": true,
    "require": true,
    "module": true,
  },
  "plugins": [
    "import"
  ]
}

*/
