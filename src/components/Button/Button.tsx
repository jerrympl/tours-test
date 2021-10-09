import React from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import cx from 'classnames';

export type ButtonProps = {
  fullWidth?: boolean;
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
  fullWidth,
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
    'Button--full-width': Boolean(fullWidth),
  });
  return (
    <button className={classNames} type="button" {...propsToPass}>
      {children}
    </button>
  );
};
