import * as express from 'express';
import { Report } from './../../shared/models/Report';
import { IOrgDataLogic } from './../logic/orgdata-logic';
import { IReportLogic } from './../logic/report-logic';
import { RouteUtil } from './../util/route';


export function configureAPIRoutes(app: express.Application, orgDataLogic: IOrgDataLogic, reportLogic: IReportLogic): void {

    // Data Sources
    app.get('/api/data-sources', (req: express.Request, res: express.Response) => {
        let userExternalID = RouteUtil.getReqExternalID(req);
        let accountID = RouteUtil.getReqParam(req, 'id');

        orgDataLogic.getByOwnerID(userExternalID, accountID).then(response => res.send(response));
    });

    // Reports
    app.get('/api/report', (req: express.Request, res: express.Response) => {
        let userExternalID = RouteUtil.getReqExternalID(req);
        // let reportID = <string>req.query.id;
        let reportID = RouteUtil.getReqQuery(req, 'id');

        reportLogic.get(userExternalID, reportID).then(response => res.send(response));
    });

    app.post('/api/report', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);
        let report = RouteUtil.getReqBody<Report>(req);

        reportLogic.create(externalID, report).then(response => res.send(response));
    });

    app.post('/api/report/:id', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);
        let report = RouteUtil.getReqBody<Report>(req);

        reportLogic.update(externalID, report).then(response => res.send(response));
    });

    app.delete('/api/report/:id', (req: express.Request, res: express.Response) => {
        let externalID = RouteUtil.getReqExternalID(req);
        let reportID = RouteUtil.getReqParam(req, 'id');

        reportLogic.delete(externalID, reportID).then(response => res.send(response));
    });
}