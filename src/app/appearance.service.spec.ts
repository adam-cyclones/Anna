/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppearanceService } from './appearance.service';

describe('AppearanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppearanceService]
    });
  });

  it('should ...', inject([AppearanceService], (service: AppearanceService) => {
    expect(service).toBeTruthy();
  }));
});
