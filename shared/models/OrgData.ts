import { ResourceBase } from './ResourceBase';
import { SFMetadataType } from './SFMetadataType';

export interface SFMetadata {
    id?:string;
    name?: string;
}

export interface Profile extends SFMetadata {

}

export interface OrgDataMeta {
    id?: string;
    sfOrgID?: string;
    name?: string;
    lastSyncDate?: string;
    includedMetadataTypes?: SFMetadataType[]; 
}

export interface OrgData extends OrgDataMeta, ResourceBase {
    profiles?: Profile[];
}