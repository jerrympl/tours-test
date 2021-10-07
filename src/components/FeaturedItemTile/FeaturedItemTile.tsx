import React from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';
import { Product } from '../../features/booking/types';
import { Button } from '../Button/Button';
import { formatPrice } from '../../features/booking/helpers';

export type FeaturedItemTileProps = {
  product: Product;
  onExperienceBook: (product: Product) => void;
  isExpanded?: boolean;
};
export type FeaturedItemTileStyles = {
  root: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  content: string;
};

export const FeaturedItemTile: StylableComponent<
  FeaturedItemTileProps,
  FeaturedItemTileStyles
> = (props) => {
  const product = props.product;
  const classes = useStyles(
    {
      root: 'FeaturedItemTile',
      cta: 'FeaturedItemTile__cta',
      image: 'FeaturedItemTile__image',
      subtitle: 'FeaturedItemTile__subtitle',
      title: 'FeaturedItemTile__title typography-1',
      content: 'FeaturedItemTile__content',
    },
    props.styles,
  );
  const formattedPrice = formatPrice(
    product.price.value,
    product.price.currencyCode,
    product.price.unit,
  );
  const mediaVariant = props.isExpanded ? 'large' : 'small';

  return (
    <div className={classes.root}>
      <div className="FeaturedItemTile__image-wrapper">
        <img
          className={classes.image}
          src={product.media[mediaVariant]?.url}
          alt={product.title}
        />
        <div className="FeaturedItemTile__title-wrapper">
          <h2 className={classes.title}>{product.title}</h2>
        </div>
      </div>
      <p className={classes.content}>{product.body}</p>
      <p className={classes.subtitle}>From {formattedPrice}</p>
      <Button onClick={() => props.onExperienceBook(product)}>Book experience</Button>
    </div>
  );
};
