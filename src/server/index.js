import 'babel-polyfill';
import 'colors';
import express from 'express';
import applyMiddlewares from './middlewares';

void (async function() {
  const app = express();
  // 서버 환경변수 셋팅 //
  app.set('port', process.env.PORT || 3000);

  // 서버 미들웨어 적용 //
  applyMiddlewares(app);
})();

// Catch errors
process.on('unhandledRejection', e =>
  console.error('Catch: unhandledRejection - ', e.stack)
);
process.on('uncaughtException', e => {
  console.log('Catch: uncaughtException - ', e.stack);
});
