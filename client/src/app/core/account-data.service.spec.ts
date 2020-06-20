import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountDataService } from './account-data.service';

describe('AccountDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: AccountDataService = TestBed.get(AccountDataService);
    expect(service).toBeTruthy();
  });
});
