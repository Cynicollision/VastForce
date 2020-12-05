import { ResourceBase } from './ResourceBase';

export interface Job extends ResourceBase {
    orgId?: string;
    options?: string[];
    startedAt?: string;
    status?: string;
    details?: string;
}