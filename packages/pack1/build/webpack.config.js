const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../lib/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js'
  }
}