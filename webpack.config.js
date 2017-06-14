const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './source/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'supervisor-status'
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true
    })
  ]
};
