import { OrgData } from './OrgData';
import { Report } from './Report';

export interface Account {
    id: string;
    externalID: string;
    name: string;
    reports?: Report[];
    orgData?: OrgData;
}
