import { BlooketEvent } from './events'
import { DynamicObject } from './hook';

class StateChangeEvent extends BlooketEvent {

    subscribers!: Map<number, Function>;

    constructor() {
        super();
    }

    emit(eventData: EventData): void {
        for (let subscriber of this.subscribers) {
            subscriber[1].call(eventData)
        }
    }

}


interface EventData {
    before: DynamicObject,
    after: DynamicObject
    time: number
}

interface DiffResult {
    type: string;
    data: any;
}

interface DeepDiffMapper {
    VALUE_CREATED: string;
    VALUE_UPDATED: string;
    VALUE_DELETED: string;
    VALUE_UNCHANGED: string;
    map(obj1: any, obj2: any): any;
    compareValues(value1: any, value2: any): string;
    isFunction(x: any): boolean;
    isArray(x: any): boolean;
    isDate(x: any): boolean;
    isObject(x: any): boolean;
    isValue(x: any): boolean;
}

const deepDiffMapper: DeepDiffMapper = {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map(obj1: any, obj2: any) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
            throw 'Invalid argument. Function given, object expected.';
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
            return {
                type: this.compareValues(obj1, obj2),
                data: obj1 === undefined ? obj2 : obj1
            };
        }

        const diff: any = {};
        for (const key in obj1) {
            if (this.isFunction(obj1[key])) {
                continue;
            }

            let value2: any = undefined;
            if (obj2[key] !== undefined) {
                value2 = obj2[key];
            }

            diff[key] = this.map(obj1[key], value2);
        }
        for (const key in obj2) {
            if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
                continue;
            }

            diff[key] = this.map(undefined, obj2[key]);
        }

        return diff;
    },
    compareValues(value1: any, value2: any) {
        if (value1 === value2) {
            return this.VALUE_UNCHANGED;
        }
        if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
            return this.VALUE_UNCHANGED;
        }
        if (value1 === undefined) {
            return this.VALUE_CREATED;
        }
        if (value2 === undefined) {
            return this.VALUE_DELETED;
        }
        return this.VALUE_UPDATED;
    },
    isFunction(x: any) {
        return Object.prototype.toString.call(x) === '[object Function]';
    },
    isArray(x: any) {
        return Object.prototype.toString.call(x) === '[object Array]';
    },
    isDate(x: any) {
        return Object.prototype.toString.call(x) === '[object Date]';
    },
    isObject(x: any) {
        return Object.prototype.toString.call(x) === '[object Object]';
    },
    isValue(x: any) {
        return !this.isObject(x) && !this.isArray(x);
    }
};

export {
    StateChangeEvent,
    EventData,
    deepDiffMapper
}