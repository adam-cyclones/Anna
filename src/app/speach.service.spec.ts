import { TestBed, inject } from '@angular/core/testing';

import { SpeachService } from './speach.service';

describe('SpeachService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeachService]
    });
  });

  it('should be created', inject([SpeachService], (service: SpeachService) => {
    expect(service).toBeTruthy();
  }));
});
