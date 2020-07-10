import * as mongoose from 'mongoose';
import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { ResponseUtil } from './../util/response';

export function connectMongoDB(mongoUri: string): Promise<OperationResponse<boolean>> {
    return new Promise<OperationResponse<boolean>>((resolve, reject) => {
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(mongoUri, { useNewUrlParser: true });

        mongoose.connection.on('error', () => { 
            resolve(ResponseUtil.fail(`Database connection error.`));
        });
        mongoose.connection.once('open', () => {
            resolve(ResponseUtil.succeed());
        });
    });
}