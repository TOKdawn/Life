const merge = require('webpack-merge')
const path = require('path')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  mode: 'development',
})
