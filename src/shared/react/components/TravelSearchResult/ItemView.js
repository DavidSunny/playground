import * as React from 'react';
import numeral from 'numeral';
import css from './index.scss';
import noImageUrl from '_img/no-image.gif';

export default function ItemView(props) {
  const { place, item } = props;
  return (
    <li className={css.card}>
      <a href="#" className={css.body}>
        <span className={css.imgWrap}>
          <img src={noImageUrl} data-src={item.imgUrl} alt="" />
        </span>
        <div>
          {place &&
            place.split(' ').map((str, i) => {
              return (
                <span key={i} className={css.tag}>
                  #{str}
                </span>
              );
            })}
        </div>
        <h3 className={css.title}>{item.title}</h3>
        <span className={css.price}>{numeral(item.price).format('0,0')}원</span>
      </a>
    </li>
  );
}
