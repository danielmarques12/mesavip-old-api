const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: ' bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
