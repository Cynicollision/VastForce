import * as express from 'express';
import { VastForceAppServer } from './app-server';
import { AccountData } from './data/account-data';
import { AccountLogic } from './logic/account-logic';
import { ReportData } from './data/report-data';
import { ReportLogic } from './logic/report-logic';
import { OrgData } from 'data/org-data';
import { OrgDataLogic } from 'logic/orgdata-logic';

const accountData = new AccountData();
const reportData = new ReportData();
const orgData = new OrgData();

new VastForceAppServer(
    new AccountLogic(accountData),
    new OrgDataLogic(accountData, orgData),
    new ReportLogic(accountData, reportData),
).start(express());
