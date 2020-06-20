import { IAccountData } from '../data/account-data';
import { ObjectType } from '../enum/object-type';
import { ResourceLogic } from './../logic/logic-base';
import { TestData, MockDataController } from './mock-data';

export class MockResourceLogic extends ResourceLogic<TestData> {

    constructor(mockAcountData: IAccountData, mockData: MockDataController) {
        let config = { name: 'Test', objectType: <ObjectType>'TEST' };
        super(mockAcountData, mockData, config);
    }
}