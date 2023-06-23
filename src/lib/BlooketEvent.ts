import { DynamicObject } from "./Utils";

/**
 * Abstract class for the the blooket state change event 
 */
abstract class AbstractStateChangeEvent {

    /**
     * @type {Map<number, Subscriber>} a list of callbacks
     */
    abstract subscribers: Map<number, Subscriber>;

    /**
     * Subscribe to the event using a string
     * @param {string} name the name of the subscriber that will be used to create a hash
     * @param {Subscriber} subscriberData data of the subscriber
     * @returns {number} the subscriber id provided by the jenkins hash of the name field 
     */
    abstract subscribe(name: string, subscriberData: Subscriber): number 

    /**
     * Subscribe to the event using a string and a callback
     * @param {string} name the name of the subscriber that will be used to create a hash
     * @param {Subscriber} subscriberData data of the subscriber
     * @returns {number} the subscriber id provided by the jenkins hash of the name field 
     */
    abstract quickSubscribe(name: string, subscriberData: (data: AbstractStateChangeEventData) => AbstractStateChangeEventData): number

    /**
     * Subscribe to the event using an id
     * @param {number} id the id of the subscriber
     * @param {Subscriber} subscriberData data of subscriber
     */
    abstract subscribeWithId(id: number, subscriberData: Subscriber): void 

    /**
     * Unsubscribe to the event using an id
     * @param {number} subscriberId 
     */
    abstract unsubscribeWithId(subscriberId: number): void 


    /**
     * Unsubscribe to the event using an id
     * @param {number} subscriberId 
     */
    abstract unsubscribe(subscriberId: string): void 
    
    /**
     * Emit the event and send it to every subscriber, should not be called by user
     * @param {AbstractStateChangeEventData} data event data
     * @returns {AbstractStateChangeEventData} modified event data
     */
    abstract emit(data: AbstractStateChangeEventData): AbstractStateChangeEventData
    
}

/**
 * Data for the state change event data, I apologize for this naming
 */
abstract class AbstractStateChangeEventData {
    abstract readonly before: DynamicObject;
    abstract readonly originalArguments: IArguments;
    abstract arguments: IArguments;
    abstract readonly time: number;
    abstract isCanceled: boolean;
}

enum EventPriority {
    LOWEST = -2,
    LOW = -1,
    NORMAL = 0,
    HIGH = 1,
    HIGHEST = 2,
    MONITOR = 3
}

type Subscriber = {
    callback: (data: AbstractStateChangeEventData) => AbstractStateChangeEventData,
    priority: EventPriority,
}

/**
 * Hashes a string to a number using the jenkinsHash
 * @param {string} str string to get the hash of
 * @returns {number} the hash result
 */
function jenkinsHash(str: string): number {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);

        if (charCode >= 0xd800 && charCode <= 0xdbff) {
            const highSurrogate = charCode;
            const lowSurrogate = str.charCodeAt(++i);

            charCode = (highSurrogate - 0xd800) * 0x400 + (lowSurrogate - 0xdc00) + 0x10000;
        }

        hash += charCode;
        hash += hash << 10;
        hash ^= hash >>> 6;
    }

    hash += hash << 3;
    hash ^= hash >>> 11;
    hash += hash << 15;

    return hash >>> 0;
}

export {
    AbstractStateChangeEvent ,
    AbstractStateChangeEventData as EventData, 
    EventPriority,
    jenkinsHash
}