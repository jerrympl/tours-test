import React, { FunctionComponent } from 'react';
import { BasketEmptyIcon, BasketNotEmptyIcon } from '../Icons';
import { Button } from '../Button/Button';
import { useRecoilValue } from 'recoil';
import { hasBookingsSelector } from '../../state';

const navigationItems: Array<{ title: string; url: string }> = [
  {
    title: 'Experiences',
    url: '#',
  },
  {
    title: 'Company',
    url: '#',
  },
  {
    title: 'Support',
    url: '#',
  },
];

export const Navbar: FunctionComponent = () => {
  const hasBookings = useRecoilValue(hasBookingsSelector);
  return (
    <div className="Navbar">
      <div className="Navbar__logo typography-1">Scandinavian Adventures</div>
      <ul className="Navbar__menu">
        {navigationItems.map((item) => (
          <li key={item.title} className="Navbar__menu-item">
            <a href={item.url} className="Navbar__menu-item-link typography-2">
              {item.title}
            </a>
          </li>
        ))}
        <li className="Navbar__menu-item">
          <Button variant="transparent" size="tiny">
            {hasBookings ? <BasketNotEmptyIcon /> : <BasketEmptyIcon />}
          </Button>
        </li>
      </ul>
    </div>
  );
};
