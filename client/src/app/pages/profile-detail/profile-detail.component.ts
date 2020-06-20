import { Component, OnInit } from '@angular/core';
import { OperationResponse } from '../../../../../shared/contracts/OperationResponse';
import { Profile } from '../../../../../shared/models/OrgData';
import { ConfirmComponent } from '../../core/confirm/confirm.component';
import { DialogResult, DialogService } from '../../core/dialog.service';
import { AccountDataService } from '../../core/account-data.service';
import { NavigationService, Navigable } from '../../core/navigation.service';
import { NotifyService } from '../../core/notify.service';
import { WaitService } from '../../core/wait.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  data: Profile = {};

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private navigationService: NavigationService,
    private notifyService: NotifyService,
    private profileDataService: AccountDataService,
    private waitService: WaitService) {
  }

  ngOnInit() {
    let subs = [];

    subs.push(this.route.params.subscribe(params => {
      let profileID = params['id'];


      subs.push(this.profileDataService.profileData.subscribe(profiles => {
        let profile = profiles.find(b => b.id === profileID);
        this.data = {...profile } || {};

        if (!profile) {
          this.notifyService.popError(`Couldn't find data for profile ID: ${profileID}`);
          this.navigationService.goTo(Navigable.ProfileList);
          return;
        }
      }));
    }));

    subs.forEach(sub => sub.unsubscribe());
  }


  cancel(): void {
    this.navigationService.goTo(Navigable.ProfileList);
  }
}
