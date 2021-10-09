import React from 'react';
import { CarouselProduct } from '../../features/booking/types';
import { formatPrice } from '../../features/booking/helpers';
import { Button } from '../Button/Button';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';

export type CarouselItemTileStyles = {
  root: string;
};
export type CarouselItemTileProps = {
  product: CarouselProduct;
  onButtonClick: () => void;
};

export const CarouselItemTile: StylableComponent<
  CarouselItemTileProps,
  CarouselItemTileStyles
> = ({ product, onButtonClick, styles }) => {
  const classes = useStyles(
    {
      root: 'CarouselItemTile',
    },
    styles,
  );

  return (
    <div className={classes.root}>
      <div className="CarouselItemTile__image">
        <img src={product.media.small.url} alt={product.title} />
      </div>
      <div className="CarouselItemTile__content">
        <h4 className="CarouselItemTile__title">{product.title}</h4>
        <h5 className="CarouselItemTile__subtitle">
          From{' '}
          {formatPrice(
            product.price.value,
            product.price.currencyCode,
            product.price.unit,
          )}
        </h5>
        <Button onClick={onButtonClick} fullWidth variant="secondary">
          Book experience
        </Button>
      </div>
    </div>
  );
};
