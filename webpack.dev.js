'use strict';

// Modules
const webpack = require('webpack');
const glob = require('glob');
const autoprefixer = require('autoprefixer');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const __dist = __dirname + '/dist';

module.exports = function (env) {
  return {
    entry: {
      'app' : __dirname + '/src/app/root.module.js',
      'vendor' : ['angular'],
      'style': __dirname + '/src/sass/main.scss',
      'vendor-style': [
        __dirname + '/node_modules/angular/angular-csp.css',
      ],
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
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        }),
        exclude: __dirname + '/node_modules'
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }),
        exclude: __dirname + '/src'
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
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            autoprefixer(),
          ]
         }
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
