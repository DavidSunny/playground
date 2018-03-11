// reducer
const initialState = { isFetching: false, data: [] };
export default function portfoliosReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'FETCH_PORTFOLIOS_REQUEST':
      return { isFetching: true };
    case 'FETCH_PORTFOLIOS_SUCCESS':
      return { isFetching: false, data: payload };
    case 'FETCH_PORTFOLIOS_FAILURE':
      return { isFetching: false, error: payload };
    default:
      return state;
  }
}
