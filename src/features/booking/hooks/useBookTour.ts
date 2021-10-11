import { Booking, Product } from '../types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bookingsAtom, getProductByIdSelector } from '../../../state';
import { getRandomString } from '../helpers';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { defaultQuantity } from '../../../config';

export type UseBookTourProps = {
  selectedProductId: string;
  onSuccess?: () => void;
};

export type UseBookTourValues = {
  bookAction: () => void;
  children: number;
  setChildren: Dispatch<SetStateAction<number>>;
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  selectedProduct: Product | undefined;
  getTotalCost: () => number;
};

export const useBookTour = ({
  selectedProductId,
  onSuccess,
}: UseBookTourProps): UseBookTourValues => {
  const selectedProduct = useRecoilValue(
    getProductByIdSelector(selectedProductId),
  );
  const [adults, setAdults] = useState<number>(defaultQuantity.adults);
  const [children, setChildren] = useState<number>(defaultQuantity.children);
  const setBookings = useSetRecoilState(bookingsAtom);

  const getTotalCost = useCallback(() => {
    if (!selectedProduct) {
      return 0;
    }
    const totalPeople = adults + children;
    const totalPrice = totalPeople * selectedProduct.price.value;
    return totalPrice;
  }, [children, adults, selectedProduct]);

  const bookAction = () => {
    if (children + adults === 0 || !selectedProduct) {
      return;
    }
    const newBooking: Booking = {
      id: getRandomString(),
      productId: selectedProduct.id,
      totalPrice: {
        value: getTotalCost(),
        currencyCode: selectedProduct.price.currencyCode,
        unit: 'total',
      },
      people: {
        adults,
        children,
      },
    };
    setBookings((bookings) => [...bookings, newBooking]);
    alert('Experience has been booked.');
    if (onSuccess) {
      onSuccess();
    }
  };
  return {
    bookAction,
    children,
    setChildren,
    adults,
    setAdults,
    selectedProduct,
    getTotalCost,
  };
};
