import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Job } from './../../shared/models/Job';
import { SFClient } from './sf-client/sf-client';
import { ResponseUtil } from './../core/core';

class AuthTokenStore {
    private orgTokenMap = new Map<string, string>();

    setOrgToken(orgId: string, authToken: string): void {
        this.orgTokenMap.set(orgId, authToken);
    }

    getOrgToken(orgId: string, externalUserId: string): string {
        let orgOwnerId = this.orgOwnerMap.get(orgId);

        if (!!orgOwnerId && orgOwnerId === externalUserId) {
            return this.orgTokenMap.get(orgId);
        }

        return null;
    }

    private orgOwnerMap = new Map<string, string>();

    setOrgOwner(orgId: string, externalUserId: string) {
        if (!this.orgOwnerMap.has(orgId)) {
            this.orgOwnerMap.set(orgId, externalUserId);
        }
    }
}

export class SFLogic {
    private tokenStore = null;

    constructor(private sfClient: SFClient) { 
        this.tokenStore = new AuthTokenStore();
    }

    async getAccessToken(authCode: string, stateJSON: string): Promise<OperationResponse<any>> {
        
        if (!authCode.length || !stateJSON.length) {
            return ResponseUtil.fail('Authorization code and state context (Client ID, Login URL) are required.');
        }

        let state = JSON.parse(stateJSON);

        if (!state.orgUrl || !state.clientID) {
            return ResponseUtil.fail('Client ID and Login URL are required in state context.');
        }

        let response = await this.sfClient.getAccessToken(state.orgUrl, authCode, state.clientID);

        if (response.success) {
            let accessToken = (<any>response.data).access_token;
            let orgId = accessToken.split('!')[0];

            this.tokenStore.setOrgToken(orgId, accessToken);

            return ResponseUtil.succeedAsync({ orgId: orgId });
        }

        return ResponseUtil.failAsync('Failed to retrieve access token.', response);
    }

    async registerOrg(externalUserId: string, job: Job): Promise<OperationResponse<Job>> {
        this.tokenStore.setOrgOwner(job.orgId, externalUserId);

        return ResponseUtil.succeedAsync();
    }

    async startJob(externalUserId: string, job: Job): Promise<OperationResponse<Job>> {
        let authToken = this.tokenStore.getOrgToken(job.orgId, externalUserId);

        // TODO: pass authTken and options to SF client to load metadata

        return ResponseUtil.succeedAsync(job);
    }
}