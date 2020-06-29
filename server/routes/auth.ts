import * as express from 'express';
import { Account } from '../../shared/models/Account';
import { IAccountLogic } from './../logic/account-logic';
import { IOrgDataLogic } from './../logic/orgdata-logic';
import { RouteUtil } from './../util/route';

export function configureAuthRoutes(app: express.Application, accountLogic: IAccountLogic, orgDataLogic: IOrgDataLogic): void {

    app.post('/api/login', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);

        accountLogic.login(externalID).then(response => res.send(response));
    });

    app.post('/api/register', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);
        let account = RouteUtil.getReqBody<Account>(req);

        accountLogic.register(externalID, account.name).then(response => res.send(response));
    });

    app.get('/api/account-summary', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);
        let accountID = RouteUtil.getReqQuery(req, 'id');

        // TODO: this should all happen in 'getAccountData'
        accountLogic.getAccountData(externalID, accountID).then(response => {
            return orgDataLogic.getByOwnerID(externalID, accountID).then(summaryResponse => {
                response.data.dataSources = summaryResponse.data;
                res.send(response);
            });
        });
    });
}