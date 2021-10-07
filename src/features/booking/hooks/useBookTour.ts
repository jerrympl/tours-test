import { Product } from '../types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bookedProductsIdsAtom, bookedProductsSelector } from '../../../state';

export const useBookTour = () => {
  const setBookedProductIds = useSetRecoilState(bookedProductsIdsAtom);
  const bookedProducts = useRecoilValue(bookedProductsSelector);
  const bookAction = (product: Product) => {
    setBookedProductIds((prev) => [...prev, ...[product.id]]);
  };
  return {
    bookAction,
    bookedProducts,
  };
};
