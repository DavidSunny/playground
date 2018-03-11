const autoprefixer = require('autoprefixer');
const flexBugFixes = require('postcss-flexbugs-fixes');
const paths = require('./paths');
const getLocalIdent = require('./getLocalIdent');

module.exports = (options = {}) => {
  const { global = false, server = false } = options;

  return [
    {
      loader: `css-loader${server ? '/locals' : ''}`,
      options: {
        modules: true,
        minimize: false,
        importLoaders: 2,
        sourceMap: true,
        getLocalIdent: getLocalIdent.bind(null, global),
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        // https://webpack.js.org/guides/migrating/#complex-options
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          flexBugFixes,
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        includePaths: [paths.scssContext],
        outputStyle: 'nested',
      },
    },
  ];
};
