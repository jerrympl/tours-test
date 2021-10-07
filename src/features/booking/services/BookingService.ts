import { DependencyContainer } from '../../../DependencyContainer';
import { ProductsResponse } from '../types';

export class BookingService {
  constructor(private readonly factory: DependencyContainer) {}

  async getProducts(): Promise<ProductsResponse> {
    const response = await this.factory.bookingClient.getAvailableProducts();
    return response.data;
  }
}
