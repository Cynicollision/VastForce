import { OrgRegistration } from './../../shared/contracts/OrgRegistration';
import { EmptyOperationResponse, OperationResponse } from './../../shared/contracts/OperationResponse';
import { Job } from './../../shared/models/Job';
import { ResponseUtil } from './../core/core';
import { SFClient } from './sf-client/sf-client';
import { AuthTokenStore, TokenStore } from './sf-client/token-store';
export class SFLogic {
    private tokenStore: TokenStore = null;

    constructor(private sfClient: SFClient) { 
        this.tokenStore = new AuthTokenStore();
    }

    async authenticateOrg(authCode: string, stateJSON: string): Promise<OperationResponse<OrgRegistration>> {
        if (!authCode.length || !stateJSON.length) {
            return ResponseUtil.failAsync('Authorization code and state context (Client ID, Login URL) are required.');
        }

        let state = JSON.parse(stateJSON);

        if (!state.orgUrl || !state.clientID) {
            return ResponseUtil.failAsync('Client ID and Login URL are required in state context.');
        }

        let tokenResponse = await this.sfClient.getAccessToken(state.orgUrl, authCode, state.clientID);

        if (!tokenResponse.success) {
            return ResponseUtil.failAsync('Failed to retrieve access token.', tokenResponse);
        }

        let accessToken = tokenResponse.data.access_token;
        let orgId = this.parseOrgIdFromToken(accessToken);

        let response = this.tokenStore.setOrgAuthToken(orgId, accessToken);

        return ResponseUtil.succeedAsync(response);
    }

    private parseOrgIdFromToken(accessToken: string): string {
        return accessToken.split('!')[0];
    }

    async registerOrg(externalUserId: string, registration: OrgRegistration): Promise<EmptyOperationResponse> {
        let response = this.tokenStore.registerOrgOwner(registration.orgId, registration.registrationId, externalUserId);

        if (!response.success) {
            return ResponseUtil.failAsync(`Org registration failed: ${response.message}`, response);
        }

        return ResponseUtil.succeedAsync();
    }

    // TODO: just a generic "job" for now. Should be moved to job-logic.
    async startJob(externalUserId: string, job: Job): Promise<OperationResponse<Job>> {
        let tokenResponse = this.tokenStore.getOrgToken(job.orgId, externalUserId);

        // TODO: pass authTken and options to SF client to load metadata (or whatever)
        return ResponseUtil.succeedAsync(job);
    }
}