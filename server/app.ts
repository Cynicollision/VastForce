import * as express from 'express';
import { config } from './config';
import { AccountLogic, ExpressAppServer } from './core/core';
import { AccountData } from './core/mongoose/account-data';
import { OrgDataLogic } from './logic/resource-access/orgdata';
import { ReportLogic } from './logic/resource-access/report';
import { AccountSummaryLogic } from './logic/account-summary';
import { SFLogic } from './logic/sf';
import { SFClient } from './logic/sf-client/sf-client';
import { OrgData } from './mongoose-client/org-data';
import { ReportData } from './mongoose-client/report-data';
import { configureAPILogicRoutes } from './routes/api-logic';
import { configureAPIRoutes } from './routes/api-resources';
import { configureAuthRoutes } from './routes/auth';
import { configureDefaultRoute } from './routes/default'
import { configureOAuth2Routes } from './routes/oauth2';

const accountData = new AccountData();
const accountLogic = new AccountLogic(accountData);
const orgData = new OrgData();
const reportData = new ReportData();
const reportLogic = new ReportLogic(accountData, reportData);
const orgDataLogic = new OrgDataLogic(accountData, orgData);
const accountSummaryLogic = new AccountSummaryLogic(accountLogic, orgDataLogic, reportLogic);
const sfClient = new SFClient();
const sfLogic = new SFLogic(sfClient);

new ExpressAppServer(express(), config)
    .configure((app: express.Application) => {
        configureAuthRoutes(app, accountLogic);
        configureOAuth2Routes(app, sfLogic);
        configureAPIRoutes(app, orgDataLogic, reportLogic);
        configureAPILogicRoutes(app, accountSummaryLogic, sfLogic);
        configureDefaultRoute(app);
    })
    .start();
