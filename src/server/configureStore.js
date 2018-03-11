import createHistory from 'history/createMemoryHistory';
import { NOT_FOUND } from 'redux-first-router';
import { isEmpty } from 'ramda';
import queryString from 'query-string';
import clientConfigureStore from '_client/configureStore';

export default (async function configureStore(req, reply) {
  const preLoadedState = {};

  const path =
    req.path +
    (isEmpty(req.query) ? '' : `?${queryString.stringify(req.query)}`);

  const history = createHistory({ initialEntries: [path] });
  const { store, thunk } = clientConfigureStore(history, preLoadedState);

  let location = store.getState().location;

  if (doesRedirect(location, reply)) return false;

  // `redux-thunk` 를 사용해서 AJAX 요청과 `dispatch` 작업을 수행
  // e.g: `await Promise.all([store.dispatch(myThunkA), store.dispatch(myThunkB)])`
  await thunk(store); // THE PAYOFF BABY!

  // Remember: redux state has now changed
  location = store.getState().location;

  // Only do this again if your thunks have `redirects`
  if (doesRedirect(location, reply)) return false;

  const status = location.type === NOT_FOUND ? 404 : 200;
  reply.status(status);

  return store;
});

const doesRedirect = ({ kind, pathname }, reply) => {
  if (kind === 'redirect') {
    reply.redirect(302, pathname);
    return true;
  }
};
