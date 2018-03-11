const path = require('path');
const fs = require('fs');

console.log('webpack paths file loaded in NODE_ENV - ', process.env.NODE_ENV);

// Process symbolic link
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  resolveApp,
  appRoot: resolveApp('.'),
  srcRoot: resolveApp('src'),
  nodeModules: resolveApp('node_modules'),
  clientEntry: resolveApp('src/client/index.js'),
  serverEntry: resolveApp('src/server/render.js'),
  clientBuildFolder: resolveApp('build/public'),
  serverBuildFolder: resolveApp('build/server'),
  globalSCSSEntry: resolveApp('src/shared/styles/scss/main.scss'),
  globalCSSEntry: resolveApp('src/shared/styles/css/main.css'),
  scssContext: resolveApp('src/shared/styles/scss'),
  assets: resolveApp('src/assets'),
};
