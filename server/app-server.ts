import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwksRsa from 'jwks-rsa';
import * as jwt from'express-jwt';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { Config } from './config';
import { IAccountLogic } from './logic/account-logic';
import { IReportLogic } from './logic/report-logic';
import { IOrgDataLogic } from './logic/orgdata-logic';
import { Account } from './../shared/models/AccountData';
import { Report } from './../shared/models/Report';

export class VastForceAppServer {
    constructor(private accountLogic: IAccountLogic, private orgDataLogic: IOrgDataLogic, private reportLogic: IReportLogic) {
    }

    start(app: express.Application) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        
        this.connectDatabase().then(connected => {
            if (connected) {
                app.listen(Config.port, () => {
                    console.log(`VastForce server listening on port ${Config.port} (${Config.dev ? 'DEVELOPMENT' : 'PRODUCTION'} mode).`);
                });
            }
        });
    }

    private configureMiddleware(app: express.Application): void {

        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // development-only middleware
        if (Config.dev) {
            app.use(logger('dev'));

            // CORS for Angular development server 
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
                next();
            });
        }

        // configure static path
        app.use(express.static(__dirname + '/../public'));

        // configure jwt handling for authorized API routes
        app.use(jwt({
            secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: Config.authJwksUri,
            }),
            audience: Config.authClientID,
            issuer: Config.authUri,
            algorithms: [ 'RS256' ]
        }).unless({
            path: /^(?!\/api.*$).*/
        }));

        // custom error-handling middleware for unauthorized API requests
        app.use((err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                return res.status(403).send({
                    success: false,
                    message: 'Not authorized to call API.',
                });
            }
        });
    }

    private connectDatabase(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            mongoose.connect(Config.mongo, { useNewUrlParser: true });
            mongoose.connection.on('error', () => { 
                console.log('Fatal: VastForce DB connection failed.');
                resolve(false);
            });
            mongoose.connection.once('open', () => {
                console.log('Connected to VastForce DB.');
                resolve(true);
            });
        });
    }

    private configureRoutes(app: express.Application): void {
        // account routes
        app.post('/api/login', (req: express.Request, res: express.Response) => {
            let externalID = (<any>req).user.sub || '';
            this.accountLogic.login(externalID).then(response => res.send(response));
        });

        app.post('/api/register', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let account = this.getReqBody<Account>(req);
            this.accountLogic.register(externalID, account.name).then(response => res.send(response));
        });

        app.get('/api/account-data', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let accountID = <string>req.query.id;
            this.accountLogic.getAccountData(externalID, accountID).then(response => res.send(response));
        });

        // app routes
        // TODO: should be post and pass externalID 
        app.get('/api/report', (req: express.Request, res: express.Response) => {
            let reportID = <string>req.query.id;
            this.reportLogic.get(reportID).then(response => res.send(response));
        });

        app.post('/api/report', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let report = this.getReqBody<Report>(req);
            this.reportLogic.create(externalID, report).then(response => res.send(response));
        });

        app.post('/api/report/:id', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let report = this.getReqBody<Report>(req);
            this.reportLogic.update(externalID, report).then(response => res.send(response));
        });

        app.delete('/api/report/:id', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let reportID = this.getReqParam(req, 'id');
            this.reportLogic.delete(externalID, reportID).then(response => res.send(response));
        });

        app.get('/api/orgdata', (req: express.Request, res: express.Response) => {
            let orgDataID = <string>req.query.id;
            this.orgDataLogic.get(orgDataID).then(response => res.send(response));
        });

        // Default route
        app.get('*', (req: express.Request, res: express.Response) => {
            return res.sendFile(path.resolve(__dirname + './../public/index.html'));
        });
    }

    private getReqExternalID(req: express.Request): string {
        return ((<any>req).user || {}).sub;
    }

    private getReqParam(req: express.Request, name: string): string {
        return (req.params || {})[name];
    }

    private getReqBody<T>(req: express.Request): T {
        return <T>(req.body || {});
    }
}
