import React from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import { omit } from '../../utils/omit';

export type InputProps = JSX.IntrinsicElements['input'];
export type InputStyles = {
  root: string;
};

export const Input: StylableComponent<InputProps, InputStyles> = (props) => {
  const classes = useStyles(
    {
      root: 'Input typography-2',
    },
    props.styles,
  );
  const propsToPass = omit(props, 'styles');
  return <input className={classes.root} {...propsToPass} />;
};
