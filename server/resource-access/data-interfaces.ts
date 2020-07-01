import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Account } from './../../shared/models/Account';
import { Report } from './../../shared/models/Report';

export interface IAccountData {
    getByExternalUserID(externalID: string): Promise<OperationResponse<Account>>;
    create(data: Account): Promise<OperationResponse<Account>>;
    update(id: string, data: Account): Promise<OperationResponse<Account>>;
}

export interface IResourceController<T> {
    create(data: T): Promise<OperationResponse<T>>;
    delete(id: string): Promise<OperationResponse<T>>;
    get(id: string): Promise<OperationResponse<T>>;
    getByOwnerID(ownerAccountID: string): Promise<OperationResponse<T[]>>;
    update(id: string, data: T): Promise<OperationResponse<T>>;
}

export interface IOrgData extends IResourceController<Report> {
}

export interface IReportData extends IResourceController<Report> {
}