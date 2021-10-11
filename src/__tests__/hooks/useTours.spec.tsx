import React, { FunctionComponent } from 'react';
import { GetAtomValue, mount, waitForComponent } from '../../utils/testUtils';
import {
  useTours,
  UseToursValues,
} from '../../features/booking/hooks/useTours';
import { BookingService } from '../../features/booking/services/BookingService';
import { carouselProductsAtom, featuredProductsAtom } from '../../state';
import { createProduct } from '../../utils/fixtures/product.fixture';
import { ProductsResponse } from '../../features/booking/types';

let originalAlert = window.alert;
const product1 = createProduct();
const product2 = createProduct();
const product3 = createProduct();
const sampleResponse = {
  featured: [product1, product2],
  carousel: {
    items: [product3],
  },
};

describe('useTours', () => {
  let getProductsMock: jest.SpyInstance;
  beforeEach(() => {
    window.alert = jest.fn();
    getProductsMock = jest.spyOn(BookingService.prototype, 'getProducts');
    getProductsMock.mockResolvedValue(sampleResponse as ProductsResponse);
  });

  afterEach(() => {
    window.alert = originalAlert;
  });

  it('call service when component is mounted and all needed functions', async () => {
    const { component } = await setup();
    const atoms = component.find('GetAtomValue');
    const carouselItems = JSON.parse(atoms.at(0).text());
    const featuredItems = JSON.parse(atoms.at(1).text());

    expect(getProductsMock).toHaveBeenCalled();
    expect(carouselItems).not.toHaveLength(0);
    expect(featuredItems).not.toHaveLength(0);
  });

  it('displays alert when something is wrong', async () => {
    getProductsMock.mockRejectedValue({});
    const { component } = await setup();
    const atoms = component.find('GetAtomValue');
    const carouselItems = JSON.parse(atoms.at(0).text());
    const featuredItems = JSON.parse(atoms.at(1).text());
    expect(window.alert).toHaveBeenCalledWith('Unable to load tours.');
    expect(getProductsMock).toHaveBeenCalled();
    expect(carouselItems).toHaveLength(0);
    expect(featuredItems).toHaveLength(0);
  });

  it('getFeaturedItemsNextSection omits first featured element', async () => {
    const { hook } = await setup();
    expect(hook.getFeaturedItemsNextSection()).not.toContain(product1);
  });
});

const setup = async () => {
  let hookReturnValue: UseToursValues;
  const TestComponent: FunctionComponent = () => {
    hookReturnValue = useTours();
    return null;
  };
  const component = mount(
    <>
      <TestComponent />
      <GetAtomValue atom={carouselProductsAtom} />
      <GetAtomValue atom={featuredProductsAtom} />
    </>,
  );
  await waitForComponent(component);

  return {
    hook: hookReturnValue!,
    component,
  };
};
