import { IResourceLogic } from './../interfaces';
import { MockAccountData } from './mock/mock-account-data';
import { MockResourceLogic } from './mock/mock-logic';
import { MockDataController, TestData } from './mock/mock-data';
import { TestUtil } from './test-util';

describe('resource logic', () => {
    let mockAccountData: MockAccountData;
    let testExternalID: string;
    let testAccountID: string;

    let mockResourceData: MockDataController;
    let resourceLogic: IResourceLogic<TestData>;

    beforeEach(() => {
        mockAccountData = new MockAccountData();
        testExternalID = TestUtil.testExternalID;
        testAccountID = TestUtil.testAccountID;

        mockResourceData = new MockDataController();
        resourceLogic = new MockResourceLogic(mockAccountData, mockResourceData);
    });
    
    it('can be instantiated', () => {
        expect(resourceLogic).toBeTruthy();
    });

    it('retrieves a resource by ID', done => {
        resourceLogic.get(testExternalID, '123').then(response => {
            expect(response.success).toBe(true);
            expect(response.data).toBeDefined();
            
            TestUtil.logResponse(response);
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
        resourceLogic.get(testExternalID, '').then(response => {
            expect(response.success).toBe(false);
            done();
        });
    });
});
