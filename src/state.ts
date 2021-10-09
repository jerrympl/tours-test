import { atom, selector, selectorFamily } from 'recoil';
import { Booking, CarouselProduct, Product } from './features/booking/types';

export const featuredProductsAtom = atom<Product[]>({
  key: 'featuredProductsAtom',
  default: [],
});

export const carouselProductsAtom = atom<CarouselProduct[]>({
  key: 'carouselProductsAtom',
  default: [],
});

export const bookingsAtom = atom<Booking[]>({
  key: 'bookingsAtom',
  default: [],
});

export const hasBookingsSelector = selector<boolean>({
  key: 'hasBookingsSelector',
  get: ({ get }) => {
    const bookings = get(bookingsAtom);
    return Boolean(bookings.length);
  },
});

export const allProductsSelector = selector<Product[]>({
  key: 'allProductsSelector',
  get: ({ get }) => {
    const featuredProducts = get(featuredProductsAtom);
    const carouselProducts = get(carouselProductsAtom);
    return [...featuredProducts, ...carouselProducts];
  },
});

export const bookedProductsSelector = selector<Product[]>({
  key: 'bookedProductsSelector',
  get: ({ get }) => {
    const bookings = get(bookingsAtom);
    if (!bookings) {
      return [];
    }
    const allProducts = get(allProductsSelector);
    return bookings.map((booking) =>
      allProducts.find((p) => p.id === booking.productId),
    ) as Product[];
  },
});

export const getProductByIdSelector = selectorFamily({
  key: 'getProductByIdSelector',
  get: (id: string) => ({ get }) => {
    const allProducts = get(allProductsSelector);
    return allProducts.find((p) => p.id === id);
  },
});
