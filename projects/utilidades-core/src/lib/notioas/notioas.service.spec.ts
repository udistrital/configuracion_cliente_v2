import { TestBed } from '@angular/core/testing';

import { NotioasService } from './notioas.service';

describe('NotioasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotioasService = TestBed.get(NotioasService);
    expect(service).toBeTruthy();
  });
});
