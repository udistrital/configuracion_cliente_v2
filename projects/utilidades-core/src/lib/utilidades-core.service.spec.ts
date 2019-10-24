import { TestBed } from '@angular/core/testing';

import { UtilidadesCoreService } from './utilidades-core.service';

describe('UtilidadesCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilidadesCoreService = TestBed.get(UtilidadesCoreService);
    expect(service).toBeTruthy();
  });
});
