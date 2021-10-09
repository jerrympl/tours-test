import React from 'react';
import { StylableComponent } from '../../utils/hooks/useStyles';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import { formatPrice } from '../../features/booking/helpers';
import {
  QuantityPicker,
  QuantityPickerStyles,
} from '../QuantityPicker/QuantityPicker';
import { limits } from '../../config';
import { Button } from '../Button/Button';
import { useBookTour } from '../../features/booking/hooks/useBookTour';

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
  const {
    selectedProduct,
    setAdults,
    setChildren,
    adults,
    children,
    bookAction,
    getTotalCost,
  } = useBookTour({
    selectedProductId: props.selectedProductId,
    onSuccess: props.onRequestClose,
  });
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
              alt={selectedProduct.title}
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
              <p>
                Total:{' '}
                {formatPrice(
                  getTotalCost(),
                  selectedProduct.price.currencyCode,
                )}
              </p>

              <Button onClick={() => bookAction()}>Book Experience</Button>
            </div>
          </div>
        </div>
        <p>{selectedProduct.body}</p>
      </ModalBody>
    </Modal>
  );
};

export default BookModal;
