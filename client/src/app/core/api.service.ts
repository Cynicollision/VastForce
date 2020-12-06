import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { OperationResponse } from './../../../../shared/contracts/OperationResponse';
import { OrgRegistration } from './../../../../shared/contracts/OrgRegistration';
import { Account } from './../../../../shared/models/Account';
import { AccountSummary } from './../../../../shared/models/AccountSummary';
import { Job } from './../../../../shared/models/Job';
import { Report } from './../../../../shared/models/Report';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  loginAccount(): Promise<OperationResponse<Account>> {
    return this.makePOST<Account>(`${Environment.apiBaseURI}/login`);
  }

  registerAccount(name: string): Promise<OperationResponse<Account>> {
    let registration = {
      name: name,
    };
    return this.makePOST(`${Environment.apiBaseURI}/register`, registration);
  }

  getAccountSummary(accountID: string): Promise<OperationResponse<AccountSummary>> {
    return this.makeGET(`${Environment.apiBaseURI}/account-summary?id=${accountID}`);
  }

  registerOrg(registration: OrgRegistration): Promise<OperationResponse<OrgRegistration>> {
    return this.makePOST(`${Environment.apiBaseURI}/org/register`, registration);
  }

  startJob(job: Job): Promise<OperationResponse<Job>> {
    return this.makePOST(`${Environment.apiBaseURI}/job/start`, job);
  }

  createReport(report: Report): Promise<OperationResponse<Report>> {
    report.ownerAccountID = this.authService.accountID; // TODO: move server-side
    return this.makePOST(`${Environment.apiBaseURI}/report`, report);
  }

  updateReport(report: Report): Promise<OperationResponse<Report>> {
    return this.makePOST(`${Environment.apiBaseURI}/report/${report.id}`, report);
  }

  deleteReport(reportID: string): Promise<OperationResponse<Report>> {
    return this.makeDELETE(`${Environment.apiBaseURI}/report/${reportID}`);
  }

  private makeGET<T>(url: string): Promise<OperationResponse<T>> {
    return this.http.get(url, this.getHttpOptions()).toPromise()
      .then((response: OperationResponse<T>) => response)
      .catch(error => {
        return Promise.resolve(this.buildFailedResponse(error.message));
      });
  }

  private makePOST<T>(url: string, body?: any): Promise<OperationResponse<T>> {
    return this.http.post(url, body, this.getHttpOptions()).toPromise()
      .then((response: OperationResponse<T>) => response)
      .catch(error => Promise.resolve(this.buildFailedResponse(error.message)));
  }

  private makeDELETE<T>(url: string): Promise<OperationResponse<T>> {
    return this.http.delete(url, this.getHttpOptions()).toPromise()
      .then((response: OperationResponse<T>) => response)
      .catch(error => Promise.resolve(this.buildFailedResponse(error.message)));
  }

  private getHttpOptions(): object {
    return {
      headers: {
        'Authorization': `Bearer ${this.authService.idToken}`,
      }
    };
  };

  private buildFailedResponse<T>(error: HttpErrorResponse): OperationResponse<T> {
    let message = error.message ? error.message : error;
    return {
      success: false,
      message: `Service error: ${message || ''}`,
    };
  }
}
