import { atom, selector } from 'recoil';
import { CarouselProduct, Product } from './features/booking/types';

export const featuredProductsAtom = atom<Product[]>({
  key: 'featuredProductsAtom',
  default: [],
});

export const carouselProductsAtom = atom<CarouselProduct[]>({
  key: 'carouselProductsAtom',
  default: [],
});

export const bookedProductsIdsAtom = atom<string[]>({
  key: 'bookedProductsIdsAtom',
  default: [],
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
  // @ts-ignore
  get: ({ get }) => {
    const bookedProductsIds = get(bookedProductsIdsAtom);
    if (!bookedProductsIds) {
      return [];
    }
    const allProducts = get(allProductsSelector);
    return bookedProductsIds.map((productId) =>
      allProducts.find((p) => p.id === productId),
    );
  },
});
