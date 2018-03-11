import * as React from 'react';
import { DateRangePicker } from 'react-dates';

import css from './index.scss';

export default function TravelSearchView(props) {
  return (
    <form onSubmit={props.onSearchSubmit} className={css.wrap}>
      <h1>여행 포트폴리오 검색</h1>
      <div className={css.box}>
        <div className={css.innerBox}>
          <strong className={css.title}>지역명</strong>
          <div className={css.inputWrap}>
            <label htmlFor="text" className="screen-out">
              지역명
            </label>
            <input
              id="place"
              type="text"
              value={props.place}
              onChange={props.onPlaceChange}
              className={css.input}
              placeholder="예) 제주도 월정리"
            />
          </div>
        </div>
      </div>
      <div className={css.box}>
        <div className={css.innerBox}>
          <strong className={css.title}>날짜</strong>
          <div className={css.inputWrap}>
            <DateRangePicker
              startDatePlaceholderText={'여행 시작일'}
              endDatePlaceholderText={'여행 종료일'}
              startDate={props.startDate}
              endDate={props.endDate}
              startDateId="startDate"
              endDateId="endDate"
              numberOfMonths={1}
              keepOpenOnDateSelect={false}
              displayFormat={() => 'MM.DD'}
              focusedInput={props.focusedInput}
              onDatesChange={props.onDatesChange}
              onFocusChange={props.onFocusChange}
            />
          </div>
        </div>
      </div>
      <div className={css.box}>
        <div className={css.innerBox}>
          <strong className={css.title}>인원</strong>
          <div className={css.inputWrap}>
            <label htmlFor="text" className="screen-out">
              인원
            </label>
            <input
              id="people"
              type="text"
              value={props.people}
              onChange={props.onPeopleChange}
              className={css.input}
              placeholder="예) 2"
            />
          </div>
        </div>
      </div>
      <div className={css.btnWrap}>
        <button
          type="submit"
          className={`${css.btnItem}
          ${css.btnHover}`}
        >
          <span className={css.txt}>검색</span>
        </button>
      </div>
    </form>
  );
}
