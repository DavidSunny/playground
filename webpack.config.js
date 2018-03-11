const { resolveApp: _ } = require('./webpack/helpers/paths');

module.exports = {
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.css', '.scss'],
    alias: {
      _client: _('src/client'),
      _server: _('src/server'),
      _shared: _('src/shared'),
      _react: _('src/shared/react'),
      _redux: _('src/shared/redux'),
      _router: _('src/shared/router'),
      _components: _('src/shared/react/components'),
      _pages: _('src/shared/react/pages'),
      _hoc: _('src/shared/react/hoc'),
      _scss: _('src/shared/styles/scss'),
      _css: _('src/shared/styles/css'),
      _img: _('src/assets/img'),
    },
  },
};
