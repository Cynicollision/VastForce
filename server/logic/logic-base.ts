import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ResourceBase } from '../../shared/models/ResourceBase';
import { IResourceController } from '../data/controller-base';
import { IAccountData } from '../data/account-data';
import { ObjectType } from '../enum/object-type';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';

export interface ResourceMeta {
    name: string;
    objectType: ObjectType;
}

export interface IResourceLogic<T> {
    create(accountExternalID: string, data: T): Promise<OperationResponse<T>>;
    delete(accountExternalID: string, id: string): Promise<OperationResponse<T>>;
    get(id: string): Promise<OperationResponse<T>>;
    getByOwnerID(ownerAccountID: string): Promise<OperationResponse<T[]>>;
    update(accountExternalID: string, data: T): Promise<OperationResponse<T>>;
}

export class ResourceLogic<T extends ResourceBase> implements IResourceLogic<T> {

    constructor(
        protected accountData: IAccountData,
        protected resourceData: IResourceController<T>, 
        private config: ResourceMeta) {
    }

    protected checkUserOwnsAccount(externalID: string, accountID: string): Promise<boolean> {
        return this.accountData.getByOwnerID(externalID).then(response => {
            return response && response.success && response.data.id === accountID;
        });
    }

    private get name(): string {
        return this.config.name;
    }

    // TODO: validate ownership.
    get(id: string): Promise<OperationResponse<T>> {
        if (!id) {
            return ResponseUtil.failAsync(`Couldn\'t fetch ${this.name}: ID is required.`);
        }

        return this.resourceData.get(id);
    }

    getByOwnerID(ownerAccountID: string): Promise<OperationResponse<T[]>> {
        if (!ownerAccountID) {
            return ResponseUtil.failAsync(`Couldn\'t fetch ${this.name} data: Owner Account ID required.`);
        }

        return this.resourceData.getByOwnerID(ownerAccountID);
    }

    create(accountExternalID: string, data: T): Promise<OperationResponse<T>> {
        if (!data || !data.name) {
            return ResponseUtil.failAsync<T>(`Couldn\'t create ${this.name}: Name is required.`);
        }

        return this.checkUserOwnsAccount(accountExternalID, data.ownerAccountID).then(isOwner => {
            if (!isOwner) {
                return ResponseUtil.failAsync<T>(`Couldn\'t create ${this.name}: Not logged in as claimed ${this.name} owner.`);
            }

            data.id = ID.new(this.config.objectType);
            return this.resourceData.create(data);
        });
    }

    update(profileExternalID: string, data: T): Promise<OperationResponse<T>> {
        if (!data || !data.id || !data.name) {
            return ResponseUtil.failAsync<T>(`Couldn\'t update ${this.name}: ID and Name are required.`);
        }

        return this.checkUserOwnsAccount(profileExternalID, data.ownerAccountID).then(isOwner => {
            if (!isOwner) {
                return ResponseUtil.failAsync<T>(`Couldn\'t create ${this.name}: Not logged in as claimed ${this.name} owner.`);
            }

            return this.resourceData.update(data.id, data);
        });
    }

    delete(accountExternalID: string, id: string): Promise<OperationResponse<T>> {

        return this.resourceData.get(id).then(response => {
            if (!response.success) {
                return ResponseUtil.failAsync<T>(`Couldn\'t retrieve ${this.name} for validation before deleting.`);
            }

            return this.checkUserOwnsAccount(accountExternalID, response.data.ownerAccountID).then(isOwner => {
                if (!isOwner) {
                    return ResponseUtil.failAsync<T>(`Couldn\'t delete ${this.name}: Not logged in as claimed ${this.name} Owner.`);
                }
    
                return this.resourceData.delete(response.data.id);
            });
        });
    }
}