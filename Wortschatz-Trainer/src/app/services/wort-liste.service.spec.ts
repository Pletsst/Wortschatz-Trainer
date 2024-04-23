import { TestBed } from '@angular/core/testing';

import { WordListService } from './wort-liste.service';

describe('WortListeService', () => {
  let service: WordListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
