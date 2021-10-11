import React, { FunctionComponent } from 'react';
import { RecoilRoot } from 'recoil';
import './globalStyles.scss';
import BookingContainer from './features/booking/containers/BookingContainer';

const App: FunctionComponent = () => {
  return (
    <RecoilRoot>
      <BookingContainer />
    </RecoilRoot>
  );
};

export default App;
