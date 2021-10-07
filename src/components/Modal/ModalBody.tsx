import React from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';

export type ModalBodyStyles = {
  root: string;
};

const ModalBody: StylableComponent<{}, ModalBodyStyles> = (props) => {
  const classes = useStyles<ModalBodyStyles>(
    {
      root: 'Modal__body',
    },
    props.styles,
  );

  return <div className={classes.root}>{props.children}</div>;
};

export default ModalBody;
