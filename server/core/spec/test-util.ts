import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { ResponseUtil } from './../util/response';

export class TestUtil {
    static readonly testExternalID = 'Test External ID';
    static readonly testAccountID = 'Test Account ID';
    static readonly testAccountName = 'Test Account Name';

    static logResponse<T>(response: OperationResponse<T>) {
        if (!response.success) {
            ResponseUtil.logResponse(response);
        }
    }
}