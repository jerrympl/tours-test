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
import { defaultQuantity, limits } from '../../config';
import { Button } from '../Button/Button';
import { useBookTour } from '../../features/booking/hooks/useBookTour';
import { ProductImage } from '../ProductImage/ProductImage';

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
    root: `${current.root} m-b-xm`,
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
    onSuccess: () => {
      setChildren(defaultQuantity.children);
      setAdults(defaultQuantity.adults);
      props.onRequestClose();
    },
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
            <ProductImage
              product={selectedProduct}
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
                label="Adults"
                onQuantityChanged={(qty) => setAdults(qty)}
              />
              <QuantityPicker
                {...quantityPickerCommonProps}
                value={children}
                name="children"
                label="Children"
                onQuantityChanged={(qty) => setChildren(qty)}
              />
              <p>
                Total:{' '}
                {formatPrice(
                  getTotalCost(),
                  selectedProduct.price.currencyCode,
                )}
              </p>

              <Button
                disabled={children === 0 && adults === 0}
                styles={(current) => ({
                  ...current,
                  root: `${current.root} BookModal__book-button`,
                })}
                onClick={() => bookAction()}
              >
                Book Experience
              </Button>
            </div>
          </div>
        </div>
        <p className="BookModal__description">{selectedProduct.body}</p>
      </ModalBody>
    </Modal>
  );
};

export default BookModal;
