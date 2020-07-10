import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './core/auth.service';
import { NavigationService } from './core/navigation.service';
import { DialogService } from './core/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private dialogService: DialogService,
    private navigationService: NavigationService) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated && this.authService.hasAccount;
  }

  get currentTitle(): string {
    return this.navigationService.currentTitle;
  }

  async logout(): Promise<void> {
    let response = await this.dialogService.popConfirmation('Are you sure you want to log out?');

    if (response.data) {
      return this.authService.logout();
    }
  }
}
