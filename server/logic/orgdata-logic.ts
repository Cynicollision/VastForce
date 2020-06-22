import { Report } from '../../shared/models/Report';
import { IResourceLogic, ResourceLogic } from './logic-base';
import { IAccountData } from '../data/account-data';
import { IOrgData } from '../data/org-data';
import { ObjectType } from '../enum/object-type';

export interface IOrgDataLogic extends IResourceLogic<Report> {
}

export class OrgDataLogic extends ResourceLogic<Report> implements IOrgDataLogic {
    constructor(accountData: IAccountData, orgData: IOrgData) {
        let config = { name: 'OrgData', objectType: ObjectType.OrgData };
        super(accountData, orgData, config);
    }
}