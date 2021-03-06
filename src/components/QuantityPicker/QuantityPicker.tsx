import React, { FormEvent, useEffect, useState } from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import { Button, ButtonStyles } from '../Button/Button';
import { MinusIcon, PlusIcon } from '../Icons';
import { Input, InputStyles } from '../Input/Input';

export type QuantityPickerProps = {
  max: number;
  min: number;
  value: number;
  name: string;
  label?: string;
  onQuantityChanged?: (value: number) => void;
};
export type QuantityPickerStyles = {
  root: string;
  wrapper: string;
};

const adjustButtons = (current: ButtonStyles) => ({
  ...current,
  root: `${current.root} QuantityPicker__button`,
});
const adjustInput = (current: InputStyles) => ({
  ...current,
  root: `${current.root} QuantityPicker__input`,
});

export const QuantityPicker: StylableComponent<
  QuantityPickerProps,
  QuantityPickerStyles
> = ({ max, min, value, styles, name, onQuantityChanged, label }) => {
  const [inputValue, setInputValue] = useState(value);
  const classes = useStyles(
    {
      root: 'QuantityPicker',
      wrapper: 'QuantityPicker__wrapper',
    },
    styles,
  );
  const inputProps = {
    name,
    min,
    max,
    id: name,
    type: 'number',
    value: inputValue,
  };

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.currentTarget.value);
    const valueToSet = isNaN(parsedValue) ? 0 : parsedValue;
    setInputValue(valueToSet);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    onQuantityChanged && onQuantityChanged(inputValue);
  }, [inputValue]);

  const increment = () => {
    if (!canIncrement()) {
      return;
    }
    setInputValue((prev) => prev + 1);
  };

  const decrement = () => {
    if (!canDecrement()) {
      return;
    }
    setInputValue((prev) => prev - 1);
  };

  const canIncrement = () => {
    return inputValue < max;
  };

  const canDecrement = () => {
    return inputValue > min;
  };

  return (
    <div className={classes.root}>
      {label && (
        <label className="typography-2 p-b-xs" htmlFor={name}>
          {label}
        </label>
      )}
      <div className={classes.wrapper}>
        <Button
          disabled={!canDecrement()}
          onClick={decrement}
          styles={adjustButtons}
        >
          <MinusIcon />
        </Button>
        <Input {...inputProps} styles={adjustInput} onChange={onChange} />
        <Button
          disabled={!canIncrement()}
          onClick={increment}
          styles={adjustButtons}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};
