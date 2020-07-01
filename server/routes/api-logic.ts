import * as express from 'express';
import { RouteUtil } from './../util/route';
import { AccountSummaryLogic } from './../app-logic/account-summary';

export function configureAPILogicRoutes(app: express.Application, accountSummaryLogic: AccountSummaryLogic): void {
    
    // Account Summary
    app.get('/api/account-summary', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);
        let accountID = RouteUtil.getReqQuery(req, 'id');

        accountSummaryLogic.getAccountData(externalID, accountID).then(response => res.send(response));
    });
}