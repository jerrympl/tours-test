import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { carouselProductsAtom } from '../../state';
import {
  CarouselItemTile,
  CarouselItemTileStyles,
} from '../CarouselItemTile/CarouselItemTile';

const adjustCarouselItem = (current: CarouselItemTileStyles) => ({
  ...current,
  root: `${current.root} CarouselSection__carousel-item`,
});
const carouselTileWidthInPixels = 280;
const getTrackStyles = (numberOfItems: number) => ({
  width: `${numberOfItems * carouselTileWidthInPixels}px`,
});

export type CarouselSectionProps = {
  onBookExperience: (productId: string) => void;
};

export const CarouselSection: FunctionComponent<CarouselSectionProps> = ({
  onBookExperience,
}) => {
  const carouselProducts = useRecoilValue(carouselProductsAtom);
  return (
    <div className="CarouselSection">
      <div className="CarouselSection__heading">
        <h3>Adventure awaits out there</h3>
        <h4>Get out and experience Scandinavian way of living</h4>
      </div>
      {carouselProducts && (
        <div className="CarouselSection__carousel">
          <div
            className="CarouselSection__carousel-track"
            style={getTrackStyles(carouselProducts.length)}
          >
            {carouselProducts.map((product) => (
              <CarouselItemTile
                onButtonClick={() => onBookExperience(product.id)}
                product={product}
                key={product.id}
                styles={adjustCarouselItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
