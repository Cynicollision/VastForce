import * as express from 'express';
import { OrgRegistration } from './../../shared/contracts/OrgRegistration';
import { Job } from './../../shared/models/Job';
import { ExpressRouteUtil } from './../core/core';
import { AccountSummaryLogic } from './../logic/account-summary';
import { SFLogic } from './../logic/sf';

export function configureAPILogicRoutes(app: express.Application, accountSummaryLogic: AccountSummaryLogic, sfLogic: SFLogic): void {
    
    // Account Summary
    app.get('/api/account-summary', async (req: express.Request, res: express.Response) => {
        let externalUserID = ExpressRouteUtil.getReqExternalID(req);
        let accountID = ExpressRouteUtil.getReqQuery(req, 'id');

        let response = await accountSummaryLogic.getAccountData(externalUserID, accountID);

        res.send(response);
    });

    // Org Registration
    app.post('/api/org/register', async (req: express.Request, res: express.Response) => {
        let externalUserID = ExpressRouteUtil.getReqExternalID(req);
        let registration = ExpressRouteUtil.getReqBody<OrgRegistration>(req);

        let response = await sfLogic.registerOrg(externalUserID, registration);

        res.send(response);
    });

    // Start job
    app.post('/api/job/start', async (req: express.Request, res: express.Response) => {
        let externalUserID = ExpressRouteUtil.getReqExternalID(req);
        let job = ExpressRouteUtil.getReqBody<Job>(req);

        let response = await sfLogic.startJob(externalUserID, job);

        res.send(response);
    });
}