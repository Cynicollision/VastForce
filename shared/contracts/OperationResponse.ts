export interface IOperationResponse {
    success: boolean;
    message?: string;
    innerOperation?: IOperationResponse;
}

export abstract class EmptyOperationResponse implements IOperationResponse {
    success: boolean = false;
    message?: string;
    innerOperation?: IOperationResponse;
}

export abstract class OperationResponse<T> extends EmptyOperationResponse {
    data?: T;
}