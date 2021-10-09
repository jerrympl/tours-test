import React from 'react';
import { StylableComponent } from '../../utils/hooks/useStyles';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import { NavbarMenuList } from '../Navbar/NavbarMenuList';

export type MenuModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const MenuModal: StylableComponent<MenuModalProps, {}> = (props) => {
  return (
    <Modal
      fullScreen
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <ModalHeader title="Scandinavian Adventures" />
      <ModalBody
        styles={(current) => ({
          ...current,
          root: `${current.root} MenuModal`,
        })}
      >
        <NavbarMenuList
          styles={(current) => ({
            ...current,
            root: `${current.root} MenuModal__navigation`,
            item: `${current.item} MenuModal__navigation-item`,
            button: `${current.button} MenuModal__navigation-item-bookings`,
          })}
        />
      </ModalBody>
    </Modal>
  );
};

export default MenuModal;
