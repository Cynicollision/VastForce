import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { AccountSummary } from './../../shared/models/AccountSummary';
import { ResponseUtil } from './../util/response';

import { IAccountLogic, IOrgDataLogic, IReportLogic } from '../resource-access/logic-interfaces';

export class AccountSummaryLogic {

    constructor(
        private accountLogic: IAccountLogic, 
        private orgDataLogic: IOrgDataLogic, 
        private reportLogic: IReportLogic) {
    }

    getAccountData(accountExternalID: string, accountID: string): Promise<OperationResponse<AccountSummary>> {
        return Promise.all([
            this.accountLogic.getAccountData(accountExternalID, accountID), 
            this.orgDataLogic.getDataSourcesByOwnerID(accountExternalID, accountID), // TODO: implement a 'getSummariesByOwnerID' and return DataSourceSummary[]
            this.reportLogic.getByOwnerID(accountExternalID, accountID),
        ]).then(responses => {
            if (!ResponseUtil.allSuccess(responses)) {
                return ResponseUtil.combineResponses(responses);
            }

            let [ accountResponse, orgDataResponse, reportDataResponse] = responses;

            let summary: AccountSummary = {
                account: accountResponse.data,
                dataSources: orgDataResponse.data,
                reports: reportDataResponse.data,
            }

            return ResponseUtil.succeedAsync(summary);
        });
    }
}