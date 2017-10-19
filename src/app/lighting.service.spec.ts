import { TestBed, inject } from '@angular/core/testing';

import { LightingService } from './lighting.service';

describe('LightingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightingService]
    });
  });

  it('should be created', inject([LightingService], (service: LightingService) => {
    expect(service).toBeTruthy();
  }));
});
