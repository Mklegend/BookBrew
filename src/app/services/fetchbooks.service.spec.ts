import { TestBed } from '@angular/core/testing';

import { FetchbooksService } from './fetchbooks.service';

describe('FetchbooksService', () => {
  let service: FetchbooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchbooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
