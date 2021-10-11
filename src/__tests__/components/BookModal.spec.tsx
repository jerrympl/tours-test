import React from 'react';
import {
  checkIfAllExist,
  fillField,
  MockedRecoilState,
  waitForComponent,
} from '../../utils/testUtils';
import { mount } from '../../utils/testUtils';
import BookModal, {
  BookModalProps,
} from '../../components/BookModal/BookModal';
import { featuredProductsAtom } from '../../state';
import { createProduct } from '../../utils/fixtures/product.fixture';
import { act } from 'react-dom/test-utils';
import { useBookTour } from '../../features/booking/hooks/useBookTour';
import { getRandomNaturalNumber } from '../../features/booking/helpers';
jest.mock('../../features/booking/hooks/useBookTour');
const product1 = createProduct();
const product2 = createProduct();

describe('<BookModal>', () => {
  let bookActionMock: jest.Mock;
  let setChildrenMock: jest.Mock;
  let setAdultsMock: jest.Mock;
  let getTotalCostMock: jest.Mock;

  beforeEach(() => {
    bookActionMock = jest.fn();
    getTotalCostMock = jest.fn();
    setAdultsMock = jest.fn();
    setChildrenMock = jest.fn();

    (useBookTour as jest.Mock).mockReturnValue({
      bookAction: bookActionMock,
      children: 0,
      setChildren: setChildrenMock,
      adults: 1,
      setAdults: setAdultsMock,
      selectedProduct: product1,
      getTotalCost: getTotalCostMock,
    });
  });

  it('renders component correctly', async () => {
    const { component } = await setup();
    checkIfAllExist(
      [
        'Modal',
        'ModalHeader',
        '.BookModal__top-body',
        '.BookModal__image-wrapper',
        'ProductImage',
        '.BookModal__image',
        '.BookModal__details',
        '.BookModal__inputs',
        'QuantityPicker',
        '.BookModal__book-button',
        'Button',
        '.BookModal__description',
      ],
      component,
    );
    const image = component.find('.BookModal__image').find('img');
    const title = component.find('.BookModal__details').find('h3');

    expect(image.prop('src')).toEqual(product1.media.large?.url);
    expect(title.text()).toEqual(product1.title);
    expect(
      component.find('.BookModal__book-button').prop('disabled'),
    ).toBeFalsy();
  });

  it('closes modal when user clicks on X button', async () => {
    const { component, props } = await setup();
    act(() => {
      component.find('.Modal__close-icon').simulate('click');
    });
    await waitForComponent(component);
    expect(props.onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('changes state object when user changes qty', async () => {
    const { component } = await setup();
    const expectations = [
      {
        fieldName: 'adults',
        setterMock: setAdultsMock,
      },
      {
        fieldName: 'children',
        setterMock: setChildrenMock,
      },
    ];
    for (let expectation of expectations) {
      await fillField(component, {
        name: expectation.fieldName,
        value: getRandomNaturalNumber().toString(),
      });
      expect(expectation.setterMock).toHaveBeenCalled();
      expect(getTotalCostMock).toHaveBeenCalled();
    }
  });

  it('calls bookAction when user clicks on Button', async () => {
    const { component } = await setup();
    act(() => {
      component.find('.BookModal__book-button').simulate('click');
    });
    await waitForComponent(component);
    expect(bookActionMock).toHaveBeenCalled();
  });

  it('makes button disabled when user does not selected neither adults nor children', async () => {
    (useBookTour as jest.Mock).mockReturnValue({
      bookAction: bookActionMock,
      children: 0,
      setChildren: setChildrenMock,
      adults: 0,
      setAdults: setAdultsMock,
      selectedProduct: product1,
      getTotalCost: getTotalCostMock,
    });
    const { component } = await setup();
    expect(
      component.find('.BookModal__book-button').prop('disabled'),
    ).toBeTruthy();
  });
});

const setup = async (propsOverride?: Partial<BookModalProps>) => {
  const featuredProductsAtomMock = {
    atom: featuredProductsAtom,
    defaultValue: [product1, product2],
  };
  const props = {
    selectedProductId: product1.id,
    isOpen: true,
    onRequestClose: jest.fn(),
    ...propsOverride,
  };
  const component = mount(
    <MockedRecoilState atoms={[featuredProductsAtomMock]}>
      <BookModal {...props} />
    </MockedRecoilState>,
  );
  await waitForComponent(component);
  return { component, props };
};
