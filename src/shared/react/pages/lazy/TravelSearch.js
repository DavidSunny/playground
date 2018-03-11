import * as React from 'react';
import { connect } from 'react-redux';
import PageView from '_components/TravelSearch/PageView';
import { actionCreators } from '_shared/redux/reducers/formSearch';

class TravelSearch extends React.Component {
  render() {
    return (
      <PageView
        {...this.props.formSearch}
        onPlaceChange={this.placeChange}
        onDatesChange={this.datesChange}
        onFocusChange={this.focusChange}
        onPeopleChange={this.peopleChange}
        onSearchSubmit={this.searchSubmit}
      />
    );
  }

  placeChange = e => {
    const target = e.target;
    this.props.formUpdate({ place: target.value });
  };
  peopleChange = e => {
    const target = e.target;
    this.props.formUpdate({ people: target.value });
  };
  datesChange = obj => {
    const { startDate, endDate } = obj;
    this.props.formUpdate({ startDate, endDate });
  };
  focusChange = type => {
    this.props.formUpdate({ focusedInput: type });
  };
  searchSubmit = e => {
    const { place, startDate, endDate, people } = this.props.formSearch;

    if (place && people) {
      this.props.dispatch({
        type: 'TRAVEL_SEARCH_RESULT',
        query: {
          place,
          people,
          startDate: startDate && startDate.unix(),
          endDate: endDate && endDate.unix(),
        },
      });

      // 팝업으로 TravelSearch가 렌더링된 경우 검색 버튼 클릭시 팝업닫기
      this.props.onCloseModal && this.props.onCloseModal();
    } else {
      alert('지역명, 인원은 필수 입력값입니다.');
    }

    e.preventDefault();
  };
}

const stateToProps = state => ({
  formSearch: state.formSearch,
});
const dispatchToProps = dispatch => ({
  dispatch,
  formUpdate: payload => dispatch(actionCreators.updateForm(payload)),
});
export default connect(stateToProps, dispatchToProps)(TravelSearch);
