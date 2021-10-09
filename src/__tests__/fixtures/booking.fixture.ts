import { Booking, Product } from '../../features/booking/types';
import { getRandomString } from '../../features/booking/helpers';
import { createProductPrice } from './product.fixture';

export const createBooking = (product: Product, override?: Partial<Booking>): Booking => ({
  id: getRandomString(),
  productId: product.id,
  totalPrice: createProductPrice({
    ...product.price,
    unit: 'total',
  }),
  people: {
    children: 0,
    adults: 1,
  },
  ...override,
});
