// Action Creators :: Function
export const actionCreators = {
  updateForm: model => ({
    type: 'UPDATE_SEARCH_FORM',
    payload: model,
  }),
};

const initialState = {
  place: '',
  people: '',
  startDate: null,
  endDate: null,
  focusedInput: null,
};

// Reducer :: Function
export default function formSearchReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'UPDATE_SEARCH_FORM':
      return { ...state, ...payload };
    default:
      return state;
  }
}
