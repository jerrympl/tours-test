import React, { FunctionComponent } from 'react';

export const CloseIcon: FunctionComponent = (props) => {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.48959"
        y="0.575378"
        width="19"
        height="2"
        transform="rotate(45 1.48959 0.575378)"
        fill="currentColor"
      />
      <rect
        x="0.0753784"
        y="14.0104"
        width="19"
        height="2"
        transform="rotate(-45 0.0753784 14.0104)"
        fill="currentColor"
      />
    </svg>
  );
};
export const BasketEmptyIcon: FunctionComponent = (props) => {
  return (
    <svg
      width="19"
      height="24"
      viewBox="0 0 19 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.39933 9.5935C1.6096 7.27525 3.55316 5.5 5.88093 5.5H13.1188C15.4466 5.5 17.3901 7.27525 17.6004 9.59351L18.4167 18.5935C18.6557 21.2285 16.5809 23.5 13.9351 23.5H5.0646C2.41883 23.5 0.344001 21.2285 0.582999 18.5935L1.39933 9.5935Z"
        stroke="currentColor"
      />
      <path
        d="M13 5C13 2.79086 11.433 1 9.5 1C7.567 1 6 2.79086 6 5"
        stroke="currentColor"
      />
    </svg>
  );
};
