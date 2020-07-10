import * as express from 'express';
import { Report } from './../../shared/models/Report';
import { IOrgDataLogic } from './../logic/resource-access/orgdata';
import { IReportLogic } from './../logic/resource-access/report';
import { ExpressRouteUtil } from './../core/util/route';

export function configureAPIRoutes(app: express.Application, orgDataLogic: IOrgDataLogic, reportLogic: IReportLogic): void {

    // Data Sources
    app.get('/api/data-sources', async (req: express.Request, res: express.Response) => {
        let userExternalID = ExpressRouteUtil.getReqExternalID(req);
        let accountID = ExpressRouteUtil.getReqParam(req, 'id');

        let response = await orgDataLogic.getByOwnerID(userExternalID, accountID);

        res.send(response);
    });

    // Jobs
    app.get('/api/job', async (req: express.Request, res: express.Response) => {
        let jobID = ExpressRouteUtil.getReqParam(req, 'id');
        // TODO: implement
    });

    // Reports
    app.get('/api/report', async (req: express.Request, res: express.Response) => {
        let userExternalID = ExpressRouteUtil.getReqExternalID(req);
        let reportID = ExpressRouteUtil.getReqQuery(req, 'id');

        let response = await reportLogic.get(userExternalID, reportID);

        res.send(response);
    });

    app.post('/api/report', async (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let report = ExpressRouteUtil.getReqBody<Report>(req);

        let response = await reportLogic.create(externalID, report);

        res.send(response);
    });

    app.post('/api/report/:id', async (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let report = ExpressRouteUtil.getReqBody<Report>(req);

        let response = await reportLogic.update(externalID, report);

        res.send(response);
    });

    app.delete('/api/report/:id', async (req: express.Request, res: express.Response) => {
        let externalID = ExpressRouteUtil.getReqExternalID(req);
        let reportID = ExpressRouteUtil.getReqParam(req, 'id');

        let response = await reportLogic.delete(externalID, reportID);

        res.send(response);
    });
}