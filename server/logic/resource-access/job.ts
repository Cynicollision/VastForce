import { Job } from './../../../shared/models/Job';
import { IAccountData, IResourceController, IResourceLogic, ResourceLogic, ObjectType } from './../../core/core';

export interface IJobData extends IResourceController<Job> {
}

export interface IJobLogic extends IResourceLogic<Job> {
}

export class JobLogic extends ResourceLogic<Job> implements IJobLogic {
    constructor(accountData: IAccountData, jobData: IJobData) {
        let config = { name: 'Job', objectType: ObjectType.Job };
        super(accountData, jobData, config);
    }
}