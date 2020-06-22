import { IAccountLogic, AccountLogic } from '../logic/account-logic';
import { MockReportData } from './mock-report-data';
import { MockAccountData } from './mock-account-data';
import { MockResourceLogic } from './mock-logic';
import { MockDataController, TestData } from './mock-data';
import { IResourceLogic } from 'logic/logic-base';

describe('VastForce app server', () => {
    let mockAccountData: MockAccountData;
    let testExternalID: string;
    let testAccountID: string;

    beforeEach(() => {
        mockAccountData = new MockAccountData();
        testExternalID = mockAccountData.testExternalID;
        testAccountID = mockAccountData.testAccountID;
    });

    describe('resource logic', () => {
        let mockResourceData: MockDataController;
        let resourceLogic: IResourceLogic<TestData>;

        beforeEach(() => {
            mockResourceData = new MockDataController();
            resourceLogic = new MockResourceLogic(mockAccountData, mockResourceData);
        });
        
        it('can be instantiated', () => {
            expect(resourceLogic).toBeTruthy();
        });

        it('retrieves a resource by ID', done => {
            resourceLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });

        it('creates a new resource, returning it with a populated ID', done => {
            let testResource = { name: 'New Resource', ownerAccountID: testAccountID };
            resourceLogic.create(testExternalID, testResource).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Resource');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });

        it('fails to create a new resource if Name is not provided', done => {
            let testResource = { ownerAccountID: testAccountID };
            resourceLogic.create(testExternalID, testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to create a new resource if Owner Account ID is not provided', done => {
            let testResource = { name: 'New Resource' };
            resourceLogic.create(testExternalID, testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to create a new resource if the ExternalID is not valid for the claimed Owner Account ID', done => {
            let testResource = { name: 'New Resource' };
            resourceLogic.create('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('updates a resource, returning the updated version', done => {
            let testResource = { id: '999', name: 'Updated Resource', ownerAccountID: testAccountID };
            resourceLogic.update(testExternalID, testResource).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('Updated Resource');
                expect(response.data.id).toBe('999');
                done();
            });
        });

        it('fails to update a resource if Name is not provided', done => {
            let testResource = { ownerAccountID: testAccountID };
            resourceLogic.update('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to update a resource if Owner Account ID is not provided', done => {
            let testResource = { name: 'Updated Resource' };
            resourceLogic.update('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to update a resource if the External ID is not valid for the claimed Owner Account ID', done => {
            let testResource = { name: 'Updated Resource' };
            resourceLogic.update('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to retrieve a resource when no ID is specified', done => {
            resourceLogic.get('').then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
    });

    describe('account logic', () => {
        let accountLogic: IAccountLogic;
        let mockReportData = new MockReportData();

        beforeEach(() => {
            accountLogic = new AccountLogic(mockAccountData);

            testExternalID = mockAccountData.testExternalID;
            testAccountID = mockAccountData.testAccountID;
        });

        it('can be instantiated', () => {
            expect(accountLogic).toBeTruthy();
        });

        it('retrieves account data by ID and builds summary info', done => {
            mockReportData.setCollection([
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
});
