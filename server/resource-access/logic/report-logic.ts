import { Report } from './../../../shared/models/Report';
import { ObjectType } from './../../enum/object-type';
import { IAccountData, IReportData } from './../data-interfaces';
import { IReportLogic } from './../logic-interfaces';
import { ResourceLogic } from './logic-base';

export class ReportLogic extends ResourceLogic<Report> implements IReportLogic {
    constructor(accountData: IAccountData, reportData: IReportData) {
        let config = { name: 'Report', objectType: ObjectType.Report };
        super(accountData, reportData, config);
    }
}