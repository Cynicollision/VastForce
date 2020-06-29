import { IAccountData } from '../data/account-data';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Account } from '../../shared/models/Account';
import { TestUtil } from './test-util';

export class MockAccountData implements IAccountData {
    
    getByExternalUserID(externalID: string): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            let testAccount = { id: TestUtil.testAccountID, externalID: externalID, name: TestUtil.testAccountName };
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