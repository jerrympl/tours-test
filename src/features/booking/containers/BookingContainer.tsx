import React, {
  FunctionComponent,
  useMemo,
} from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Button, ButtonStyles } from '../../../components/Button/Button';
import { Hero, HeroProps } from '../../../components/Hero/Hero';
import { Product } from '../types';
import { formatPrice } from '../helpers';
import {
  FeaturedItemTile,
  FeaturedItemTileStyles,
} from '../../../components/FeaturedItemTile/FeaturedItemTile';
import BookModal from '../../../components/BookModal/BookModal';
import { CarouselSection } from '../../../components/CarouselSection/CarouselSection';
import { useTours } from '../hooks/useTours';

const getHeroProps = (featuredProducts: Product[]): Omit<HeroProps, 'cta'> => {
  const product = featuredProducts[0];
  const formattedPrice = formatPrice(
    product.price.value,
    product.price.currencyCode,
    product.price.unit,
  );

  return {
    imageUrl: product?.media.large?.url || '',
    title: product?.title,
    subtitle: `from ${formattedPrice}`,
  };
};

const addMarginsToCTAButton = (current: ButtonStyles) => ({
  ...current,
  root: `${current.root} Hero__button`,
});

const addStylesToFeaturedItemTile = (current: FeaturedItemTileStyles) => ({
  ...current,
  root: `${current.root} BookingContainer__featured-item`,
});

const BookingContainer: FunctionComponent = () => {
  const { getFeaturedItemsNextSection, onExperienceBook, featuredItems, productIdForBooking } = useTours();

  const heroProps = useMemo(() => {
    if (!featuredItems.length) {
      return;
    }
    return {
      ...getHeroProps(featuredItems),
      cta: (
        <Button
          variant="secondary"
          styles={addMarginsToCTAButton}
          onClick={() => onExperienceBook(featuredItems[0])}
        >
          Book experience
        </Button>
      ),
    };
  }, [featuredItems]);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="BookingContainer">
        <Navbar />
        {featuredItems && heroProps && <Hero {...heroProps} />}
        {getFeaturedItemsNextSection() && (
          <div className="BookingContainer__featured-items">
            {getFeaturedItemsNextSection().map((product, index) => (
              <React.Fragment key={product.id}>
                <FeaturedItemTile
                  styles={addStylesToFeaturedItemTile}
                  product={product}
                  onExperienceBook={onExperienceBook}
                  isExpanded={index % 2 === 0}
                />
                {index % 2 === 0 && <div className="break"></div>}
              </React.Fragment>
            ))}
          </div>
        )}
        <CarouselSection
          onBookExperience={onExperienceBook}
        />
      </div>
      <BookModal
        selectedProductId={productIdForBooking}
        isOpen={Boolean(productIdForBooking)}
        onRequestClose={() => onExperienceBook(undefined)}
      />
    </>
  );
};

export default BookingContainer;
