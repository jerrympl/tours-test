import React, { ReactNode, useContext } from 'react';
import { ModalPropsContext } from './Modal';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import { CloseIcon } from '../Icons';

type Props = {
  onRequestClose: () => {};
  title: ReactNode;
  closeIcon: ReactNode;
};

export type ModalHeaderStyles = {
  root: string;
  closeIcon: string;
  closeButton: string;
  title: string;
};

const ModalHeader: StylableComponent<Partial<Props>, ModalHeaderStyles> = (
  props,
) => {
  const context = useContext(ModalPropsContext);
  const closeIcon = props.closeIcon || <CloseIcon />;

  const classes = useStyles<ModalHeaderStyles>(
    {
      root: 'Modal__header',
      closeIcon: 'Modal__close-icon',
      closeButton: 'Modal__close-button',
      title: 'Modal__title typography-1',
    },
    props.styles,
  );

  return (
    <div className={classes.root}>
      {props.title && <div className={classes.title}>{props.title}</div>}
      <button
        className={classes.closeButton}
        onClick={context.onRequestClose}
        title="Close"
      >
        <div className={classes.closeIcon}>{closeIcon}</div>
      </button>
    </div>
  );
};

export default ModalHeader;
