'use strict';

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

delete webpackConfig.devtool;

// set entry. To remove react hot loader enties
webpackConfig.entry = './src/index';

// Set the correct relative path
webpackConfig.output.path = './static';

webpackConfig.resolve.alias.config = 'config/config.production.json';

// To remove the development custom rules
webpackConfig.eslint = {
  configFile: '.eslintrc'
};

// minification FTW
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
}));

// define NODE_ENV to use the minified version of react in production
webpackConfig.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
}));

// get rid of react-hot loader
webpackConfig.module.loaders[0].loaders = ['babel'];

module.exports = webpackConfig;
