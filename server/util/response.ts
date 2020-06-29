import { IOperationResponse, OperationResponse } from '../../shared/contracts/OperationResponse';

export class ResponseUtil {

    static succeed<T>(data?: T): OperationResponse<T> {
        return {
            success: true,
            message: null,
            data: data,
        };
    }

    static succeedAsync<T>(data?: T): Promise<OperationResponse<T>> {
        return Promise.resolve(this.succeed(data));
    }

    static fail<T>(message: string, inner?: IOperationResponse): OperationResponse<T> {
        return {
            success: false,
            message: message,
            innerOperation: inner,
            data: <T>null,
        };
    }

    static failAsync<T>(message: string, inner?: IOperationResponse): Promise<OperationResponse<T>> {
        return Promise.resolve(this.fail(message, inner));
    }

    static logResponse<T>(response: OperationResponse<T>) {
        let current = response;
        let i = 1;

        const log = (message: string) => {
            console.log(`[${i}] ${message}`); i++;
        }

        while (!!current) {
            log(`[${i}] Operation failed with message: ${response.message}`);
            current = response.innerOperation;
        }
    }
}
