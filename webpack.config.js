const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './lib/index.js',
  output: {
    library: 'numfmt',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: './numfmt.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  optimization: {
    minimize: true,
    minimizer: [ new TerserPlugin() ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
