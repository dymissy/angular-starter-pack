'use strict';

// Modules
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var __dist = __dirname + '/dist';

module.exports = function (env) {
  return {
    entry: {
      'app' : __dirname + '/src/app/root.module.js',
      'vendor' : ['angular'],
    },
    output: {
      path: __dist,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    },
    devtool: 'source-map',
    watch: false,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ["babel-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: __dirname + '/src/img',
        to: __dist + '/img'
      }]),
      new HtmlWebpackPlugin({
          template: __dirname + '/src/index.html',
          inject: 'body'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].[hash].js'
      }),
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
              screw_ie8: true,
              keep_fnames: true
          },
          compress: {
              screw_ie8: true
          },
          comments: false
      })
    ]
  }
};
