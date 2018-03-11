import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import clientConfig from '../../../webpack/client.dev';
import serverConfig from '../../../webpack/server.dev';
import getSetting from '../settings';

const { profile } = getSetting(['webpack']);
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;

export default function webpackHandler(app) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(
    webpackDevMiddleware(multiCompiler, {
      publicPath,
      noInfo: !profile,
      serverSideRender: true,
    })
  );
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath },
    })
  );

  let isServerRunning = false,
    webpackUpdateCount = 0;

  multiCompiler.plugin('done', ({ stats: { 0: client, 1: server } }) => {
    const clientCollapse = (client.endTime - client.startTime) / 1000;
    const serverCollapse = (server.endTime - server.startTime) / 1000;

    const message =
      webpackUpdateCount === 0
        ? `[${
            'WEBPACK'.cyan
          }] compiled - [client: ${clientCollapse}s, server: ${serverCollapse}s]`
        : `[${'WEBPACK'.cyan}][${
            webpackUpdateCount.toString().cyan
          }] recompiled - [client: ${clientCollapse}s, server: ${serverCollapse}s]`;

    !isServerRunning &&
      app.listen(app.get('port'), () => {
        isServerRunning = true;
        console.log(
          `[${'EXPRESS'.magenta}] listening on http://localhost:${app.get(
            'port'
          )}`
        );
      });

    console.log(message.yellow);
    ++webpackUpdateCount;
  });
}
