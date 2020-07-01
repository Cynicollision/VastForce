import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

export enum Navigable {
  Home,
  DataSources,
  DataSourceAdd,
  DataSourceView,
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
      this.routeMap.set(Navigable.DataSources, '/app/data-sources');
      this.routeMap.set(Navigable.DataSourceAdd, '/app/data-source/new');
      this.routeMap.set(Navigable.DataSourceView, '/app/data-source');
      this.routeMap.set(Navigable.ProfileList, '/app/profiles');
      this.routeMap.set(Navigable.ProfileDetail, '/app/profile');

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
