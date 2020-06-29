import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../../../../shared/models/Account';
import { APIService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { DialogConfig } from '../core/dialog.service';
import { NotifyService } from '../core/notify.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  userName: string;

  get userNameInvalid() {
    return !this.userName;
  }

  constructor(public dialogRef: MatDialogRef<CreateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogConfig<Account>,
    private apiService: APIService,
    private authService: AuthService,
    private notifyService: NotifyService) { 
  }

  ngOnInit() {
    if (this.config && this.config.data) {
      this.userName = this.config.data.name || '';
    }
  }

  getErrorMessage() {
    return 'User Name is required.';
  }

  close() {
    if (this.userNameInvalid) {
      return;
    }

    this.apiService.registerAccount(this.userName).then(registerResult => {
      if (!registerResult || !registerResult.success) {
        this.notifyService.popError(`Registration failed: ${registerResult.message}`);
      }

      return this.apiService.loginAccount().then(loginResult => {
        this.authService.setAccount(loginResult.data);
        this.dialogRef.close(registerResult);
      });
    });
  }
}
