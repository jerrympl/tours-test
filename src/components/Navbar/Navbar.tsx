import React, { FunctionComponent } from 'react';
import { BasketEmptyIcon } from '../Icons';
import { Button } from '../Button/Button';

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
            <BasketEmptyIcon />
          </Button>
        </li>
      </ul>
    </div>
  );
};
