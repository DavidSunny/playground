export const nodeEnv = process.env.NODE_ENV;
export const isDev = nodeEnv === 'development';
export const isBrowser = process.env.BROWSER;
export const isServer = process.env.SERVER;
export const isOnLogger = false;
