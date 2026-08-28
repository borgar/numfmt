import borgarLint from '@borgar/eslint-config';
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.mjs'
    ],
    ignores: [
      'dist/*'
    ],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { projectService: { allowDefaultProject: [] } }
    }
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  borgarLint.config.recommended,
  borgarLint.config.stylistic({
    commaDangle: false,
    singleBlocks: true,
    lineLength: 120
  }),
  {
    rules: {
      '@stylistic/array-element-newline': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      // rule is currently bugged
      'no-useless-assignment': 'off'
    }
  }
);
