import * as mongoose from 'mongoose';
import { Job } from './../../shared/models/Job';
import { ResourceController } from './../core/mongoose/controller-base';
import { IOrgData } from './../logic/resource-access/orgdata';

export class OrgData extends ResourceController<Job> implements IOrgData {
    modelName = 'OrgData';
    
    model: mongoose.Model<mongoose.Document> = mongoose.model(this.modelName, new mongoose.Schema({
        id: { type: 'string', index: true },
        ownerAccountID: { type: 'string', index: true},
        name: { type: 'string' },
    }));

    mapFromDocument(document: mongoose.Document): Job {
        return {
            id: document.get('id'),
            ownerAccountID: document.get('ownerAccountID'),
            name: document.get('name'),
            status: document.get('status'),
        };
    }
}
