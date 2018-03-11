import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import configureStore from './configureStore';
import App from '_react/App';

export default stats =>
  async function serverRender(req, res) {
    const { clientStats } = stats;
    const store = await configureStore(req, res);

    // no store means redirect was already served
    if (!store) return;

    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    console.time(`[${'SERVER-SIDE-RENDERING'.red}] collapse time'`);
    const appString = renderToString(app);
    console.timeEnd(`[${'SERVER-SIDE-RENDERING'.red}] collapse time'`);

    const chunkNames = flushChunkNames();
    console.log(`[${'CHUNK-NAMES'.blue}]`, chunkNames);

    const chunks = flushChunks(clientStats, { chunkNames });

    const assets = stats.clientStats.assets;

    const vendor = assets.find(obj => obj.name.startsWith('js/vendor'));

    if (!vendor) throw new Error('vendor.js is required');

    const stateJson = JSON.stringify(store.getState());

    const helmet = Helmet.renderStatic();

    console.log(`[${'REQUEST-PATH'.blue}] '${req.path}'`);
    return res.send(`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
        ${helmet.title.toString()}
        ${chunks.styles}
      </head>
      <body>
        <script>window.REDUX_STATE = ${stateJson}</script>
        <div id="root">${appString}</div>
        <div id="modal"></div>
        ${chunks.cssHash}
        <script type='text/javascript' src='/static/${vendor.name}'></script>
        ${chunks.js}
      </body>
    </html>`);
  };
