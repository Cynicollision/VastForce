import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogResult, DialogConfig } from '../dialog.service';

export interface ConfirmConfig {
  message: string;
  confirm: string;
  cancel: string;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogConfig<ConfirmConfig>) { 
    }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(this.buildConfirmDialogResult(true));
  }

  cancel() {
    this.dialogRef.close(this.buildConfirmDialogResult(false));
  }

  private buildConfirmDialogResult(confirm: boolean): DialogResult<boolean> {
    return { success: true, data: confirm };
  }
}
