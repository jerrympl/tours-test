import React from 'react';
import { StylableComponent } from '../../utils/hooks/useStyles';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';

export type BookModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const BookModal: StylableComponent<BookModalProps, {}> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <ModalHeader>Book </ModalHeader>
      <ModalBody>some</ModalBody>
    </Modal>
  );
};

export default BookModal;
