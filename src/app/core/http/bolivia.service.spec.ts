import { TestBed } from '@angular/core/testing';

import { BoliviaService } from './bolivia.service';

describe('BoliviaService', () => {
  let service: BoliviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoliviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
