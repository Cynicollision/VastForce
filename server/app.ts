import * as express from 'express';
import { config } from './config';
import { ExpressAppServer } from './app-server';
import { AccountSummaryLogic } from './app-logic/account-summary';
import { AccountLogic } from './resource-access/logic/account-logic';
import { OrgDataLogic } from './resource-access/logic/orgdata-logic';
import { ReportLogic } from './resource-access/logic/report-logic';
import { AccountData } from './resource-access/mongo-client/account-data';
import { OrgData } from './resource-access/mongo-client/org-data';
import { ReportData } from './resource-access/mongo-client/report-data';
import { configureAPILogicRoutes } from './routes/api-logic';
import { configureAPIRoutes } from './routes/api-resources';
import { configureAuthRoutes } from './routes/auth';
import { configureDefaultRoute } from './routes/default'

const accountData = new AccountData();
const orgData = new OrgData();
const reportData = new ReportData();
const accountLogic = new AccountLogic(accountData);
const reportLogic = new ReportLogic(accountData, reportData);
const orgDataLogic = new OrgDataLogic(accountData, orgData);
const accountSummaryLogic = new AccountSummaryLogic(accountLogic, orgDataLogic, reportLogic);

new ExpressAppServer(express(), config)
    .configure((app: express.Application) => {
        configureAuthRoutes(app, accountLogic);
        configureAPIRoutes(app, orgDataLogic, reportLogic);
        configureAPILogicRoutes(app, accountSummaryLogic);
        configureDefaultRoute(app);
    })
    .start();
