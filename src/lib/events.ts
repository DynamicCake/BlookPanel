/**
 * Abstract class for the publish-subscribe pattern
 */
abstract class BlooketEvent {

    /**
     * @type {Map<number, Function>} a list of callbacks
     */
    subscribers: Map<number, Function>;

    constructor() {
        this.subscribers = new Map();
    }

    /**
     * Subscribe to the event using a string
     * @param {string} name the name of the subscriber that will be used to create a hash
     * @param {Function} callback the function that gets called when the event gets called
     * @returns {number} the subscriber id provided by the jenkins hash of the name field 
     */
    subscribe(name: string, callback: Function): number {
        const id = jenkinsHash(name);
        this.subscribers.set(id, callback);
        return id;
    }

    /**
     * Subscribe to the event using an id
     * @param {number} id the id of the subscriber
     * @param {Function} callback the function that gets called when the event gets called
     */
    subscribeWithId(id: number, callback: Function): void {
        this.subscribers.set(id, callback);
    }

    /**
     * Unsubscribe to the event using an id
     * @param {number} subscriberId 
     */
    unsubscribe(subscriberId: number): void {
        this.subscribers.delete(subscriberId)
    }

    /**
     * Emit the event and send it to every subscriber
     */
    abstract emit(data: any): void;
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
    BlooketEvent,
    jenkinsHash
}