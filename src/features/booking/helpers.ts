import { CurrencyCodes } from './types';

const mapCurrencyCodeToSymbol: Record<CurrencyCodes, string> = {
  GBP: '£',
};
export const formatPrice = (
  value: number,
  currencyCode: CurrencyCodes,
  suffix = '',
) => {
  const symbol = mapCurrencyCodeToSymbol[currencyCode] || '';
  return `${symbol}${value}${suffix ? ' ' + suffix : ''}`;
};
