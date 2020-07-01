import { OperationResponse } from './../../../shared/contracts/OperationResponse'; 
import { OrgData, OrgDataMeta } from './.././../../shared/models/OrgData';
import { ObjectType } from './../../enum/object-type';
import { ResponseUtil } from './../../util/response';
import { IAccountData, IOrgData } from './../data-interfaces';
import { IOrgDataLogic } from './../logic-interfaces';
import { ResourceLogic } from './logic-base';
import { SFMetadataType } from '../../../shared/models/SFMetadataType';

export class OrgDataLogic extends ResourceLogic<OrgData> implements IOrgDataLogic {
    constructor(accountData: IAccountData, orgData: IOrgData) {
        let config = { name: 'OrgData', objectType: ObjectType.OrgData };
        super(accountData, orgData, config);
    }

    getDataSourcesByOwnerID(accountExternalID: string, accountID: string): Promise<OperationResponse<OrgDataMeta[]>> {
        return super.getByOwnerID(accountExternalID, accountID).then(response => {
            if (!response.success) {
                return ResponseUtil.failAsync<OrgData[]>('Failed to get Org Summary info.', response);
            }

            // TODO: remove
            response.data.push({
                id: '1', sfOrgID: '0x1241531', name: 'dev01', lastSyncDate: '6/29/2020', includedMetadataTypes: [ SFMetadataType.ApexClass, SFMetadataType.Flow, SFMetadataType.Layout, SFMetadataType.Workflow ]
            });
            response.data.push({
                id: '2', sfOrgID: '0x9346034', name: 'production', lastSyncDate: '7/1/2020', includedMetadataTypes: [ SFMetadataType.ApexClass, SFMetadataType.PermissionSet, SFMetadataType.Profile ]
            });

            return ResponseUtil.succeedAsync(response.data.map(orgData => {
                return {
                    id: orgData.id,
                    sfOrgID: orgData.sfOrgID,
                    name: orgData.name,
                    lastSyncDate: orgData.lastSyncDate,
                    included: orgData.includedMetadataTypes,
                }
            }));
        });
    }

}