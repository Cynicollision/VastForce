import axiosPkg = require('axios');
import sfdx = require('sfdx-node');
import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { ResponseUtil } from './../../core/core';
import { config } from './../../config';

const axios = axiosPkg.default;

export class SFClient {

    async getAccessToken(orgUrl: string, authCode: string, clientId: string): Promise<OperationResponse<any>> {
        let reqBody = this.buildTokenReqBody(authCode, clientId);

        try {
            let tokenResult = await axios({
                method: 'post',
                url: `${orgUrl}/services/oauth2/token`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': reqBody.length,
                },
                data: reqBody,
            });

            if (tokenResult.status === 200) {
                return ResponseUtil.succeedAsync(tokenResult.data);
            }

            return ResponseUtil.failAsync(tokenResult.statusText);
        }
        catch (e) {
            if (!!e.response) {
                return ResponseUtil.failAsync(e.response.data.error_description);
            }
        }
    }

    private buildTokenReqBody(authCode: string, clientId: string): string {
        return `grant_type=authorization_code&code=${authCode}&client_id=${clientId}&redirect_uri=${config.auth0CallbackUrl}`;
    }
}