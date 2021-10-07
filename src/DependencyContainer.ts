import { BookingService } from './features/booking/services/BookingService';
import { BookingClient } from './features/booking/services/BookingClient';

export class DependencyContainer {
  // Services
  bookingService = new BookingService(this);

  // Clients
  bookingClient = new BookingClient();
}
