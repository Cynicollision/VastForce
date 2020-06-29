import { OrgDataMeta } from './OrgData';
import { Report } from './Report';

export interface Account {
    id: string;
    externalID: string;
    name: string;
    dataSources?: OrgDataMeta[];
    reports?: Report[];
}
