/* globals process */
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: pkg.module,
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [ '@babel/preset-env' ]
    })
  ],
  output: {
    exports: 'default',
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
    plugins: [ isProd && uglify() ]
  }
};
