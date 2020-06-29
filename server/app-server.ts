import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwksRsa from 'jwks-rsa';
import * as jwt from'express-jwt';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { Config } from './config';
import { OperationResponse } from './../shared/contracts/OperationResponse';
import { ResponseUtil } from './util/response';

interface AppConfigCallback {
    (app: express.Application): void;
}

export class ExpressAppServer {
    constructor(private app: express.Application) {
    }

    private onConfigureCallback: AppConfigCallback;

    configure(callback: AppConfigCallback): ExpressAppServer {
        this.onConfigureCallback = callback;
        return this;
    }

    start(): void {
        this.configureMiddleware(this.app);
        this.onConfigureCallback(this.app);
        this.configureDefaultRoute(this.app);
        
        this.connectDatabase().then(connectionResponse => {
            if (!connectionResponse.success) {
                ResponseUtil.logResponse(connectionResponse);
            }

            this.app.listen(Config.port, () => {
                console.log(`${Config.appName} server listening on port ${Config.port} (${Config.isDev ? 'DEVELOPMENT' : 'PRODUCTION'} mode).`);
            });
        });
    }

    private configureMiddleware(app: express.Application): void {

        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // development-only middleware
        if (Config.isDev) {
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

    private connectDatabase(): Promise<OperationResponse<boolean>> {
        return new Promise<OperationResponse<boolean>>((resolve, reject) => {
            mongoose.connect(Config.mongoUri, { useNewUrlParser: true });
            mongoose.connection.on('error', () => { 
                resolve(ResponseUtil.fail(`Fatal: ${Config.appName} database connection failed.`));
            });
            mongoose.connection.once('open', () => {
                resolve(ResponseUtil.succeed());
            });
        });
    }

    private configureDefaultRoute(app: express.Application): void {
        app.get('*', (req: express.Request, res: express.Response) => {
            return res.sendFile(path.resolve(__dirname + './../public/index.html'));
        });
    }
}
