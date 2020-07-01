import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OperationResponse } from '../../../../shared/contracts/OperationResponse';
import { Account } from './../../../../shared/models/Account';
import { AccountSummary } from './../../../../shared/models/AccountSummary';
import { DataSourceSummary } from './../../../../shared/models/DataSourceSummary';
import { Report } from './../../../../shared/models/Report';
import { APIService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  private _initialized = false;
  private _accountDataSource = new BehaviorSubject<Account>(<Account>{});
  private _orgSummaryDataSource = new BehaviorSubject<DataSourceSummary[]>([]);
  private _reportDataSource = new BehaviorSubject<Report[]>([]);

  accountData = this._accountDataSource.asObservable();
  orgSummaryData = this._orgSummaryDataSource.asObservable();
  reportData = this._reportDataSource.asObservable();

  get isInitialized(): boolean {
    return this._initialized;
  }

  constructor(private apiService: APIService, private authService: AuthService) {
  }

  resolveRoute(): Promise<boolean> {
    let needsAccountData = !this.isInitialized;
    let loadPromise = Promise.resolve(true);

    if (needsAccountData) {
      loadPromise = this.apiService.getAccountSummary(this.authService.accountID).then(response => {
        if (!response.success || !response.data) {
          return Promise.resolve(false);
        }
        this.init(response.data);
        return Promise.resolve(true);
      });
    }
    return loadPromise;
  }

  private init(data: AccountSummary){
    this._accountDataSource.next(data.account);
    this._orgSummaryDataSource.next(data.dataSources);
    this._reportDataSource.next(data.reports);
    this._initialized = true;
  }

  createReport(newReport: Report): Promise<OperationResponse<Report>> {
    return this.apiService.createReport(newReport).then(response => {
      if (response.success) {
        let newCollection = this._reportDataSource.value.concat(response.data);
        this._reportDataSource.next(newCollection);
      }
      return response;
    });
  }

  updateReport(updatedReport: Report): Promise<OperationResponse<Report>> {
    return this.apiService.updateReport(updatedReport).then(response => {

      if (response.success) {
        let newCollection: Report[] = this._reportDataSource.value
          .map(report => report.id === updatedReport.id ? updatedReport : report);
          
        this._reportDataSource.next(newCollection);
      }

      return response;
    });
  }

  deleteReport(reportID: string): Promise<OperationResponse<Report>> {
    return this.apiService.deleteReport(reportID).then(response => {
      if (response.success) {
        let newCollection: Report[] = [];
        this._reportDataSource.value.forEach(report => {
          if (report.id !== reportID) {
            newCollection.push(report);
          }
        });
    
        this._reportDataSource.next(newCollection);
      }
      return response;
    });
  }
}
