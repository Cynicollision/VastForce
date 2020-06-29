import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from './api.service';
import { AccountDataService } from './account-data.service';
import { AuthService } from './auth.service';
import { WaitService } from './wait.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  
  constructor(private router: Router,
    private apiService: APIService,
    private authService: AuthService,
    private accountDataService: AccountDataService,
    private waitService: WaitService) {
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {

      let canActivatePromise = this.ensureLoggedIn()
        .then(canActivate => {
          if (!canActivate) {
            return Promise.resolve(false);
          }
          return this.accountDataService.resolveRoute();
        });

      this.waitService.wait(canActivatePromise).then(canActivate => {
        if (!canActivate) {
          this.router.navigate(['login']);
        }
        observer.next(canActivate);
        observer.complete();
      });
    });
  }

  private async ensureLoggedIn(): Promise<boolean> {
    const result = await this.authService.init();
    if (!result.success || !this.authService.isAuthenticated) {
      return Promise.resolve(false);
    }
    let needsLogin = !this.authService.accountID;
    let loginPromise = Promise.resolve(true);
    if (needsLogin) {
      loginPromise = this.apiService.loginAccount().then(response => {
        if (!response.success || !response.data) {
          return Promise.resolve(false);
        }
        this.authService.setAccount(response.data);
        return Promise.resolve(true);
      });
    }
    return loginPromise;
  }
}