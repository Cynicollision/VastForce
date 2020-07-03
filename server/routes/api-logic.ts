import * as express from 'express';
import { ExpressRouteUtil } from './../core/core';
import { AccountSummaryLogic } from './../logic/account-summary';

export function configureAPILogicRoutes(app: express.Application, accountSummaryLogic: AccountSummaryLogic): void {
    
    // Account Summary
    app.get('/api/account-summary', (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let accountID = ExpressRouteUtil.getReqQuery(req, 'id');

        accountSummaryLogic.getAccountData(externalID, accountID).then(response => res.send(response));
    });
}