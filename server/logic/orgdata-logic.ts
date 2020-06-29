import { OperationResponse } from '../../shared/contracts/OperationResponse'; 
import { OrgData, OrgDataMeta } from './../../shared/models/OrgData';
import { Report } from '../../shared/models/Report';
import { IResourceLogic, ResourceLogic } from './logic-base';
import { IAccountData } from '../data/account-data';
import { IOrgData } from '../data/org-data';
import { ObjectType } from '../enum/object-type';
import { ResponseUtil } from './../util/response';
import { SFMetadataType } from '../../shared/models/SFMetadataType';

export interface IOrgDataLogic extends IResourceLogic<OrgData> {
}

export class OrgDataLogic extends ResourceLogic<OrgData> implements IOrgDataLogic {
    constructor(accountData: IAccountData, orgData: IOrgData) {
        let config = { name: 'OrgData', objectType: ObjectType.OrgData };
        super(accountData, orgData, config);
    }

    getByOwnerID(accountExternalID: string, ownerAccountID: string): Promise<OperationResponse<OrgData[]>> {

        return super.getByOwnerID(accountExternalID, ownerAccountID).then(response => {
            if (!response.success) {
                return ResponseUtil.failAsync<OrgData[]>('Failed to get Org Summary info.', response);
            }

            // TODO: remove
            response.data = [
                {
                    orgID: '1',
                    name: 'org one',
                    lastSyncDate: 'never',
                    includedMetadataTypes: [ SFMetadataType.ApexClass, SFMetadataType.Profile ],
                },
                {
                    orgID: '2',
                    name: 'org two',
                    lastSyncDate: 'never',
                    includedMetadataTypes: [ SFMetadataType.ApexClass, SFMetadataType.Profile ],
                },
            ]

            let summaryData: OrgDataMeta[] = response.data.map((od: OrgData) => {
                return {
                    orgID: od.orgID,
                    name: od.name,
                    lastSyncDate: od.lastSyncDate,
                    includedMetadataTypes: od.includedMetadataTypes,
                }
            });

            return ResponseUtil.succeedAsync<OrgData[]>(summaryData);
        });
    }
}