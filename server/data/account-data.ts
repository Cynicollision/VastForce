import * as mongoose from 'mongoose';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Account } from './../../shared/models/AccountData';
import { ResponseUtil } from '../util/response';

export interface IAccountData {
    get(id: string): Promise<OperationResponse<Account>>;
    getByOwnerID(externalID: string): Promise<OperationResponse<Account>>;
    create(data: Account): Promise<OperationResponse<Account>>;
    update(id: string, data: Account): Promise<OperationResponse<Account>>;
}

export class AccountData implements IAccountData {
    
    private model: mongoose.Model<mongoose.Document> = mongoose.model('Account', new mongoose.Schema({
        id: { type: 'string', index: true },
        externalID: { type: 'string', index: true },
        name: { type: 'string' },
    }));

    get(id: string): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err: any, doc: mongoose.Document) => {
                if (err || !doc) {
                    return resolve(ResponseUtil.fail(err || 'Invalid Account ID'));
                }
                return resolve(ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    getByOwnerID(externalID: string): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ externalID: externalID }, (err: any, doc: mongoose.Document) => {
                if (err || !doc) {
                    return resolve(ResponseUtil.fail(err || 'Invalid External ID'));
                }
                return resolve(ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    create(data: Account): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            this.mapToDocument(data).save((err: any) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(data));
            });
        });
    }

    update(id: string, data: Account): Promise<OperationResponse<Account>> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({ id: id }, data, { new: true }, (err: any, doc: mongoose.Document) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    private mapFromDocument(document: mongoose.Document): Account {
        if (!document) {
            return null;
        }
        
        return {
            id: document.get('id'),
            externalID: document.get('externalID'),
            name: document.get('name'),
        };
    }

    private mapToDocument(account: Account): mongoose.Document {
        return new this.model(account);
    }
}
