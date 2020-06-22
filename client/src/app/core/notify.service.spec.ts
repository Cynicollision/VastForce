import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { NotifyService } from './notify.service';

describe('NotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatSnackBarModule,
    ]
  }));

  it('should be created', () => {
    const service: NotifyService = TestBed.get(NotifyService);
    expect(service).toBeTruthy();
  });
});
