import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import ListView from '_components/TravelSearchResult/ListView';
import { router } from '_redux/actions/index';
import { PAGE_LOAD_DELAY } from '_pages/LazyLoader';

export class TravelSearchResult extends React.Component {
  static defaultProps = {
    cardList: [],
    query: {},
  };
  state = {
    showModal: false,
  };
  static loadLazyImage = () => {
    setTimeout(() => {
      const imageEls = document.querySelectorAll('img');
      Array.from(imageEls).forEach(imgEl => {
        const dataSrc = imgEl.getAttribute('data-src');
        if (dataSrc) {
          imgEl.setAttribute('src', imgEl.getAttribute('data-src'));
          imgEl.onload = () => {
            imgEl.removeAttribute('data-src');
          };
        }
      });
    }, PAGE_LOAD_DELAY);
  };
  componentDidUpdate() {
    TravelSearchResult.loadLazyImage();
  }
  componentDidMount() {
    TravelSearchResult.loadLazyImage();
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>여행 검색 결과</title>
        </Helmet>
        <ListView
          {...this.props}
          {...this.state}
          onShowSearchModal={this.showSearchModal}
          onCloseSearchModal={this.closeSearchModal}
        />
      </React.Fragment>
    );
  }

  showSearchModal = () => {
    this.setState({
      showModal: true,
    });
  };
  closeSearchModal = () => {
    this.setState({
      showModal: false,
    });
  };
}

const stateToProps = state => ({
  cardList: state.portfolios.data,
  query: state.location.query,
});

const dispatchToProps = dispatch => {
  return {
    goSearch: () => dispatch(router.go('TRAVEL_SEARCH')),
  };
};
export default connect(stateToProps, dispatchToProps)(TravelSearchResult);
