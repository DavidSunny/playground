import axios from 'axios';
import getTuple from './getTuple';

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const instance = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
  timeout: 1000,
  headers: { Accept: 'application/json' },
});

export default function fetchData(url, options = {}) {
  if (!url) throw new Error('url is required');
  options.method = options.method || 'get';
  options.jwToken = options.jwToken || '';
  options.payload = options.payload || {};

  return getTuple(
    instance[options.method](url, {
      data: options.payload,
      headers: {
        Authorization: `Bearer ${options.jwToken}`,
      },
    })
  );
}
