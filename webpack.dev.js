// const path = require("path");
// const webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//
// module.exports = [{
//     mode: "development",
//     target: 'node',
//     entry: {
//         server: './src/server.js'
//     },
//     output: {
//         filename: 'server.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader']
//             }, {
//                 test: /\.less$/,
//                 exclude: /node_modules/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             importLoaders: 1,
//                             modules: {
//                                 localIdentName: '[name]-[local]-[hash:base64:5]'
//                             },
//                             localsConvention: 'asIs'
//                         }
//                     },
//                     { loader: 'less-loader' }
//                 ]
//             }, {
//                 test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name: '[name].[ext]',
//                             outputPath: 'fonts/'
//                         }
//                     }
//                 ]
//             }, {
//                 test: /\.png$/,
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name: '[name].[ext]',
//                             outputPath: 'images/'
//                         }
//                     }
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: 'styles.css'
//         })
//     ]
// },{
//     mode: "development",
//     entry: {
//         client: path.resolve(__dirname, "./src/client.js")
//     },
//     output: {
//         path: path.resolve(__dirname, "./dist"),
//         filename: "[name].js"
//     },
//     target: 'web',
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader']
//             }, {
//                 test: /\.less$/,
//                 exclude: /node_modules/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             importLoaders: 1,
//                             modules: {
//                                 localIdentName: '[name]-[local]-[hash:base64:5]'
//                             },
//                             localsConvention: 'asIs'
//                         }
//                     },
//                     { loader: 'less-loader' }
//                 ]
//             }, {
//                 test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name: '[name].[ext]',
//                             outputPath: 'fonts/'
//                         }
//                     }
//                 ]
//             }, {
//                 test: /\.png$/,
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name: '[name].[ext]',
//                             outputPath: 'images/'
//                         }
//                     }
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new CleanWebpackPlugin(),
//         // new HtmlWebpackPlugin({
//         //     template: path.resolve(__dirname, "./src/index.html"),
//         //     inject: false
//         // }),
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify('development')
//         }),
//         new MiniCssExtractPlugin({
//             filename: '[name].css'
//         })
//     ]
// }];
