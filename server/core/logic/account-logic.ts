import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { Account } from './../../../shared/models/Account';
import { ObjectType } from './../enum/object-type';
import { ObjectID } from './../util/object-id';
import { ResponseUtil } from './../util/response';
import { IAccountData, IAccountLogic } from './../interfaces';

export class AccountLogic implements IAccountLogic {

    constructor(private accountData: IAccountData) {
    }

    async login(externalID: string): Promise<OperationResponse<Account>> {
        let response = await this.accountData.getByExternalUserID(externalID);

        if (!response.data) {
            return ResponseUtil.failAsync<Account>('Account does not exist for that External ID');
        }

        return ResponseUtil.succeedAsync<Account>(response.data);
    }

    async register(externalID: string, userName: string): Promise<OperationResponse<Account>> {
        if (!externalID || !userName) {
            return ResponseUtil.failAsync<Account>('Couldn\'t register: External ID and User Name are required.');
        }

        let checkExistingResponse = await this.accountData.getByExternalUserID(externalID);

        if (checkExistingResponse.success) {
            return ResponseUtil.failAsync<Account>('Account already exists with that External ID.');
        }

        let newAccount = {
            id: ObjectID.new(ObjectType.Account),
            externalID: externalID,
            name: userName,
        };

        let createResponse = await this.accountData.create(newAccount);
            
        if (!createResponse.success) {
            return ResponseUtil.failAsync<Account>('Failed creating account.', createResponse);
        }

        return this.login(createResponse.data.externalID);
    }

    async getAccountData(externalID: string, accountID: string): Promise<OperationResponse<Account>> {
        if (!externalID || !accountID) {
            return ResponseUtil.failAsync('Couldn\'t retrieve account data: External ID and Account ID are required.');
        }

        let response = await this.accountData.getByExternalUserID(externalID);

        if (!response || !response.success || response.data.id !== accountID) {
            return ResponseUtil.failAsync<Account>('Couldn\'t retrieve account data: Not logged in as claimed account owner.');
        }
        
        return ResponseUtil.succeedAsync<Account>(response.data);
    }
}