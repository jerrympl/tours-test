import React, { useState } from 'react';
import { StylableComponent } from '../../utils/hooks/useStyles';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import { useRecoilValue } from 'recoil';
import { getProductByIdSelector } from '../../state';
import { formatPrice } from '../../features/booking/helpers';
import { QuantityPicker, QuantityPickerStyles } from '../QuantityPicker/QuantityPicker';
import { limits } from '../../config';

export type BookModalProps = {
  selectedProductId: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const quantityPickerCommonProps = {
  min: limits.quantities.min,
  max: limits.quantities.max,
  styles: (current: QuantityPickerStyles) => ({
    ...current,
    root: `${current.root} BookModal__quantity-picker`,
  }),
};

const BookModal: StylableComponent<BookModalProps, {}> = (props) => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const selectedProduct = useRecoilValue(
    getProductByIdSelector(props.selectedProductId),
  );
  if (!selectedProduct) {
    return null;
  }
  const formattedPrice = formatPrice(
    selectedProduct.price.value,
    selectedProduct.price.currencyCode,
    selectedProduct.price.unit,
  );
  return (
    <Modal
      fullScreen
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <ModalHeader title="Scandinavian Adventures" />
      <ModalBody>
        <div className="BookModal__top-body">
          <div className="BookModal__image-wrapper">
            <img
              src={selectedProduct?.media.large?.url}
              className="BookModal__image"
            />
          </div>
          <div className="BookModal__details">
            <h3>{selectedProduct.title}</h3>
            <p>From {formattedPrice}</p>
            <div className="BookModal__inputs">
              <QuantityPicker
                {...quantityPickerCommonProps}
                value={adults}
                name="adults"
                onQuantityChanged={(qty) => setAdults(qty)}
              />
              <QuantityPicker
                {...quantityPickerCommonProps}
                value={children}
                name="children"
                onQuantityChanged={(qty) => setChildren(qty)}
              />
            </div>
          </div>
        </div>
        <p>{selectedProduct.body}</p>
      </ModalBody>
    </Modal>
  );
};

export default BookModal;
