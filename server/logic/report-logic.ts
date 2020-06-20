import { Report } from '../../shared/models/Report';
import { IResourceLogic, ResourceLogic } from './logic-base';
import { IAccountData } from '../data/account-data';
import { IReportData } from '../data/report-data';
import { ObjectType } from '../enum/object-type';

export interface IReportLogic extends IResourceLogic<Report> {
}

export class ReportLogic extends ResourceLogic<Report> implements IReportLogic {
    constructor(accountData: IAccountData, reportData: IReportData) {
        let config = { name: 'Report', objectType: ObjectType.Report };
        super(accountData, reportData, config);
    }
}