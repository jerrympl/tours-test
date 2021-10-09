import React, { FunctionComponent } from 'react';
import { omit } from '../../utils/omit';
import { Product, ProductMedia } from '../../features/booking/types';

export type ProductImageProps = {
  product: Product;
  version?: 'large' | 'small';
} & JSX.IntrinsicElements['img'];

export const ProductImage: FunctionComponent<ProductImageProps> = (props) => {
  const propsToPass = omit(props, 'product');
  let image = props.product.media.large || props.product.media.small;
  if (props.version !== undefined) {
    image = props.product.media[props.version] as ProductMedia;
  }
  return <img {...propsToPass} src={image.url} alt={props.product.title} />;
};
