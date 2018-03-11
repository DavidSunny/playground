/**
 - Rule ref : https://eslint.org/docs/rules/
 - Rules value :: ['off' | 'warn' | 'error'] === [ 0 | 1 | 2 ]
 - Comment out
  1. /* eslint-disable no-undefined /
  2. // eslint-disable-next-line
 */

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'react',
    'flowtype',
    'prettier',
    'import',
  ],
  extends: [
    'plugin:flowtype/recommended',
    'prettier',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.css', '.scss']
      },
      webpack: {
        config: './webpack.config.js'
      }
    }
  },
  rules: {
    'prettier/prettier': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'import/no-unresolved': [1, {commonjs: true, amd: true}],
    'import/named': 2, //for flow type import
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'no-undefined': 1,
    'no-unused-vars': 1,
    'no-var': 1,
    'no-undef': 1,
    'no-console': 1,
  }
};
