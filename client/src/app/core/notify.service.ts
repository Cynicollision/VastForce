import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }
  
  popSuccess(message?: string): void {
    this.snackBar.open(message, 'Success', {
      duration: 3000,
    });
  }

  popError(message?: string): void {
    this.snackBar.open(`Something went wrong... ${message || ''}`, 'Error', {
      duration: 5000,
    });
  }
}
