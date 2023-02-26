import { TestBed } from '@angular/core/testing';

import { SummarizeService } from './summarize.service';

describe('SummarizeService', () => {
  let service: SummarizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummarizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
