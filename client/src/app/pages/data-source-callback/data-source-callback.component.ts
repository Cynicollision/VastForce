import { Component, OnInit } from '@angular/core';
import { Job } from './../../../../../shared/models/Job';
import { APIService } from './../../core/api.service';
import { NavigationService, Navigable } from './../../core/navigation.service';
import { NotifyService } from './../../core/notify.service';
import { WaitService } from './../../core/wait.service';

@Component({
  selector: 'app-data-source-callback',
  templateUrl: './data-source-callback.component.html',
  styleUrls: ['./data-source-callback.component.scss']
})
export class DataSourceCallbackComponent implements OnInit {

  constructor(
    private apiService: APIService, 
    private navigationService: NavigationService,
    private notifyService: NotifyService,
    private waitService: WaitService) { }

  
  selectedTypes = [];
  availableTypes = [
    { value: 'metadata', label: 'Metadata' }, // TODO
    { value: 'user_permissions', label: 'User Permissions' },
  ];

  async ngOnInit() {
    this.registerOrg();
  }

  private async registerOrg() {
    let job: Job = {
      orgId: this.getOrgIdFromUrl(),
    };

    let task = this.apiService.registerOrg(job);

    let response = await this.waitService.wait(task);

    if (response.success) {
      // TODO: route to "new job" page w/ the org ID, and move 'startJob' (etc) there.
    }
    else {
      this.notifyService.popError(response.message);
    }
  }

  async startJob() {
    let job: Job = {
      orgId: this.getOrgIdFromUrl(),
      options: this.selectedTypes,
    };

    let task = this.apiService.startJob(job);

    let response = await this.waitService.wait(task);

    if (response.success) {
      this.notifyService.popSuccess('Job started!');
    }
  }

  private getOrgIdFromUrl(): string {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    return params.get('orgId');
  }
}
