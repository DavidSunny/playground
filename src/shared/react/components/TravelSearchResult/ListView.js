import * as React from 'react';
import ItemView from './ItemView';
import Modal from '_components/Modal/Modal';
import connectHistory from '_hoc/connectHistory';
import TravelSearch from '_pages/lazy/TravelSearch';
import css from './index.scss';

export default connectHistory(ListView);
function ListView(props) {
  const { cardList, query, goSearch } = props;
  const existResult = cardList.length !== 0;
  const existQuery = query.people && query.place;

  return (
    <div className={css.searchResult}>
      <h1 className={css.hide}>여행 검색 결과 페이지</h1>
      {existQuery && existResult ? (
        <React.Fragment>
          <h2>가장 선호하는 {query.people}인을 위한 여행</h2>
          <ul>
            {cardList.map(card => {
              return (
                <React.Fragment key={card.id}>
                  <ItemView place={query.place} item={card} />
                </React.Fragment>
              );
            })}
          </ul>
        </React.Fragment>
      ) : (
        <div>검색결과 없음</div>
      )}

      <div className={css.wrapTop}>
        <button type="button" className={css.top} onClick={goSearch}>
          홈
        </button>
        <button
          type="button"
          className={css.top}
          onClick={props.onShowSearchModal}
        >
          검색
        </button>
      </div>

      {props.showModal && (
        <Modal onCloseModal={props.onCloseSearchModal}>
          <TravelSearch onCloseModal={props.onCloseSearchModal} />
        </Modal>
      )}
    </div>
  );
}
