import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

export enum Navigable {
  Home,
  ProfileList,
  ProfileDetail,
  QueryPermissions,
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private routeMap = new Map<Navigable, string>();

  constructor(private route: ActivatedRoute, private router: Router) { 
      this.routeMap.set(Navigable.Home, '/');
      this.routeMap.set(Navigable.ProfileList, '/profiles');
      this.routeMap.set(Navigable.ProfileDetail, '/profile');

      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          let route = this.route;
          while (route.firstChild) {
            route = route.firstChild;
          }
          route.data.subscribe(data => {
            this._currentTitle = data.title;
          }).unsubscribe();
        }
      })
    }

    private _currentTitle: string = 'VastForce';
    get currentTitle(): string {
      return this._currentTitle;
    }

    goTo(target: Navigable) {
      this.router.navigate([this.routeMap.get(target)]);
    }

    goToResource(target: Navigable, id: string) {
      this.router.navigate([this.routeMap.get(target), id]);
    }
}
