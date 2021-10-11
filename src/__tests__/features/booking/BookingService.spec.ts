import { BookingService } from '../../../features/booking/services/BookingService';
import { DependencyContainer } from '../../../DependencyContainer';
import { createProduct } from '../../../utils/fixtures/product.fixture';

const BookingClientMock = {
  getAvailableProducts: jest.fn(),
};

const product1 = createProduct();
const product2 = createProduct();
const product3 = createProduct();

describe('BookingService', () => {
  let service: BookingService;
  let dependencyContainer: DependencyContainer;

  beforeAll(() => {
    dependencyContainer = {
      bookingClient: BookingClientMock,
    } as any;
  });

  beforeEach(() => {
    service = new BookingService(dependencyContainer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns proper data if request is successful', async () => {
    const featured = [product1, product2];
    const carouselItems = [product3];
    BookingClientMock.getAvailableProducts.mockResolvedValue({
      data: {
        featured,
        carousel: {
          items: carouselItems,
        },
      },
    });
    const response = await service.getProducts();
    expect(BookingClientMock.getAvailableProducts).toHaveBeenCalledTimes(1);
    expect(response.featured).toHaveLength(featured.length);
    expect(response.carousel.items).toHaveLength(carouselItems.length);
  });

  it('reject promise when clients gets rejection', async () => {
    BookingClientMock.getAvailableProducts.mockRejectedValue({});
    await expect(service.getProducts()).rejects.toBeDefined();
  });
});
