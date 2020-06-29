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
    private navigationService: NavigationService) { 
  }

  ngOnInit() {
    this.profiles = [];
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
