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
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      sourceMapFilename: '[name].map'
    },
    devtool: 'cheap-module-source-map',
    watch: true,
    plugins: [
      new CopyWebpackPlugin([{
        from: __dirname + '/src/img',
        to: __dist + '/img'
      }, {
        from: __dirname + '/src/app/**/*.html',
        to: __dist,
        transformPath: function(targetPath, sourcePath) {
          return targetPath.replace('src/app/', '');
        }
      }]),
      new HtmlWebpackPlugin({
          template: __dirname + '/src/index.html',
          inject: 'body'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].bundle.js'
      }),
    ],
    devServer: {
      contentBase: __dist,
      compress: true,
      port: 9000
    }
  }
};
