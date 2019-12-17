const merge = require('webpack-merge')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const common = require('./webpack.common.js')


module.exports = merge(common, {
  plugins: [
    new UglifyjsWebpackPlugin({
      sourceMap: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  mode: 'production',
})
