const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ' bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
