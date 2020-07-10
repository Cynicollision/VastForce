import { ResourceBase } from './ResourceBase';

export interface Job extends ResourceBase {
    details?: string;
    sfCode?: string;
    startedAt?: string;
    status?: string;
}