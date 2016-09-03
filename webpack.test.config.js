const path         = require('path');
const escapeRegExp = require('escape-string-regexp');

const project      = require('./package.json');
const webpack = require('webpack');


module.exports = {

  target: 'node',

  entry: [
    'babel-polyfill',
    'whatwg-fetch'
  ],

  output: { libraryTarget: 'commonjs' },

  externals: (
    Object
      .keys(project.dependencies)
      .concat(Object.keys(project.devDependencies))
      .map(module => new RegExp(`^${escapeRegExp(module)}(?:\/.*)?$`))
  ),

  devtool: '#sourcemap',

  resolve: {
    alias: {
      'test-utils'   : path.join(process.cwd(), 'test', 'utils', 'utils'),
      components: path.join(process.cwd(), 'src', 'components'),
      filters: path.join(process.cwd(), 'src', 'filters'),
      reducers: path.join(process.cwd(), 'src', 'reducers'),
      selectors: path.join(process.cwd(), 'src', 'selectors'),
      actions: path.join(process.cwd(), 'src', 'actions'),
      services: path.join(process.cwd(), 'src', 'services'),
      data: path.join(process.cwd(), 'src', 'data'),
      config: path.join(process.cwd(), 'src', 'config') + '/config.mock.json'
    },
    extensions: [ '', '.js', '.jsx' ],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
      'React': 'react'
    })
  ],

  module: {
    loaders: [
      {
        test   : /\.jsx?$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test   : /\.css$/,
        loaders: [
          'css/locals?modules&importLoaders=0&localIdentName=[name]__[local]__[hash:base64:5]',
        ],
      },
      {
        test   : /\.scss$/,
        loaders: [
          'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.join(__dirname, 'src')]
      }
    ],
  },

}
