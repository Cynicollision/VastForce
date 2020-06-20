import { ResourceBase } from './ResourceBase';

export interface SFMetadata {
    id?:string;
    name?: string;
}

export interface Profile extends SFMetadata {

}

export interface OrgData extends ResourceBase {
    orgID?: string;
    profiles?: Profile[];
}