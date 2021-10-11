import React, {
  ComponentClass,
  ComponentType,
  FunctionComponent,
  StatelessComponent,
  useEffect,
} from 'react';
import { EnzymePropSelector, mount as enzymeMount, ReactWrapper } from 'enzyme';
import {
  RecoilRoot,
  RecoilState,
  RecoilValueReadOnly,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/react';

export function mount<T>(component: JSX.Element) {
  return enzymeMount<T>(<RecoilRoot>{component}</RecoilRoot>);
}

export type MockedRecoilStateProps<T> = {
  atoms: Array<MockedRecoilAtom<T>>;
};

export type MockedRecoilAtom<T> = {
  atom: RecoilState<T>;
  defaultValue: T;
};

export type MockedRecoilStateFunctionComponent<T = any> = FunctionComponent<
  MockedRecoilStateProps<T>
>;

export const MockedRecoilState: MockedRecoilStateFunctionComponent = (
  props,
) => {
  const setters: Array<CallableFunction> = [];
  const defaultValues: any[] = [];

  props.atoms.map((mockedAtom: MockedRecoilAtom<any>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const setter = useSetRecoilState<any>(mockedAtom.atom);
    setters.push(setter);
    defaultValues.push(mockedAtom.defaultValue);
  });

  useEffect(() => {
    setters.map((setter, index: number) => setter(defaultValues[index]));
  }, []);

  return <>{props.children}</>;
};

type Selectors =
  | string
  | StatelessComponent<any>
  | ComponentType<any>
  | ComponentClass<any>
  | EnzymePropSelector;

export const checkIfAllExist = (
  selectorsArray: Selectors[],
  wrapper: ReactWrapper<any, any, any>,
): void =>
  selectorsArray.forEach((el) => {
    if (!wrapper.exists(el)) {
      throw new Error(`Element ${el} was not rendered`);
    }
  });

export const waitForComponent = async (component: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await wait();
    if (typeof component.update !== 'undefined') {
      component.update();
    }
  });
};

export const fillField = async (
  component: ReactWrapper<any, any, any>,
  target: {
    name: string;
    value: string;
  },
  fieldType: 'input' | 'textarea' = 'input',
) => {
  await act(async () => {
    component
      .find(`${fieldType}[name='${target.name}']`)
      .simulate('change', { target });
  });
  await waitForComponent(component);
};

export function GetAtomValue<T>({
  atom,
}: {
  atom: RecoilState<T> | RecoilValueReadOnly<T>;
}): JSX.Element {
  return <>{JSON.stringify(useRecoilValue(atom))}</>;
}
