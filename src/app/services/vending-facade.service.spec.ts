import { TestBed } from '@angular/core/testing';

import { VendingFacadeService } from './vending-facade.service';

describe('VendingFacadeService', () => {
  let service: VendingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
