import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { ResourceBase } from './../../../shared/models/ResourceBase';
import { IResourceController } from './../interfaces';
import { TestUtil } from './test-util';

export interface TestData extends ResourceBase {
}

export class MockDataController implements IResourceController<TestData> {
    protected collection = [];

    setCollection(data: TestData[]): void {
        this.collection = data.map(value => {
            value.ownerAccountID = TestUtil.testAccountID;
            return value;
        });
    }

    get(id: string): Promise<OperationResponse<TestData>> {
        return new Promise((resolve, reject) => {
            let testResource: ResourceBase = { id: id, name: 'Test Resource', ownerAccountID: TestUtil.testAccountID };
            return resolve({ success: true, data: testResource });
        });
    }

    getByOwnerID(ownerAccount: string): Promise<OperationResponse<TestData[]>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: this.collection });
        });
    }

    create(data: TestData): Promise<OperationResponse<TestData>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }

    update(id: string, updatedData: TestData): Promise<OperationResponse<TestData>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: updatedData });
        });
    }

    delete(id: string): Promise<OperationResponse<TestData>> {
        return Promise.resolve({ success: true });
    }
}