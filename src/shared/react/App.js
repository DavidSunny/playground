import * as React from 'react';
import { Helmet } from 'react-helmet';
import Layout from './layout/Layout';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Travel Search</title>
        </Helmet>
        <Layout {...this.props} />
      </React.Fragment>
    );
  }
}
