import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { ResourceBase } from './../../../shared/models/ResourceBase';
import { ObjectType } from './../../enum/object-type';
import { ID } from './../../util/object-id';
import { ResponseUtil } from './../../util/response';
import { IResourceController } from '../data-interfaces';
import { IAccountData } from './../data-interfaces';
import { IResourceLogic } from './../logic-interfaces';

export interface ResourceMeta {
    name: string;
    objectType: ObjectType;
}

export class ResourceLogic<T extends ResourceBase> implements IResourceLogic<T> {

    constructor(
        protected accountData: IAccountData,
        protected resourceData: IResourceController<T>, 
        private config: ResourceMeta) {
    }

    protected checkUserOwnsAccount(externalID: string, accountID: string): Promise<OperationResponse<T>> {
        return this.accountData.getByExternalUserID(externalID).then(response => {
            if (response.data.id !== accountID) {
                return ResponseUtil.failAsync<T>(`Requestor does not own the resource.`);
            }

            return ResponseUtil.succeedAsync<T>();
        });
    }

    private get name(): string {
        return this.config.name;
    }

    get(accountExternalID: string, id: string): Promise<OperationResponse<T>> {
        if (!accountExternalID || !id) {
            return ResponseUtil.failAsync(`Couldn\'t fetch ${this.name}: External User ID and Resource ID are required.`);
        }

        return this.resourceData.get(id).then(response => {
            if (!response.success) {
                return ResponseUtil.failAsync<T>(`Failed to retrieve resource: ${response.message}.`, response);
            }

            return this.checkUserOwnsAccount(accountExternalID, response.data.ownerAccountID)
                .then(validationResponse => validationResponse.success ? response : validationResponse);
        });
    }

    getByOwnerID(accountExternalID: string, ownerAccountID: string): Promise<OperationResponse<T[]>> {
        if (!accountExternalID || !ownerAccountID) {
            return ResponseUtil.failAsync<T[]>(`Couldn\'t fetch ${this.name} data: External User ID and Owner ID are required.`);
        }

        return this.checkUserOwnsAccount(accountExternalID, ownerAccountID).then(validationResponse => {
           if (!validationResponse.success) {
               return ResponseUtil.failAsync<T[]>(validationResponse.message, validationResponse);
           }

            return this.resourceData.getByOwnerID(ownerAccountID);
        });
    }

    create(accountExternalID: string, data: T): Promise<OperationResponse<T>> {
        if (!data || !data.name) {
            return ResponseUtil.failAsync<T>(`Couldn\'t create ${this.name}: Name is required.`);
        }

        return this.checkUserOwnsAccount(accountExternalID, data.ownerAccountID).then(validationResponse => {
            if (!validationResponse.success) {
                return validationResponse;
            }

            data.id = ID.new(this.config.objectType);
            return this.resourceData.create(data);
        });
    }

    update(accountExternalID: string, data: T): Promise<OperationResponse<T>> {
        if (!data || !data.id || !data.name) {
            return ResponseUtil.failAsync<T>(`Couldn\'t update ${this.name}: ID and Name are required.`);
        }

        return this.checkUserOwnsAccount(accountExternalID, data.ownerAccountID).then(validationResponse => {
            if (!validationResponse.success) {
                return ResponseUtil.failAsync<T>(validationResponse.message, validationResponse);
            }

            return this.resourceData.update(data.id, data);
        });
    }

    delete(accountExternalID: string, id: string): Promise<OperationResponse<T>> {

        return this.resourceData.get(id).then(response => {
            if (!response.success) {
                return ResponseUtil.failAsync<T>(`Couldn\'t retrieve ${this.name} for validation before deleting.`);
            }

            return this.checkUserOwnsAccount(accountExternalID, response.data.ownerAccountID).then(validationResponse => {
                if (!validationResponse.success) {
                    return ResponseUtil.failAsync<T>(validationResponse.message, validationResponse);
                }
    
                return this.resourceData.delete(response.data.id);
            });
        });
    }
}