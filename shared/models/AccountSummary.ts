import { Account } from './Account';
import { OrgDataMeta } from './OrgData';
import { Report } from './Report';

export interface AccountSummary {
    account?: Account;
    dataSources?: OrgDataMeta[];
    reports?: Report[];
}