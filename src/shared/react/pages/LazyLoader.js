import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

export const PAGE_LOAD_DELAY = 30;
const Route = universal(({ page }) => import(`./lazy\/${page}`), {
  // Silky smooth animations, such as during a 500ms sliding transition
  minDelay: PAGE_LOAD_DELAY,
  // Even when components cached, components delayed
  alwaysDelay: true,
  timeout: 10000,
  loadingTransition: true,
  loading: ({ page }) => {
    // 페이지에 따라 로딩 컴포넌트 변경
    return null;
  },
  error: () => <div>Check Network Connection</div>,
});

const Loader = ({ page }) => {
  console.log('LazyLoader: ', page);
  return <Route page={page} />;
};

export default connect(({ page }) => ({ page }))(Loader);
