import * as mongoose from 'mongoose';
import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { IResourceController } from './../interfaces';
import { ResponseUtil } from './../util/response';

export abstract class ResourceController<T> implements IResourceController<T> {
    abstract model: mongoose.Model<mongoose.Document>;
    abstract modelName: string;

    abstract mapFromDocument(document: mongoose.Document);

    get(id: string): Promise<OperationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err: any, doc: mongoose.Document) => {
                if (err || !doc) {
                    resolve(ResponseUtil.fail(err || `Invalid ${this.modelName} ID`));
                }
                resolve(ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    getByOwnerID(ownerAccountID: string): Promise<OperationResponse<T[]>> {
        return new Promise((resolve, reject) => {
            this.model.find({ ownerAccountID: ownerAccountID }, (err: any, docs: mongoose.Document[]) => {
                resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocuments(docs)));
            });
        });
    }

    create(data: T): Promise<OperationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.mapToDocument(data).save((err: any) => {
                resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(data));
            });
        });
    }

    update(id: string, data: T): Promise<OperationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({ id: id }, data, { new: true }, (err: any, doc: mongoose.Document) => {
                resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    delete(id: string): Promise<OperationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndDelete({ id: id }, (err: any, res: mongoose.Document) => {
                resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed());
            });
        });
    }

    protected mapFromDocuments(documents: mongoose.Document[]): T[] {
        return documents.map(doc => this.mapFromDocument(doc));
    }

    protected mapToDocument(data: T): mongoose.Document {
        return new this.model(data);
    }
}