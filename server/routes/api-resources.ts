import * as express from 'express';
import { Report } from './../../shared/models/Report';
import { IOrgDataLogic } from './../logic/resource-access/orgdata';
import { IReportLogic } from './../logic/resource-access/report';
import { ExpressRouteUtil } from './../core/util/route';

export function configureAPIRoutes(app: express.Application, orgDataLogic: IOrgDataLogic, reportLogic: IReportLogic): void {

    // Data Sources
    app.get('/api/data-sources', (req: express.Request, res: express.Response) => {
        let userExternalID = ExpressRouteUtil.getReqExternalID(req);
        let accountID = ExpressRouteUtil.getReqParam(req, 'id');

        orgDataLogic.getByOwnerID(userExternalID, accountID).then(response => res.send(response));
    });

    // Reports
    app.get('/api/report', (req: express.Request, res: express.Response) => {
        let userExternalID = ExpressRouteUtil.getReqExternalID(req);
        let reportID = ExpressRouteUtil.getReqQuery(req, 'id');

        reportLogic.get(userExternalID, reportID).then(response => res.send(response));
    });

    app.post('/api/report', (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let report = ExpressRouteUtil.getReqBody<Report>(req);

        reportLogic.create(externalID, report).then(response => res.send(response));
    });

    app.post('/api/report/:id', (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let report = ExpressRouteUtil.getReqBody<Report>(req);

        reportLogic.update(externalID, report).then(response => res.send(response));
    });

    app.delete('/api/report/:id', (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let reportID = ExpressRouteUtil.getReqParam(req, 'id');

        reportLogic.delete(externalID, reportID).then(response => res.send(response));
    });
}