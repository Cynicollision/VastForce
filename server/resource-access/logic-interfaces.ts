import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Account } from '../../shared/models/Account';
import { OrgData } from '../../shared/models/OrgData';
import { Report } from '../../shared/models/Report';
import { OrgDataMeta } from './../../shared/models/OrgData';

export interface IAccountLogic {
    login(externalID: string): Promise<OperationResponse<Account>>;
    register(externalID: string, userName: string): Promise<OperationResponse<Account>>;
    getAccountData(externalID: string, accountID: string): Promise<OperationResponse<Account>>;
}

export interface IResourceLogic<T> {
    create(accountExternalID: string, data: T): Promise<OperationResponse<T>>;
    delete(accountExternalID: string, id: string): Promise<OperationResponse<T>>;
    get(accountExternalID: string, id: string): Promise<OperationResponse<T>>;
    getByOwnerID(accountExternalID: string, ownerAccountID: string): Promise<OperationResponse<T[]>>;
    update(accountExternalID: string, data: T): Promise<OperationResponse<T>>;
}

export interface IOrgDataLogic extends IResourceLogic<OrgData> {
    getDataSourcesByOwnerID(accountExternalID: string, accountID: string): Promise<OperationResponse<OrgDataMeta[]>>;
}

export interface IReportLogic extends IResourceLogic<Report> {
}