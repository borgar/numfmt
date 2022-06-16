/* global __dirname */
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    library: 'numfmt',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: './numfmt.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    path: path.resolve(__dirname)
  },
  optimization: {
    minimize: true,
    minimizer: [ new TerserPlugin({ extractComments: false }) ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      }
    ]
  }
};
