import { ResourceBase } from './ResourceBase';
import { SFMetadataType } from './SFMetadataType';

export interface SFMetadata {
    id?:string;
    name?: string;
}

export interface Profile extends SFMetadata {

}

export interface OrgData extends ResourceBase {
    name?: string;
    lastRefreshed?: string;
    includedMetadataTypes?: SFMetadataType[]; 
    orgID?: string;
    profiles?: Profile[];
}