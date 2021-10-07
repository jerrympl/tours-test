import React from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';

export type ModalFooterStyles = {
  root: string;
};

const ModalFooter: StylableComponent<{}, ModalFooterStyles> = (props) => {
  const classes = useStyles<ModalFooterStyles>(
    {
      root: 'Modal__footer',
    },
    props.styles,
  );

  return <div className={classes.root}>{props.children}</div>;
};

export default ModalFooter;
