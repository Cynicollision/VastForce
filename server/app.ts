import * as express from 'express';
import { ExpressAppServer } from './app-server';
import { AccountData } from './data/account-data';
import { AccountLogic } from './logic/account-logic';
import { ReportData } from './data/report-data';
import { ReportLogic } from './logic/report-logic';
import { OrgData } from './data/org-data';
import { OrgDataLogic } from './logic/orgdata-logic';
import { configureAPIRoutes } from './routes/api-resources';
import { configureAuthRoutes } from './routes/auth';

const accountData = new AccountData();
const reportData = new ReportData();
const orgData = new OrgData();

const accountLogic = new AccountLogic(accountData);
const orgDataLogic = new OrgDataLogic(accountData, orgData);
const reportLogic = new ReportLogic(accountData, reportData);

new ExpressAppServer(express())
    .configure((app: express.Application) => {
        configureAuthRoutes(app, accountLogic);
        configureAPIRoutes(app, orgDataLogic, reportLogic);
    })
    .start();
