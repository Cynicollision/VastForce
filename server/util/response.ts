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
            console.log(`[${i}] ${message}`); 
            i++;
        }

        while (!!current && !current.success) {
            log(`[${i}] Operation failed with message: ${response.message}`);
            current = response.innerOperation;
        }
    }

    static combineResponses<T>(responses: OperationResponse<any>[]): Promise<OperationResponse<T>> {
        let message = '';
        let data = [];

        for (let i = 0; i < responses.length; i++) {
            message += `${i === 0 ? '' : ' | '}${responses[i].message}`;
            data.push(responses[i].data);
        }

        let response = responses.every(res => res.success) 
            ? this.succeed<T>() 
            : this.fail<T>(message);

        return Promise.resolve(response);
    }

    static allSuccess(responses: OperationResponse<any>[]): boolean {
        return responses.every(res => res.success);
    }
}
