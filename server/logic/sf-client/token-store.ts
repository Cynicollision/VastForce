import { EmptyOperationResponse, OperationResponse } from '../../../shared/contracts/OperationResponse';
import { OrgRegistration } from './../../../shared/contracts/OrgRegistration';
import { ObjectType } from './../../core/enum/object-type';
import { ObjectID } from './../../core/util/object-id';
import { ResponseUtil } from './../../core/util/response';

export interface TokenStore {
    setOrgAuthToken(orgId: string, authToken: string): OrgRegistration;
    registerOrgOwner(orgId: string, registrationId: string, accountExternalId: string): EmptyOperationResponse
    getOrgToken(orgId: string, ownerAccountExternalId: string): OperationResponse<string>
}

export class AuthTokenStore implements TokenStore {
    private orgOwnerMap = new Map<string, string>();
    private orgRegistrationMap = new Map<string, string>();
    private orgTokenMap = new Map<string, string>();

    setOrgAuthToken(orgId: string, authToken: string): OrgRegistration {
        let registrationId = ObjectID.new(ObjectType.OrgRegistration);
        this.orgRegistrationMap.set(orgId, registrationId);
        this.orgTokenMap.set(orgId, authToken);

        return {
            orgId: orgId,
            registrationId: registrationId,
        };
    }

    registerOrgOwner(orgId: string, providedRegistrationId: string, accountExternalId: string): EmptyOperationResponse {
        if (!this.orgRegistrationMap.has(orgId)) {
            return ResponseUtil.fail('Org is not pending registration.');
        }

        if (this.orgOwnerMap.has(orgId)) {
            return ResponseUtil.fail('Org has already been registered to an owner.');
        }

        if (providedRegistrationId !== this.orgRegistrationMap.get(orgId)) {
            return ResponseUtil.fail('Registration ID is invalid.');
        }

        this.orgOwnerMap.set(orgId, accountExternalId);
        this.orgRegistrationMap.set(orgId, null);

        return ResponseUtil.succeed();
    }

    getOrgToken(orgId: string, ownerAccountExternalId: string): OperationResponse<string> {
        let orgOwnerId = this.orgOwnerMap.get(orgId);

        if (!orgOwnerId || orgOwnerId !== ownerAccountExternalId) {
            return ResponseUtil.fail('Org is not owned by this account.');
        }

        let authToken = this.orgTokenMap.get(orgId);
        
        return ResponseUtil.succeed(authToken);
    }
}