import { CurrencyCodes } from './types';

const mapCurrencyCodeToSymbol: Record<CurrencyCodes, string> = {
  GBP: '£',
};
export const formatPrice = (
  value: number,
  currencyCode: CurrencyCodes,
  suffix = '',
): string => {
  const symbol = mapCurrencyCodeToSymbol[currencyCode] || '';
  return `${symbol}${value}${suffix ? ' ' + suffix : ''}`;
};
export const getRandomNaturalNumber = (min = 1, max = 100) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomString = (): string => {
  return getRandomNaturalNumber().toString(36);
}
