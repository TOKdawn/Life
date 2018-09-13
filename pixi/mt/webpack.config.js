/* eslint-disable */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // devtool: 'source-map', //配置生成Source Maps，选择合适的选项
    entry: __dirname + "/src/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方

        // publicPath: '/assets/',
        filename: "finish.js", //打包后输出文件的文件名
    },

    module: { //在配置文件里添加JSON loader
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // sass文件处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }, {
                test: /.(gif|jpg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 819,
                        name: 'assets/images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(atlas|conf|ani)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: 'assets/images/[name].[ext]'
                    }
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                // use: ['happypack/loader?id=happy-font']
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 819,
                        name: 'assets/font/[name].[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 819,
                        name: 'assets/media/[name].[hash:7].[ext]'
                    }
                }]
            },


        ]
    },

    plugins: [
        new webpack.BannerPlugin("Copyright helloint org."), //在这个数组中new一个就可以了
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new ExtractTextPlugin("css/[name].css"),

    ],


}