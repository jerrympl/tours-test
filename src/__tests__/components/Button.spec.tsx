import React from 'react';
import {
  checkIfAllExist,
  mount,
  waitForComponent,
} from '../../utils/testUtils';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from '../../components/Button/Button';
import { act } from 'react-dom/test-utils';

describe('<Button>', () => {
  it('renders different variants correctly', () => {
    const variants = [
      'primary',
      'secondary',
      'transparent',
    ] as ButtonVariants[];
    variants.forEach((variant) => {
      const component = mount(<Button variant={variant} />);
      expect(component.exists(`.Button--${variant}`)).toBeTruthy();
    });
  });

  it('renders different sizes correctly', () => {
    const sizes = ['normal', 'tiny'] as ButtonSizes[];
    sizes.forEach((size) => {
      const component = mount(<Button size={size} />);
      expect(component.exists(`.Button--${size}`)).toBeTruthy();
    });
  });

  it('renders variant primary and size normal as default', () => {
    const component = mount(<Button />);
    checkIfAllExist(['.Button--normal', '.Button--primary'], component);
  });

  it('propagates onClick handler', async () => {
    const onClickMock = jest.fn();
    const component = mount(<Button onClick={onClickMock} />);
    act(() => {
      component.find('Button').simulate('click');
    });
    await waitForComponent(component);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('set children component as a value', async () => {
    const value = 'Test';
    const component = mount(<Button>{value}</Button>);
    expect(component.find('Button').text()).toEqual(value);
  });
});
