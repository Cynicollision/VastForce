import { Component, OnInit } from '@angular/core';
import { OrgDataMeta } from '../../../../../shared/models/OrgData';
import { ListItem } from '../../core/list/list.component';
import { NavigationService, Navigable } from '../../core/navigation.service';
import { AccountDataService } from 'src/app/core/account-data.service';

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {
  dataSources: ListItem[];

  constructor(
    private navigationService: NavigationService,
    private accountDataService: AccountDataService) { 
  }

  ngOnInit() {
    let subs = [];
    
    subs.push(this.accountDataService.orgSummaryData.subscribe(dataSources => {
      this.dataSources = dataSources.map(ds => this.mapDataSourceToListItem(ds));
    }));

    subs.forEach(s => s.unsubscribe());
  }

  private mapDataSourceToListItem(dataSource: OrgDataMeta): ListItem {
    return { 
      id: dataSource.id, 
      name: dataSource.name, 
      data: dataSource, 
      description: `Last updated ${dataSource.lastSyncDate}\nbeepboop`,
    };
  }

  viewDataSource(orgDataID: string): void {
    this.navigationService.goToResource(Navigable.DataSourceView, orgDataID);
  }
}
