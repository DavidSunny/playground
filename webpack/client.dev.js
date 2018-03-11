const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const { resolve } = require('../webpack.config');
const paths = require('./helpers/paths');
const ruleSCSS = require('./helpers/rule.scss');

const HOST = 'localhost'; // Set 192.xxx.x.xxx for testing mobile browsers
const PORT = '3000';

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false&overlay=true',
    'react-hot-loader/patch',
    'react-dates/initialize',
    paths.clientEntry,
  ],
  output: {
    filename: 'js/[name].js',
    chunkFilename: '[name].js',
    path: paths.clientBuildFolder,
    publicPath: '/static/',
  },
  module: {
    // Since webpack 2.3.0,
    // makes missing `exports` an error instead of warning
    strictExportPresence: true,
    rules: [
      // First, run the `ESLinter`.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.js$/,
        include: paths.srcRoot,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter,
              fix: true,
              cache: true,
              quiet: true, // warning off, only show error
            },
          },
        ],
      },
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
        use: ExtractCssChunks.extract({
          use: ruleSCSS({ global: true }),
        }),
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/, paths.globalSCSSEntry, paths.globalCSSEntry],
        use: ExtractCssChunks.extract({
          use: ruleSCSS(),
        }),
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
            emitFile: true,
          },
        },
      },
    ],
  },
  resolve,
  plugins: [
    new BrowserSyncPlugin(
      {
        host: HOST,
        port: 3001,
        proxy: { target: `http://${HOST}:${PORT}` },
        reloadDebounce: 1000,
        injectChanges: false,
        open: false,
      },
      {
        // Set `true` for HRM fallback
        reload: false,
      }
    ),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.nodeModules),
    // used so you can see what chunks are produced in dev mode
    new WriteFilePlugin(),
    // CSS 코드 청크로 추출하기
    new ExtractCssChunks(),
    // 공통 코드를 bootstrap 으로 추출
    new webpack.optimize.CommonsChunkPlugin({
      // needed to put webpack bootstrap code before chunks
      names: ['bootstrap'],
      filename: 'js/[name].js',
      minChunks: Infinity, // 공통 코드 추출에서 node_modules 폴더는 제외시킴
    }),

    new webpack.HotModuleReplacementPlugin(),
    // 빌드단계에서 어떠한 에러라도 감지되면 assets emitting skip
    new webpack.NoEmitOnErrorsPlugin(),
    // 브라우저 콘솔창에 HRM 업데이트된 파일들의 로그를 id가 아닌 path 로 프린트
    new webpack.NamedModulesPlugin(),
    // 브라우저에서는 process.env 변수를 사용하지 못하기때문에
    // 서버와 동일하게 환경변수를 사용할 수 있도록 임의로 주입
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BROWSER: true,
      SERVER: false,
      HOST,
      PORT,
    }),
    // 빠른 리빌드목적
    // `./node_modules/.cache/autodll-webpack-plugin/` 에 캐시저장
    // `entry.vendor` 배열의 엘리먼트에 셋팅한 node 모듈을
    // 메인번들링에서 제외하고 벤더로 따로 번들링함
    new AutoDllPlugin({
      context: paths.appRoot,
      path: './js',
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'redux-thunk',
          'history/createBrowserHistory',
          'redux-first-router',
          'redux-first-router-link',
          'redux-devtools-extension/logOnlyInProduction',
          'numeral',
        ],
      },
    }),
  ],
  // 브라우저 환경에서 NodeJS 전용 모듈이 import 되는 경우 문제가 발생하는데
  // 이 문제를 해결하기 위해 웹팩에 문제가 되는 NodeJS 모듈을 mock 값으로 맵핑하여
  // 해당 모듈의 import 가 브라우저에서 문제없이 작동되도록 하기 위해 셋팅
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    // 개발시 어떠한 error 또는 wanning 발생하지 않도록 hint 를 off
    // false | "error" | "warning"
    hints: false,
  },
};
