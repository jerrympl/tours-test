import { formatPrice, getRandomNaturalNumber, getRandomString } from '../features/booking/helpers';
import { CurrencyCodes } from '../features/booking/types';

describe('Helpers', () => {
  describe('formatPrice()', () => {
    const value = getRandomNaturalNumber();

    it('returns formatted price', () => {
      const formatted = formatPrice(value, 'GBP');
      expect(formatted).toEqual(`£${value}`);
    });

    it('adds proper suffix if provided', () => {
      const suffix = getRandomString();
      const formatted = formatPrice(value, 'GBP', suffix);
      expect(formatted).toEqual(`£${value} ${suffix}`);
    });

    it('skips rendering symbol if symbol is not recognized', () => {
      const formatted = formatPrice(value, getRandomString() as CurrencyCodes);
      expect(formatted).not.toEqual(`£${value}`);
      expect(formatted).toEqual(value.toString());
    });
  });
});
