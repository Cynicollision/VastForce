import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface DialogConfig<T> {
  data?: T;
  preventClose?: boolean;
}
export interface DialogResult<T> {
  cancelled?: boolean;
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private active = false;
  private currentDialog: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog) {
  }

  public popDialog<T,V>(componentType: ComponentType<T>, config?: DialogConfig<any>): Promise<DialogResult<V>> {
    if (this.active) {
      return Promise.resolve({ cancelled: true, success: true });
    }
    return new Promise((resolve, reject) => {
      this.active = true;
        
      return Promise.resolve().then(() => {

        this.currentDialog = this.dialog.open(componentType, {
          data: config || { },
          disableClose: config.preventClose || false,
          width: '350px',
        });
        
        this.currentDialog.afterClosed()
          .subscribe(result => {
            this.active = false;
            this.currentDialog = null;
            resolve(result || { cancelled: true });
          });
      });
    });
  }

  public closeCurrentDialog(componentType: any): void {
    if (this.currentDialog.componentInstance && this.currentDialog.componentInstance instanceof componentType) {
      this.currentDialog.close();
    }
  }
}
