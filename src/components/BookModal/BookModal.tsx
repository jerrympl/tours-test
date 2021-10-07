import React from 'react';
import { StylableComponent } from '../../utils/hooks/useStyles';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import { useRecoilValue } from 'recoil';
import { getProductByIdSelector } from '../../state';
import { formatPrice } from '../../features/booking/helpers';
import { QuantityPicker } from '../QuantityPicker/QuantityPicker';

export type BookModalProps = {
  selectedProductId: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const BookModal: StylableComponent<BookModalProps, {}> = (props) => {
  const selectedProduct = useRecoilValue(getProductByIdSelector(props.selectedProductId));
  if (!selectedProduct) {
    return null;
  }
  const formattedPrice = formatPrice(selectedProduct.price.value, selectedProduct.price.currencyCode, selectedProduct.price.unit);
  return (
    <Modal fullScreen isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <ModalHeader title="Scandinavian Adventures" />
      <ModalBody>
        <div className="BookModal__top-body">
          <div className='BookModal__image-wrapper'>
            <img src={selectedProduct?.media.large?.url} className="BookModal__image" />
          </div>
          <div className='BookModal__details'>
            <h3>{selectedProduct.title}</h3>
            <p>From {formattedPrice}</p>

            <QuantityPicker max={100} min={0} value={2} />
          </div>
        </div>
        <p>{selectedProduct.body}</p>
      </ModalBody>
    </Modal>
  );
};

export default BookModal;
