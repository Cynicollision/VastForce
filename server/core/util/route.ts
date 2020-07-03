import * as express from 'express';

export class ExpressRouteUtil {

    static getReqBody<T>(req: express.Request): T {
        return <T>(req.body || {});
    }

    static getReqExternalID(req: express.Request): string {
        return ((<any>req).user || {}).sub;
    }
    
    static getReqParam(req: express.Request, name: string): string {
        return (req.params || {})[name];
    }
    
    static getReqQuery(req: express.Request, name: string): string {
        return <string>(req.query || {})[name];
    }
}
