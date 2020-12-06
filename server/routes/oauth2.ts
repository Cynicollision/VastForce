import * as express from 'express';
import { ExpressRouteUtil } from './../core/core';
import { config } from './../config';
import { SFLogic } from './../logic/sf';

export function configureOAuth2Routes(app: express.Application, sfLogic: SFLogic): void {
    app.get('/oauth2/callback', async (req: express.Request, res: express.Response) => {
        let code = ExpressRouteUtil.getReqQuery(req, 'code');
        let stateJSON = ExpressRouteUtil.getReqQuery(req, 'state');

        let response = await sfLogic.authenticateOrg(code, stateJSON);

        let orgId = response.data.orgId || '';
        let registrationId = response.data.registrationId || '';
        
        res.redirect(`${config.clientUrl}/app/data-source/callback?success=${response.success}&orgId=${orgId}&registrationId=${registrationId}`);
    });
}