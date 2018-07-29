import { TestBed, inject } from '@angular/core/testing';

import { NewEmojiServiceService } from './new-emoji-service.service';

describe('NewEmojiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewEmojiServiceService]
    });
  });

  it('should be created', inject([NewEmojiServiceService], (service: NewEmojiServiceService) => {
    expect(service).toBeTruthy();
  }));
});
