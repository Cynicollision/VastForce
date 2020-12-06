import { ObjectType } from './../../enum/object-type';
import { IAccountData } from './../../interfaces';
import { ResourceLogic } from './../../logic/resource-logic';
import { TestData, MockDataController } from './mock-data';

export class MockResourceLogic extends ResourceLogic<TestData> {

    constructor(mockAcountData: IAccountData, mockData: MockDataController) {
        let config = { name: 'Test', objectType: <ObjectType>'TEST' };
        super(mockAcountData, mockData, config);
    }
}