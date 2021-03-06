import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwksRsa from 'jwks-rsa';
import * as jwt from'express-jwt';
import { AppConfig, EnvType, ResponseUtil } from './core';
import { connectMongoDB } from './mongoose/connect';

interface AppConfigCallback {
    (app: express.Application): void;
}

export class ExpressAppServer {
    constructor(private app: express.Application, private config?: AppConfig) {
        this.initDefaultConfig();
    }

    private onConfigureCallback: AppConfigCallback;
    
    configure(callback: AppConfigCallback): ExpressAppServer {
        this.onConfigureCallback = callback;
        return this;
    }

    private initDefaultConfig() {
        this.config.envType = this.config.envType || EnvType.Development;
        this.config.port = this.config.port || '3000';
    }

    async start(): Promise<void> {
        this.configureMiddleware(this.app);

        // TODO: database connection might not be required or might be a different provider
        let connectionResponse = await connectMongoDB(this.config.dbConfig.mongoUri);
        
        if (!connectionResponse.success) {
            ResponseUtil.logResponse(connectionResponse);
        }
        this.app.listen(this.config.port, () => {
            console.log(`Application server listening on port ${this.config.port} (${this.config.envType} mode).`);
        });
    }

    private configureMiddleware(app: express.Application): void {
        app.disable('x-powered-by');
        
        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // configure static path
        app.use(express.static(__dirname + '/../public'));

        // development-only middleware - CORS for Angular development server 
        if (this.config.envType === EnvType.Development) {
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
                next();
            });
        }

        // configure jwt handling for authorized API routes
        if (!!this.config.authConfig) {
            app.use(jwt({
                secret: jwksRsa.expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: this.config.authConfig.authJwksUri,
                }),
                audience: this.config.authConfig.authClientID,
                issuer: this.config.authConfig.authUri,
                algorithms: [ 'RS256' ]
            }).unless({
                path: /^(?!\/api.*$).*/
            }));

            // custom error-handling middleware for unauthorized API requests
            app.use((err, req, res, next) => {
                if (err.name === 'UnauthorizedError') {
                    return res.status(403).send(ResponseUtil.fail('Unauthorized to call API.'));
                }
            });
        }

        this.onConfigureCallback(this.app);
    }
}
