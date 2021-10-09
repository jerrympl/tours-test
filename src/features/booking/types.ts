export type CurrencyCodes = 'GBP'; // we can add more if they are needed
export type ProductMediaSizes = {
  width: number;
  height: number;
};
export type ProductMedia = {
  url: string;
} & ProductMediaSizes;

export type ProductPrice = {
  value: number;
  currencyCode: CurrencyCodes;
  unit: string;
};

export type Product = {
  id: string;
  title: string;
  body?: string;
  media: {
    small: ProductMedia;
    large?: ProductMedia;
  };
  price: ProductPrice;
};

export type CarouselProduct = Product & {
  guidedTour: boolean;
};

export type ProductsResponse = {
  featured: Product[];
  carousel: {
    items: CarouselProduct[];
  };
};

export type Booking = {
  id: string;
  productId: string,
  totalPrice: ProductPrice;
  people: {
    adults: number;
    children: number;
  }
}
