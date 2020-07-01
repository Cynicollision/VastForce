import * as express from 'express';
import { Account } from '../../shared/models/Account';
import { RouteUtil } from './../util/route';
import { IAccountLogic } from './../resource-access/logic-interfaces';

export function configureAuthRoutes(app: express.Application, accountLogic: IAccountLogic): void {

    app.post('/api/login', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);

        accountLogic.login(externalID).then(response => res.send(response));
    });

    app.post('/api/register', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);
        let account = RouteUtil.getReqBody<Account>(req);

        accountLogic.register(externalID, account.name).then(response => res.send(response));
    });
}