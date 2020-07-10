import * as express from 'express';
import { Account } from './../../shared/models/Account';
import { IAccountLogic, ExpressRouteUtil } from './../core/core';

export function configureAuthRoutes(app: express.Application, accountLogic: IAccountLogic): void {

    app.post('/api/login', async (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);

        let response = await accountLogic.login(externalID);

        res.send(response);
    });

    app.post('/api/register', async (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let account = ExpressRouteUtil.getReqBody<Account>(req);

        let response = await accountLogic.register(externalID, account.name);

        res.send(response);
    });
}