import { Report } from '../../shared/models/Report';
import { MockDataController } from './mock-data';

export class MockReportData extends MockDataController {

    setCollection(data: Report[]): void {
        this.collection = data;
    }
}