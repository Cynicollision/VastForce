import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from '../../../../../shared/models/OrgData';
import { ListItem } from '../../core/list/list.component';
import { AccountDataService } from '../../core/account-data.service';
import { NavigationService, Navigable } from '../../core/navigation.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  profiles: ListItem[];
  hasNoProfiles = false;

  constructor(
    private navigationService: NavigationService,
    private orgDataService: AccountDataService) { 
  }

  ngOnInit() {
    this.profiles = [];

    let sub = this.orgDataService.orgData.subscribe(orgData => {
      let profiles = orgData.profiles || [];

      this.profiles = profiles.map(profile => this.mapProfileToListItem(profile))
        .sort((a, b) => a.name > b.name ? 1 : -1); // TODO: probably wrong

      this.hasNoProfiles = !this.profiles.length;
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private mapProfileToListItem(profile: Profile): ListItem {
    return { id: profile.id, name: profile.name, data: profile, description: 'TODO' };
  }

  viewProfile(profileID: string): void {
    this.navigationService.goToResource(Navigable.ProfileDetail, profileID);
  }
}
