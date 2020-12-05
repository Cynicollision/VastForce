import * as express from 'express';
import { ExpressRouteUtil } from './../core/core';
import { config } from './../config';
import { SFLogic } from './../logic/sf';

export function configureOAuth2Routes(app: express.Application, sfLogic: SFLogic): void {
    app.get('/oauth2/callback', async (req: express.Request, res: express.Response) => {
        let code = ExpressRouteUtil.getReqQuery(req, 'code');
        let stateJSON = ExpressRouteUtil.getReqQuery(req, 'state');

        let response = await sfLogic.getAccessToken(code, stateJSON);
        
        res.redirect(`${config.clientUrl}/app/data-source/callback?orgId=${response.data.orgId}&success=${response.success}`);
    });
}