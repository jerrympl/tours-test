import React, { createContext } from 'react';
import { omit } from '../../utils/omit';
import { ModalBodyStyles } from './ModalBody';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';

export type ModalProps = ReactModal.Props & {
  fullScreen?: boolean;
};

export const ModalPropsContext = createContext<Partial<ModalProps>>({
  onRequestClose: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => {},
});

// for accessibility: http://reactcommunity.org/react-modal/accessibility
if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

const Modal: StylableComponent<ModalProps, ModalBodyStyles> = (props) => {
  const propsToPass = omit(props, 'children', 'styles');

  const classes = useStyles<ModalBodyStyles>(
    {
      root: classNames('Modal', {
        'Modal--full-screen': props.fullScreen,
      }),
    },
    props.styles,
  );

  if (!props.isOpen) {
    return null;
  }

  return (
    <ReactModal {...propsToPass} className={classes.root}>
      <ModalPropsContext.Provider
        value={{
          ...props,
        }}
      >
        {props.children}
      </ModalPropsContext.Provider>
    </ReactModal>
  );
};

export default Modal;
