import { TestBed } from '@angular/core/testing';

import { DisableButtonsService } from './disable-buttons.service';

describe('DisableButtonsService', () => {
  let service: DisableButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisableButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
