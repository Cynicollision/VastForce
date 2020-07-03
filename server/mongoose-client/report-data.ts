import * as mongoose from 'mongoose';
import { Report } from './../../shared/models/Report';
import { ResourceController } from './../core/mongoose/controller-base';
import { IReportData } from './../logic/resource-access/report'

export class ReportData extends ResourceController<Report> implements IReportData {
    modelName = 'Report';
    
    model: mongoose.Model<mongoose.Document> = mongoose.model(this.modelName, new mongoose.Schema({
        id: { type: 'string', index: true },
        ownerAccountID: { type: 'string', index: true},
        name: { type: 'string' },
    }));

    mapFromDocument(document: mongoose.Document): Report {
        return {
            id: document.get('id'),
            ownerAccountID: document.get('ownerAccountID'),
            name: document.get('name'),
        };
    }
}
