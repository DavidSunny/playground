import createHistory from 'history/createBrowserHistory';

const history = process.env.BROWSER ? createHistory() : null;

export const goBack = () => {
  history.goBack();
};

export const go = n => {
  history.go(n);
};
