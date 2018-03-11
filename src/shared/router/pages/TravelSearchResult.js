import fetchData from '_shared/lib/fetchData';
import { NOT_FOUND } from 'redux-first-router';

export default {
  path: '/search',
  component: 'TravelSearchResult',
  thunk,
};

export async function thunk(dispatch, getState) {
  const { search } = getState().location;

  dispatch({ type: 'FETCH_PORTFOLIOS_REQUEST' });
  const [err, reply] = await fetchData(`/api/v1/portfolio/search?${search}`);

  if (!err) {
    dispatch({
      type: 'FETCH_PORTFOLIOS_SUCCESS',
      payload: (reply && reply.data) || [],
    });
  } else {
    const errorResponse = err.response;
    if (errorResponse) {
      // Axios - The request was made and the server responded with a status code
      // that falls out of the range of `2xx`
      const { status, data } = errorResponse;

      dispatch({
        type: 'FETCH_PORTFOLIOS_FAILURE',
        payload: { status, data },
      });

      if (status >= 400 && status <= 499) {
        dispatch({ type: NOT_FOUND });
      }
      if (status >= 500 && status <= 599) {
      }
    }
  }
}
