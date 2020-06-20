import { ResourceBase } from './ResourceBase';

export enum ReportType {
    'ProfileQuerySession',
}

export interface Report extends ResourceBase {
    type?: ReportType;
}