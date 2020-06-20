import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { WaitService } from './wait.service';

describe('WaitService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatDialogModule,
    ]
  }));

  it('should be created', () => {
    const service: WaitService = TestBed.get(WaitService);
    expect(service).toBeTruthy();
  });
});
