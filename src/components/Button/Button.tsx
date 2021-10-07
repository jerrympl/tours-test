import React from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import cx from 'classnames';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'transparent';
  size?: 'normal' | 'tiny';
} & JSX.IntrinsicElements['button'];
export type ButtonStyles = {
  root: string;
};

export const Button: StylableComponent<ButtonProps, ButtonStyles> = ({
  children,
  variant = 'primary',
  size = 'normal',
  styles,
  ...propsToPass
}) => {
  const classes = useStyles(
    {
      root: 'Button',
    },
    styles,
  );
  const classNames = cx(classes.root, {
    [`Button--${variant}`]: true,
    [`Button--${size}`]: true,
  });
  return (
    <button className={classNames} type="button" {...propsToPass}>
      {children}
    </button>
  );
};
