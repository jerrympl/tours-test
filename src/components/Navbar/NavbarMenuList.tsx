import React from 'react';
import { BasketEmptyIcon, BasketNotEmptyIcon } from '../Icons';
import { Button } from '../Button/Button';
import { useRecoilValue } from 'recoil';
import { hasBookingsSelector } from '../../state';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';

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

export type NavbarMenuListStyles = {
  root: string;
  item: string;
  link: string;
  button: string;
};

export const NavbarMenuList: StylableComponent<{}, NavbarMenuListStyles> = ({
  styles,
}) => {
  const hasBookings = useRecoilValue(hasBookingsSelector);
  const classes = useStyles(
    {
      root: 'Navbar__menu',
      item: 'Navbar__menu-item',
      link: 'Navbar__menu-item-link typography-2',
      button: 'Navbar__menu-item-button',
    },
    styles,
  );
  return (
    <ul className={classes.root}>
      {navigationItems.map((item) => (
        <li key={item.title} className={classes.item}>
          <a href={item.url} className={classes.link}>
            {item.title}
          </a>
        </li>
      ))}
      <li className={classes.item}>
        <a href="#" className={`${classes.link} medium-hide`}>
          Bookings
        </a>
        <Button
          styles={(current) => ({
            ...current,
            root: `${current.root} ${classes.button}`,
          })}
          variant="transparent"
          size="tiny"
          title="Bookings"
        >
          {hasBookings ? <BasketNotEmptyIcon /> : <BasketEmptyIcon />}
        </Button>
      </li>
    </ul>
  );
};
