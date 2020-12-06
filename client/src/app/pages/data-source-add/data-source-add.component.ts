import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Environment } from './../../../environments/environment';
import { Navigable, NavigationService } from './../../core/navigation.service';
import { APIService } from './../../core/api.service';

@Component({
  selector: 'app-data-source-add',
  templateUrl: './data-source-add.component.html',
  styleUrls: ['./data-source-add.component.scss']
})
export class DataSourceAddComponent implements OnInit {
  readonly callbackUrl = `${Environment.serverBaseURI}/oauth2/callback`;

  // TODO
  name = 'Dev';
  clientId = '3MVG9mclR62wycM3eM0FxhD4ha7IL73vNWrVm3jeclOa8Ognj5jayvqBX9IVStFZTBxbTo.gQjNFDyG_0gW7r';

  orgUrl = 'https://login.salesforce.com'; 
  loginUrls = [
    'https://login.salesforce.com',
    'https://test.salesforce.com',
  ];

  get canSave(): boolean {
    return !!this.clientId && !!this.name.length && !!this.orgUrl.length;
  }

  constructor(@Inject(DOCUMENT) private document: Document, private apiService: APIService, private navigationService: NavigationService) { }

  ngOnInit() {
  }

  connectSF() {
    this.document.location.href = this.buildSFLoginUrl();
  }

  private buildSFLoginUrl(): string {
    let state = JSON.stringify({
      clientID: this.clientId,
      orgUrl: this.orgUrl,
    });

    return `${this.orgUrl}/services/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${this.callbackUrl}&response_type=code&state=${encodeURI(state)}`;
  }

  cancel(): void {
    this.navigationService.goTo(Navigable.DataSources);
  }
}
