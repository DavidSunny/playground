const fs = require('fs');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const { resolve } = require('../webpack.config');
const paths = require('./helpers/paths');
const ruleSCSS = require('./helpers/rule.scss');

const externals = fs
  .readdirSync(paths.nodeModules)
  .filter(
    x =>
      !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        x
      )
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

const HOST = 'localhost'; // Set 192.xxx.x.xxx for testing mobile browsers
const PORT = '3000';

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', 'react-dates/initialize', paths.serverEntry],
  externals,
  output: {
    path: paths.serverBuildFolder,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.s?css$/,
        include: [
          /node_modules\/react-dates/,
          paths.globalSCSSEntry,
          paths.globalCSSEntry,
        ],
        use: ruleSCSS({ server: true, global: true }),
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/, paths.globalSCSSEntry, paths.globalCSSEntry],
        use: ruleSCSS({ server: true }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [paths.assets],
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            limit: 2500,
            outputPath: 'images/',
            publicPath: '/static/',
            emitFile: false,
          },
        },
      },
    ],
  },
  resolve,
  plugins: [
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.nodeModules),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BROWSER: false,
      SERVER: true,
      HOST,
      PORT,
    }),
  ],
  performance: {
    hints: false,
  },
};
