import React from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import { Button } from '../Button/Button';
import { MinusIcon, PlusIcon } from '../Icons';

export type QuantityPickerProps = {
  max: number;
  min: number;
  value: number;
};
export type QuantityPickerStyles = {
  root: string;
};

export const QuantityPicker: StylableComponent<QuantityPickerProps, QuantityPickerStyles> = ({ max, min, value, styles}) => {
  const classes = useStyles(
    {
      root: 'QuantityPicker',
    },
    styles,
  );
  return (
    <div className={classes.root}>
      <Button>
        <MinusIcon />
      </Button>
      <input type="number" />
      <Button>
        <PlusIcon />
      </Button>
    </div>
  );
};
