import { TestBed } from '@angular/core/testing';

import { BusBookingService } from './bus-booking.service';

describe('BusBookingService', () => {
  let service: BusBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
