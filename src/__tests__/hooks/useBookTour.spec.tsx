import React, { FunctionComponent } from 'react';
import {
  useBookTour,
  UseBookTourValues,
} from '../../features/booking/hooks/useBookTour';
import {
  GetAtomValue,
  MockedRecoilState,
  mount,
  waitForComponent,
} from '../../utils/testUtils';
import { createProduct } from '../../utils/fixtures/product.fixture';
import { act } from 'react-dom/test-utils';
import { bookingsAtom, featuredProductsAtom } from '../../state';
import { defaultQuantity } from '../../config';
import { Booking } from '../../features/booking/types';
import { getRandomString } from '../../features/booking/helpers';

const product1 = createProduct();
const product2 = createProduct();
let originalAlert = window.alert;

describe('useBookTour', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  afterEach(() => {
    window.alert = originalAlert;
  });

  it('do not call onSuccess when there is no adults nor children', async () => {
    const onSuccess = jest.fn();
    defaultQuantity.adults = 0;
    const { hook, component } = await setup(product1.id, onSuccess);

    act(() => {
      hook.setChildren(defaultQuantity.children);
      hook.setAdults(defaultQuantity.adults);
    });
    await waitForComponent(component);
    act(() => {
      hook.bookAction();
    });
    await waitForComponent(component);
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('do not call onSuccess when there is no selectedProduct', async () => {
    const onSuccess = jest.fn();
    defaultQuantity.adults = 1;
    const { hook, component } = await setup(getRandomString(), onSuccess);

    act(() => {
      hook.setChildren(defaultQuantity.children);
      hook.setAdults(defaultQuantity.adults);
    });
    await waitForComponent(component);
    act(() => {
      hook.bookAction();
    });
    await waitForComponent(component);
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('call onSuccess and save booking when there is at least children or adults set', async () => {
    const onSuccess = jest.fn();
    defaultQuantity.adults = 1;
    const { hook, component } = await setup(product1.id, onSuccess);
    act(() => {
      hook.setChildren(defaultQuantity.children);
      hook.setAdults(defaultQuantity.adults);
      hook.bookAction();
    });
    await waitForComponent(component);
    const bookings = JSON.parse(component.find('GetAtomValue').text());
    expect(onSuccess).toHaveBeenCalled();
    expect(
      bookings.find((b: Booking) => b.productId === product1.id),
    ).not.toBeUndefined();
  });

  it('getTotalCost computes proper price depending on people quantity', async () => {
    const onSuccess = jest.fn();
    defaultQuantity.adults = 1;
    defaultQuantity.children = 2;
    const { hook } = await setup(product1.id, onSuccess);
    act(() => {
      hook.setChildren(defaultQuantity.children);
      hook.setAdults(defaultQuantity.adults);
    });
    const computedPrice = hook.getTotalCost();
    const expectedComputedPrice =
      (defaultQuantity.adults + defaultQuantity.children) *
      product1.price.value;
    expect(computedPrice).toEqual(expectedComputedPrice);
  });

  it('getTotalCost returns 0 if there is no selected product', async () => {
    const onSuccess = jest.fn();
    defaultQuantity.adults = 1;
    defaultQuantity.children = 2;
    const { hook } = await setup(getRandomString(), onSuccess);
    act(() => {
      hook.setChildren(defaultQuantity.children);
      hook.setAdults(defaultQuantity.adults);
    });
    const computedPrice = hook.getTotalCost();
    expect(computedPrice).toEqual(0);
  });
});

const setup = async (selectedProductId: string, onSuccess: () => void) => {
  let hookReturnValue: UseBookTourValues;
  const atoms = [
    {
      atom: featuredProductsAtom,
      defaultValue: [product1, product2],
    },
  ];
  const TestComponent: FunctionComponent = () => {
    hookReturnValue = useBookTour({
      selectedProductId,
      onSuccess,
    });
    return null;
  };
  const component = mount(
    <MockedRecoilState atoms={atoms}>
      <TestComponent />
      <GetAtomValue atom={bookingsAtom} />
    </MockedRecoilState>,
  );
  await waitForComponent(component);

  return {
    hook: hookReturnValue!,
    component,
  };
};
