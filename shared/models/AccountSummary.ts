import { Account } from './Account';
import { OrgDataMeta } from './OrgDataMeta';
import { Report } from './Report';

export interface AccountSummary {
    account?: Account;
    dataSources?: OrgDataMeta[];
    reports?: Report[];
}