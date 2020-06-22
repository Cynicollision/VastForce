import { IAccountData } from '../data/account-data';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Account } from '../../shared/models/AccountData';

export class MockAccountData implements IAccountData {
    public readonly testExternalID = 'Test External ID';
    public readonly testAccountID = 'Test Account ID';
    public readonly testAccountName = 'Test Account Name';

    get(id: string): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            let testAccount = { id: id, externalID: this.testExternalID, name: this.testAccountName };
            return resolve({ success: true, data: testAccount });
        });
    }

    getByOwnerID(externalID: string): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            let testAccount = { id: this.testAccountID, externalID: externalID, name: this.testAccountName };
            return resolve({ success: true, data: testAccount });
        });
    }

    create(data: Account): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }

    update(id: string, data: Account): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }
}