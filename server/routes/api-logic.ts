import * as express from 'express';
import { Job } from './../../shared/models/Job';
import { ExpressRouteUtil, ResponseUtil } from './../core/core';
import { AccountSummaryLogic } from './../logic/account-summary';

export function configureAPILogicRoutes(app: express.Application, accountSummaryLogic: AccountSummaryLogic): void {
    
    // Account Summary
    app.get('/api/account-summary', async (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let accountID = ExpressRouteUtil.getReqQuery(req, 'id');

        let response = await accountSummaryLogic.getAccountData(externalID, accountID);

        res.send(response);
    });

    app.post('/api/job/start', (req: express.Request, res: express.Response) => {

        // TODO: start SFDX retrieve job, return ID and status
        let job: Job = {
            id: '-1',
            startedAt: Date.now.toString(),
            status: 'running',
        };

        res.send(ResponseUtil.succeed(job));
    });
}