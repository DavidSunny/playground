import routesMap from '_router';

export const initialState = 'TravelSearch';
export default (state = initialState, action = {}) =>
  (routesMap[action.type] && routesMap[action.type].component) || state;

// NOTES: this is the primary reducer demonstrating how RFR replaces the need
// for React Router's <Route /> component.
//
// ALSO:  Forget a switch statement, use a hash table(key-value) for performance.
