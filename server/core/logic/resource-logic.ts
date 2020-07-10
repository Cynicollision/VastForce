import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { ResourceBase } from './../../../shared/models/ResourceBase';
import { IAccountData, IResourceController, IResourceLogic, ResourceMeta } from './../interfaces';
import { ObjectID } from './../util/object-id';
import { ResponseUtil } from './../util/response';

export class ResourceLogic<T extends ResourceBase> implements IResourceLogic<T> {

    constructor(
        protected accountData: IAccountData,
        protected resourceData: IResourceController<T>, 
        private config: ResourceMeta) {
    }

    protected async checkUserOwnsAccount(externalID: string, accountID: string): Promise<OperationResponse<T>> {
        let response = await this.accountData.getByExternalUserID(externalID);

        if (response.data.id !== accountID) {
            return ResponseUtil.failAsync<T>(`Requestor does not own the resource.`);
        }

        return ResponseUtil.succeedAsync<T>();
    }

    private get name(): string {
        return this.config.name;
    }

    async get(accountExternalID: string, resourceId: string): Promise<OperationResponse<T>> {

        if (!accountExternalID || !resourceId) {
            return ResponseUtil.failAsync(`Couldn\'t fetch ${this.name}: External User ID and Resource ID are required.`);
        }

        let resourceResponse = await this.resourceData.get(resourceId);

        if (!resourceResponse.success) {
            return ResponseUtil.failAsync<T>(`Failed to retrieve resource: ${resourceResponse.message}.`, resourceResponse);
        }

        let validationResponse = await this.checkUserOwnsAccount(accountExternalID, resourceResponse.data.ownerAccountID);

        return validationResponse.success ? resourceResponse : validationResponse;
    }

    async getByOwnerID(accountExternalID: string, ownerAccountID: string): Promise<OperationResponse<T[]>> {
        if (!accountExternalID || !ownerAccountID) {
            return ResponseUtil.failAsync<T[]>(`Couldn\'t fetch ${this.name} data: External User ID and Owner ID are required.`);
        }
        
        let validationResponse = await this.checkUserOwnsAccount(accountExternalID, ownerAccountID);

        if (!validationResponse.success) {
            return ResponseUtil.failAsync<T[]>('Failed validating resource ownership.', validationResponse);
        }

        return this.resourceData.getByOwnerID(ownerAccountID);
    }

    async create(accountExternalID: string, data: T): Promise<OperationResponse<T>> {
        if (!data || !data.name) {
            return ResponseUtil.failAsync<T>(`Couldn\'t create ${this.name}: Name is required.`);
        }

        let validationResponse = await this.checkUserOwnsAccount(accountExternalID, data.ownerAccountID);

        if (!validationResponse.success) {
            return validationResponse;
        }

        data.id = ObjectID.new(this.config.objectType);

        return this.resourceData.create(data);
    }

    async update(accountExternalID: string, data: T): Promise<OperationResponse<T>> {
        if (!data || !data.id || !data.name) {
            return ResponseUtil.failAsync<T>(`Couldn\'t update ${this.name}: ID and Name are required.`);
        }

        let validationResponse = await this.checkUserOwnsAccount(accountExternalID, data.ownerAccountID);

        if (!validationResponse.success) {
            return ResponseUtil.failAsync<T>(validationResponse.message, validationResponse);
        }

        return this.resourceData.update(data.id, data);
    }

    async delete(accountExternalID: string, id: string): Promise<OperationResponse<T>> {
        if (!accountExternalID || !id) {
            return ResponseUtil.failAsync<T>(`Couldn\'t fetch ${this.name} data: External User ID and Owner ID are required.`);
        }

        let resourceResponse = await this.resourceData.get(id);

        if (!resourceResponse.success) {
            return ResponseUtil.failAsync<T>(`Couldn\'t retrieve ${this.name} for validation before deleting.`);
        }

        let validationResponse = await this.checkUserOwnsAccount(accountExternalID, resourceResponse.data.ownerAccountID);

        if (!validationResponse.success) {
            return ResponseUtil.failAsync<T>(validationResponse.message, validationResponse);
        }

        return this.resourceData.delete(resourceResponse.data.id);
    }
}