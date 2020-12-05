import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Account } from './../../shared/models/Account';
import { ObjectType } from './enum/object-type';

export interface AppConfig {
    envType?: string;
    port?: string;
    clientUrl?: string;
    auth0CallbackUrl?: string;
    authConfig?: { authClientID: string; authJwksUri: string, authUri: string };
    dbConfig?: { mongoUri: string; }
}

export interface IAccountData {
    getByExternalUserID(externalID: string): Promise<OperationResponse<Account>>;
    create(data: Account): Promise<OperationResponse<Account>>;
    update(id: string, data: Account): Promise<OperationResponse<Account>>;
}

export interface IAccountLogic {
    login(externalID: string): Promise<OperationResponse<Account>>;
    register(externalID: string, userName: string): Promise<OperationResponse<Account>>;
    getAccountData(externalID: string, accountID: string): Promise<OperationResponse<Account>>;
}

export interface IResourceController<T> {
    create(data: T): Promise<OperationResponse<T>>;
    delete(id: string): Promise<OperationResponse<T>>;
    get(id: string): Promise<OperationResponse<T>>;
    getByOwnerID(ownerAccountID: string): Promise<OperationResponse<T[]>>;
    update(id: string, data: T): Promise<OperationResponse<T>>;
}

export interface IResourceLogic<T> {
    create(accountExternalID: string, data: T): Promise<OperationResponse<T>>;
    delete(accountExternalID: string, id: string): Promise<OperationResponse<T>>;
    get(accountExternalID: string, id: string): Promise<OperationResponse<T>>;
    getByOwnerID(accountExternalID: string, ownerAccountID: string): Promise<OperationResponse<T[]>>;
    update(accountExternalID: string, data: T): Promise<OperationResponse<T>>;
}

export interface ResourceMeta {
    name: string;
    objectType: ObjectType;
}