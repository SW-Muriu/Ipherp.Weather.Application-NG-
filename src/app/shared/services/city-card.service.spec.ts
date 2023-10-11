import { TestBed } from '@angular/core/testing';

import { CityCardService } from './city-card.service';

describe('CityCardService', () => {
  let service: CityCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
