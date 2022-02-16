import { TestBed } from '@angular/core/testing';

import { CriptoMService } from './cripto-m.service';

describe('CriptoMService', () => {
  let service: CriptoMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriptoMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
