const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.js'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(path.join(__dirname, 'dist')),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
            loader: 'html-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'sprites/[name].[ext]',
          },
        },
      },
      {
        test: /\.(ttf|mp3|wav)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        type: 'javascript/auto',
        test: /\.(json|atlas|conf|ani)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'sprites/[name].[ext]',
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },

}
