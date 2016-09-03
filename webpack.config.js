'use strict';

var webpack = require('webpack');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: '/static',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    alias: {
      config: 'config/config.' + process.env.NODE_ENV + '.json'
    },
    extensions: ['', '.js', '.jsx', '.scss', '.es6', '.json']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
    })
  ],
  eslint: {
    configFile: '.eslintrc',
    rules: {
      "no-unused-vars": 1,
      "no-debugger": 1
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.(png|jpg|woff|eot|svg|ttf)$/,
        loader: 'file',
        query: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: ['./src']
      }
    ]
  }
};
