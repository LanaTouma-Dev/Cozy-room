import { TestBed } from '@angular/core/testing';

import { Corkboard } from './corkboard';

describe('Corkboard', () => {
  let service: Corkboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Corkboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
