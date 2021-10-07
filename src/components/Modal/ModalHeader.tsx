import React, { ReactNode, useContext } from 'react';
import { ModalPropsContext } from './Modal';
import cx from 'classnames';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import { CloseIcon } from '../Icons';

type Props = {
  onRequestClose: () => {};
  title: ReactNode;
  closeIcon: ReactNode;
  withBottomLine: boolean;
  goBackButton: ReactNode;
};

export type ModalHeaderStyles = {
  root: string;
  closeIcon: string;
  closeButton: string;
  back: string;
  title: string;
};

const ModalHeader: StylableComponent<Partial<Props>, ModalHeaderStyles> = (
  props,
) => {
  const context = useContext(ModalPropsContext);
  const closeIcon = props.closeIcon || <CloseIcon />;

  const classes = useStyles<ModalHeaderStyles>(
    {
      root: cx('Modal__header', {
        'Modal__header--with-bottom-line': props.withBottomLine,
      }),
      closeIcon: cx('Modal__close-icon', {
        'Modal__close-icon--gray': !context.fullScreen && !props.closeIcon,
      }),
      closeButton: 'Modal__close-button',
      title: 'Modal__title',
      back: 'Modal__back',
    },
    props.styles,
  );

  return (
    <div className={classes.root}>
      {props.goBackButton && (
        <div className={classes.back}>{props.goBackButton}</div>
      )}
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
