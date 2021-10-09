import {
  Product,
  ProductMedia,
  ProductPrice,
} from '../../features/booking/types';
import {
  getRandomNaturalNumber,
  getRandomString,
} from '../../features/booking/helpers';

export const createProductPrice = (
  override?: Partial<ProductPrice>,
): ProductPrice => ({
  value: getRandomNaturalNumber(),
  unit: 'per person',
  currencyCode: 'GBP',
  ...override,
});

export const createProductMedia = (
  override?: Partial<ProductMedia>,
): ProductMedia => ({
  url: getRandomString(),
  height: getRandomNaturalNumber(),
  width: getRandomNaturalNumber(),
  ...override,
});

export const createProduct = (override: Partial<Product>): Product => ({
  id: getRandomString(),
  price: createProductPrice(),
  title: getRandomString(),
  body: getRandomString(),
  media: {
    small: createProductMedia(),
    large: createProductMedia(),
  },
  ...override,
});
