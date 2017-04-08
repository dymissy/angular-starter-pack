'use strict';

// Modules
const webpack = require('webpack');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const __dist = __dirname + '/dist';

module.exports = function (env) {
  return {
    entry: {
      'app' : __dirname + '/src/app/root.module.js',
      'vendor' : ['angular'],
      'style': glob.sync(__dirname + '/src/sass/**/*.scss'),
    },
    output: {
      path: __dist,
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].bundle.js',
      sourceMapFilename: 'js/[name].map'
    },
    devtool: 'cheap-module-source-map',
    watch: true,
    module: {
      rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }]
    },
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
        filename: 'js/[name].bundle.js'
      }),
      new ExtractTextPlugin('css/[name].bundle.css')
    ],
    devServer: {
      contentBase: __dist,
      compress: true,
      port: 9000
    }
  }
};
