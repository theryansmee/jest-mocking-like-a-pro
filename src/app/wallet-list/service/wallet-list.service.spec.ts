import { TestBed } from '@angular/core/testing';

import { WalletListService } from './wallet-list.service';

describe('WalletListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletListService = TestBed.get(WalletListService);
    expect(service).toBeTruthy();
  });
});
