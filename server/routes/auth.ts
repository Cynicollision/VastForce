import * as express from 'express';
import { Account } from './../../shared/models/Account';
import { IAccountLogic, ExpressRouteUtil } from './../core/core';

export function configureAuthRoutes(app: express.Application, accountLogic: IAccountLogic): void {

    app.post('/api/login', (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);

        accountLogic.login(externalID).then(response => res.send(response));
    });

    app.post('/api/register', (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let account = ExpressRouteUtil.getReqBody<Account>(req);

        accountLogic.register(externalID, account.name).then(response => res.send(response));
    });
}