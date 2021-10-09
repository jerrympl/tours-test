import { Booking } from '../types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bookingsAtom, getProductByIdSelector } from '../../../state';
import { getRandomString } from '../helpers';
import { useCallback, useState } from 'react';

export type UseBookTourProps = {
  selectedProductId: string;
  onSuccess?: () => void;
};

export const useBookTour = ({
  selectedProductId,
  onSuccess,
}: UseBookTourProps) => {
  const selectedProduct = useRecoilValue(
    getProductByIdSelector(selectedProductId),
  );
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
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
      setTimeout(() => onSuccess(), 200);
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
