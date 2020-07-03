import { Report } from './../../../shared/models/Report';
import { IAccountData, IResourceController, IResourceLogic, ResourceLogic, ObjectType } from './../../core/core';

export interface IReportData extends IResourceController<Report> {
}

export interface IReportLogic extends IResourceLogic<Report> {
}

export class ReportLogic extends ResourceLogic<Report> implements IReportLogic {
    constructor(accountData: IAccountData, reportData: IReportData) {
        let config = { name: 'Report', objectType: ObjectType.Report };
        super(accountData, reportData, config);
    }
}