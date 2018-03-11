import { NOT_FOUND } from 'redux-first-router';
import TravelSearch from './pages/TravelSearch';
import TravelSearchResult from './pages/TravelSearchResult';

const routesMap = {
  TRAVEL_SEARCH: TravelSearch,
  TRAVEL_SEARCH_RESULT: TravelSearchResult,
  [NOT_FOUND]: { component: 'NotFound' },
};

export default routesMap;
