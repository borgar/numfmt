import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: 'lib/index.js',
    format: 'cjs',
    clean: true,
  },
  {
    entry: 'lib/index.js',
    format: 'esm',
    platform: 'neutral',
  },
]);
