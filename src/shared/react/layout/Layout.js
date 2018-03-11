import React from 'react';
import LazyLoader from '_react/pages/LazyLoader';

export default function Layout(props) {
  return (
    <div className="ui-container">
      <div className="header" />
      <div className="main">
        <LazyLoader {...props} />
      </div>
      <div className="footer" />
    </div>
  );
}
