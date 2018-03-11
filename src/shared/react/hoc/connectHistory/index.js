import * as React from 'react';
import * as history from './history';

export default function WithRouter(WrappedComponent) {
  return props => <WrappedComponent {...props} history={history} />;
}
