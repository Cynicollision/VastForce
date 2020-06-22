import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AccountDataService } from '../core/account-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private _userName: string = null;

  constructor(public authService: AuthService,
    private accountDataService: AccountDataService) {
  }

  get welcomeMessage(): string {
    if (this._userName) {
      return `Welcome, ${this._userName}`;
    }
    return 'Welcome to VastForce';
  }
  
  ngOnInit() {
    this._userName = this.authService.userName;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}