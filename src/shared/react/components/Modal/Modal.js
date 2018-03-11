import * as React from 'react';
import { createPortal } from 'react-dom';
import css from './index.scss';

export default class Modal extends React.Component {
  insertedNode = document.createElement('div');
  modalNode = null;
  componentDidMount() {
    this.modalNode = document.getElementById('modal');
    if (this.modalNode) {
      this.modalNode.appendChild(this.insertedNode);
    }
  }

  componentWillUnmount() {
    if (this.modalNode) {
      this.modalNode.removeChild(this.insertedNode);
    }
  }

  render() {
    return createPortal(
      StyledWrapper(this.props.children, this.props),
      this.insertedNode
    );
  }
}

const StyledWrapper = (children, props) => {
  return (
    <div className={css.wrapper}>
      <div>
        {children}
        <button className={css.closeBtn} onClick={props.onCloseModal}>
          X
        </button>
      </div>
    </div>
  );
};
