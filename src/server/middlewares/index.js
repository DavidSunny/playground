import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import devHandler from './devHandler';
import errorHandler from './errorHandler';
import searchRouter, { prefix as searchPrefix } from '../api/searchRouter';

const rootPrefix = '/api/v1';

export default function applyMiddlewares(app) {
  // 미들웨어 등록
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  // API 등록
  app.use(rootPrefix + searchPrefix, searchRouter);

  // For development, 트랜스파일 : ES6+ >> ES5
  const isDev = process.env.NODE_ENV === 'development';

  // Serve static files
  app.use('/assets', express.static(path.join(process.cwd(), 'src/assets')));

  isDev && devHandler(app);

  // 에러 핸들러는 가장 마지막 미들웨어로 등록
  errorHandler(app);
}
