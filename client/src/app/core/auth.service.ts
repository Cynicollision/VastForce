import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { Environment } from './../../environments/environment';
import { Account } from './../../../../shared/models/Account';
import { NotifyService } from './notify.service';

export interface AuthResult {
  success: boolean;
  message?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken = '';
  private _accessToken = '';
  private _expiresAt = 0;
  private _accountID = '';
  private _userName = '';

  private auth0 = new auth0.WebAuth(Environment.authConfig);

  constructor(public router: Router, private notifyService: NotifyService) {
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  get isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

  get accountID(): string {
    return this._accountID;
  }

  get userName(): string {
    return this._userName;
  }

  get hasAccount(): boolean {
    return !!this._accountID;
  }

  setAccount(account: Account): void {
    this._accountID = account.id;
    this._userName = account.name;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public init(): Promise<AuthResult> {
    return new Promise<AuthResult>((resolve, reject) => {

      if (this.isAuthenticated) {
        return resolve({ success: true });
      }

      return this.handleAuthentication().then(() => {
        let next: Promise<AuthResult> = Promise.resolve({ success: true });

        if ((localStorage.getItem('access_token') || '').length) {
          next = this.renewTokens();
        }

        return next.then(result => resolve(result));
      });
    });
  }

  private handleAuthentication(): Promise<AuthResult> {
    return new Promise<AuthResult>((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.router.navigate(['/']);
          return resolve(this.localLogin(authResult));
        } 
        
        return resolve({ success: true, message: `Authentication claim not present.` });
      });
    });
  }

  private renewTokens(): Promise<AuthResult> {
    return new Promise<AuthResult>((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
          return resolve(this.localLogin(authResult));
        }

        if (!!err) {
          // this.logout(); TODO
          this.notifyService.popError(err && err.error ? err.error : err);
        }

        return resolve({ success: !err, message: `Could not get a new token (${err.error}: ${err.error_description}).` });
      });
    });
  }

  private localLogin(authResult): AuthResult {
    this._idToken = authResult.idToken;
    this._accessToken = authResult.accessToken;
    this._expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

    localStorage.setItem('access_token', this._accessToken);

    return { success: true, message: 'Authenticated successfully.' };
  }

  public logout(): void {
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('access_token');

    this.router.navigate(['/login']);
  }
}
