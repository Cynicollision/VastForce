import { AuthTokenStore, TokenStore } from './../../../logic/sf-client/token-store';
import { TestUtil } from './../test-util';

describe('In memory Auth Token Store', () => {
    let tokenStore: TokenStore = null;
    let testExternalID = TestUtil.testExternalID;
    let testAuthToken = 'TESTAUTHTOKEN';
    let testOrgId = '00TESTORG';

    beforeEach(() => {
        tokenStore = new AuthTokenStore();
    });

    it('sets an Auth Token by Org Id and returns a Registration ID', () => {
        let registration = tokenStore.setOrgAuthToken(testOrgId, testAuthToken);

        expect(registration.orgId).toEqual(testOrgId);
        expect(registration.registrationId.length).toBeGreaterThan(10);
    });

    it('sets an Org Owner when provided a valid Registration ID', () => {
        let registration = tokenStore.setOrgAuthToken(testOrgId, testAuthToken);

        let response = tokenStore.registerOrgOwner(testOrgId, registration.registrationId, testExternalID);

        expect(response.success).toBe(true);
    });

    it('retrieves an Auth Token when provided a valid Org ID and authenticated Org Owner', () => {
        let registration = tokenStore.setOrgAuthToken(testOrgId, testAuthToken);

        let registrationResponse = tokenStore.registerOrgOwner(testOrgId, registration.registrationId, testExternalID);
        expect(registrationResponse.success).toBe(true);

        let getTokenResponse = tokenStore.getOrgToken(testOrgId, testExternalID);
        expect(getTokenResponse.success).toBe(true);
    });

    describe('rejects', () => {

        it('org registration when not pending registration', () => {
            let response = tokenStore.registerOrgOwner(testOrgId, null, testExternalID);
            expect(response.success).toBe(false);
        });

        it('org registration when the registration ID is invalid', () => {
            let registration = tokenStore.setOrgAuthToken(testOrgId, testAuthToken);
            let response = tokenStore.registerOrgOwner(testOrgId, registration.registrationId + 'hacked', testExternalID);
            expect(response.success).toBe(false);
        });
    
        it('org registration when org is already registered', () => {
            let registration = tokenStore.setOrgAuthToken(testOrgId, testAuthToken);
            let responseOne = tokenStore.registerOrgOwner(testOrgId, registration.registrationId, testExternalID);
            let responseTwo = tokenStore.registerOrgOwner(testOrgId, registration.registrationId, testExternalID);
            expect(responseOne.success).toBe(true);
            expect(responseTwo.success).toBe(false);
        });

        it('token retrieval when not owned by the authenticated user', () => {
            let registration = tokenStore.setOrgAuthToken(testOrgId, testAuthToken);

            let registrationResponse = tokenStore.registerOrgOwner(testOrgId, registration.registrationId, testExternalID);
            expect(registrationResponse.success).toBe(true);

            let getTokenResponse = tokenStore.getOrgToken(testOrgId, 'someOtherUserExternalId');
            expect(getTokenResponse.success).toBe(false);
        });
    });
});