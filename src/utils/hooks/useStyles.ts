import { FunctionComponent } from 'react';

export type StylableComponent<P, S> = FunctionComponent<
  P & { styles?: StyleModifier<S> }
>;

export type StyleModifier<T> = (styles: T) => T;

export const useStyles = <T extends { [key: string]: string }>(
  defaultStyles: T,
  styles?: StyleModifier<T>,
) => {
  return styles ? styles(defaultStyles) : defaultStyles;
};
