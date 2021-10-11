import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { carouselProductsAtom, featuredProductsAtom } from '../../../state';
import { Product } from '../types';
import { DependencyContainer } from '../../../DependencyContainer';

export type UseToursValues = {
  getFeaturedItemsNextSection: () => Product[],
  onExperienceBook: any,
  featuredItems: Product[],
  productIdForBooking: string;
}

const { bookingService } = new DependencyContainer();

export const useTours = (): UseToursValues => {
  const [productIdForBooking, setProductIdForBooking] = useState();
  const setCarouselItems = useSetRecoilState(carouselProductsAtom);
  const [featuredItems, setFeaturedItems] = useRecoilState(
    featuredProductsAtom,
  );

  const getFeaturedItemsNextSection = useCallback(() => {
    if (!featuredItems || featuredItems.length === 0) {
      return [];
    }
    const copy = [...featuredItems];
    delete copy[0];
    return copy;
  }, [featuredItems]);

  const onExperienceBook = (product?: Product | string) => {
    const productId = typeof product === 'string' ? product : product?.id;
    setProductIdForBooking(productId);
  };

  useEffect(() => {
    bookingService
      .getProducts()
      .then((response) => {
        setCarouselItems(response.carousel.items);
        setFeaturedItems(response.featured);
      })
      .catch((error) => {
        console.error(error);
        alert('Unable to load tours.');
      });
  }, []);

  useEffect(() => () => {
    setProductIdForBooking(undefined);
  }, []);

  return {
    getFeaturedItemsNextSection,
    onExperienceBook,
    featuredItems,
    productIdForBooking,
  }
};
