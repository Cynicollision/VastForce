import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Account } from '../../shared/models/AccountData';
import { IReportData } from '../data/report-data';
import { IAccountData } from '../data/account-data';
import { ObjectType } from '../enum/object-type';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';

export interface IAccountLogic {
    login(externalID: string): Promise<OperationResponse<Account>>;
    register(externalID: string, userName: string): Promise<OperationResponse<Account>>;
    getAccountData(externalID: string, accountID: string): Promise<OperationResponse<Account>>;
}

export class AccountLogic implements IAccountLogic {

    constructor(private accountData: IAccountData) {
    }

    login(externalID: string): Promise<OperationResponse<Account>> {

        return this.accountData.getByOwnerID(externalID).then(response => {
            let account = response.data;

            if (!account) {
                return ResponseUtil.failAsync<Account>('Account does not exist for that External ID');
            }

            return ResponseUtil.succeedAsync<Account>(account);
        });
    }

    register(externalID: string, userName: string): Promise<OperationResponse<Account>> {

        if (!externalID || !userName) {
            return ResponseUtil.failAsync<Account>('Couldn\'t register: External ID and User Name are required.');
        }

        return this.accountData.getByOwnerID(externalID).then(response => {
            if (response.success) {
                return ResponseUtil.failAsync<Account>('Account already exists with that External ID.');
            }

            let newAccount = {
                id: ID.new(ObjectType.Account),
                externalID: externalID,
                name: userName,
            };

            return this.accountData.create(newAccount).then(createResponse => {
                let account = createResponse.data;

                if (!createResponse.success) {
                    return ResponseUtil.failAsync<Account>('Failed creating account.', createResponse);
                }

                return this.login(account.externalID);
            });
        });
    }

    getAccountData(externalID: string, accountID: string): Promise<OperationResponse<Account>> {
        if (!externalID || !accountID) {
            return ResponseUtil.failAsync('Couldn\'t retrieve account data: External ID and Account ID are required.');
        }

        return this.accountData.getByOwnerID(externalID).then(response => {
            let account = response.data;

            if (!response || !response.success || response.data.id !== accountID) {
                return ResponseUtil.failAsync<Account>('Couldn\'t retrieve account data: Not logged in as claimed account owner.');
            }

            return ResponseUtil.succeedAsync<Account>(account);
        });
    }
}