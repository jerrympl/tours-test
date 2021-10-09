import React, { FunctionComponent, useState } from 'react';
import { HamburgerMenuIcon } from '../Icons';
import { Button } from '../Button/Button';
import MenuModal from '../MenuModal/MenuModal';
import { NavbarMenuList } from './NavbarMenuList';

export const Navbar: FunctionComponent = () => {
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  return (
    <div className="Navbar">
      <div className="Navbar__logo typography-1">Scandinavian Adventures</div>
      <div className="Navbar__hamburger-menu">
        <Button
          variant="transparent"
          onClick={() => setHamburgerMenuOpen(true)}
        >
          <HamburgerMenuIcon />
        </Button>
      </div>
      <NavbarMenuList />
      <MenuModal
        isOpen={isHamburgerMenuOpen}
        onRequestClose={() => setHamburgerMenuOpen(false)}
      />
    </div>
  );
};
