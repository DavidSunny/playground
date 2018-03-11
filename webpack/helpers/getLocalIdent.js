const loaderUtils = require('loader-utils');

module.exports = function getLocalIdent(
  isGlobalStyle,
  context,
  localIdentName,
  localName,
  options
) {
  if (isGlobalStyle) return localName;

  // the same as
  // `localIdentName: isGlobalStyle ? '[local]' : '[name]-[local]__[hash:base64:5]'`
  // Use the filename or folder name , based on some uses the `index.js`
  // e.g, `index.s?css` project style
  const fileNameOrFolder =
    context.resourcePath.endsWith('index.scss') ||
    context.resourcePath.endsWith('index.css')
      ? '[folder]'
      : '[name]';

  // Create a hash based on a the file location and class name.
  // Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    context.resourcePath + localName,
    'md5',
    'base64',
    5
  );

  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '-' + localName + '__' + hash,
    options
  );

  return className;
};
