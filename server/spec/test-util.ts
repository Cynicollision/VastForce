import { OperationResponse } from './../../shared/contracts/OperationResponse';

export class TestUtil {
    static readonly testExternalID = 'Test External ID';
    static readonly testAccountID = 'Test Account ID';
    static readonly testAccountName = 'Test Account Name';

    static logResponse<T>(response: OperationResponse<T>) {
        if (!response.success) {
            let i = 1;
            let current = response;

            const log = (message: string) => {
                console.log(`[${i}] ${message}`); i++;
            }

            while (!!current) {
                console.log(`[${i}] Operation failed with message: ${response.message}`);
                current = response.innerOperation;
            }
        }
    }
}