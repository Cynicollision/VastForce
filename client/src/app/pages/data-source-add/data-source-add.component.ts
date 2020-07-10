import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Environment } from './../../../environments/environment';
import { Navigable, NavigationService } from './../../core/navigation.service';
import { APIService } from './../../core/api.service';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-data-source-add',
  templateUrl: './data-source-add.component.html',
  styleUrls: ['./data-source-add.component.scss']
})
export class DataSourceAddComponent implements OnInit {
  availableTypes = [
    { value: 'metadata', label: 'Metadata' }, // TODO
    { value: 'user_permissions', label: 'User Permissions' },
  ];

  loginUriTypes = [
    { value: 'sandbox', label: 'Sandbox' },
    { value: 'production', label: 'Production' },
    { value: 'custom', label: 'Custom' },
  ];

  callbackUrl = `${Environment.clientBaseURI}/app/data-source/callback`;

  name = '';
  clientID = '';
  selectedUriType = 'sandbox';
  customUri = 'https://normoyle-dev-ed.lightning.force.com'; // TODO
  selectedTypes = [];

  get canSave(): boolean {
    return !!this.clientID && !!this.name.length && !!this.selectedUriType.length;
    // TODO: also !!this.selectedTypes.length
  }

  constructor(@Inject(DOCUMENT) private document: Document, private apiService: APIService, private navigationService: NavigationService) { }

  ngOnInit() {
  }

  connectSF() {
    this.document.location.href = this.buildSFLoginUrl();
  }

  private buildSFLoginUrl(): string {
    let baseUrl = '';
    if (this.selectedUriType === 'custom') {
      baseUrl = this.customUri;
    }
    else if (this.selectedUriType === 'production') {
      baseUrl = 'https://login.salesforce.com';
    }
    else {
      baseUrl = 'https://login.salesforce.com';
    }

    return `${baseUrl}/services/oauth2/authorize?client_id=${this.clientID}&redirect_uri=${this.callbackUrl}&response_type=code`;
  }

  cancel(): void {
    this.navigationService.goTo(Navigable.DataSources);
  }
}
