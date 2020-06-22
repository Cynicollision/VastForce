import * as uniqid from 'uniqid';
import { ObjectType } from '../enum/object-type';

export class ID {

    static new(type: ObjectType): string {
        return (type || 'XX') + uniqid();
    }
}