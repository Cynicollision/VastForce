import { IAccountLogic } from '../interfaces';
import { AccountLogic } from '../logic/account-logic';
import { MockAccountData } from './mock/mock-account-data';
import { MockDataController } from './mock/mock-data';
import { TestUtil } from './test-util';

describe('account logic', () => {
    let mockAccountData: MockAccountData;
    let testExternalID: string;
    let testAccountID: string;
    
    let accountLogic: IAccountLogic;
    let mockData = new MockDataController();

    beforeEach(() => {
        accountLogic = new AccountLogic(mockAccountData);

        testExternalID = TestUtil.testExternalID;
        testAccountID = TestUtil.testAccountID;

        mockAccountData = new MockAccountData();
        testExternalID = TestUtil.testExternalID;
        testAccountID = TestUtil.testAccountID;
    });

    it('can be instantiated', () => {
        expect(accountLogic).toBeTruthy();
    });

    it('retrieves account data by ID and builds summary info', done => {
        mockData.setCollection([
            { id: '111', name: 'Test Report 1', ownerAccountID: testAccountID },
            { id: '222', name: 'Test Report 2', ownerAccountID: testAccountID },
            { id: '333', name: 'Test Report 3', ownerAccountID: testAccountID },
            { id: '444', name: 'Test Report 4', ownerAccountID: testAccountID },
            { id: '555', name: 'Test Report 5', ownerAccountID: testAccountID },
        ]);

        accountLogic.getAccountData(testExternalID, testAccountID).then(response => {
            expect(response.success).toBe(true);
            expect(response.data).toBeDefined();

            done();
        });
    });
});
