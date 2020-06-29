import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatDialogModule,
    ],
  }));

  it('should be created', () => {
    const service: DialogService = TestBed.get(DialogService);
    expect(service).toBeTruthy();
  });
});
