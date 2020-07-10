import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute, 
    private apiService: APIService, 
    private navigationService: NavigationService,
    private notifyService: NotifyService,
    private waitService: WaitService) { }

  ngOnInit() {
    let url = window.location.href;
    let sfCode = url.substring(url.lastIndexOf('?'), url.length);
    this.startJob(sfCode);
      
  }

  private async startJob(sfCode) {
    let job: Job = {
      sfCode: sfCode
    };

    let task = this.apiService.startOrgDataJob(job);

    let response = await this.waitService.wait(task);

    if (response.success) {
      job = response.data;
      this.navigationService.goToResource(Navigable.JobView, job.id);
    }
    else {
      this.notifyService.popError(response.message);
    }
  }
}
