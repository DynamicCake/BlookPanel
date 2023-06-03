import { AbstractStateChangeEvent, jenkinsHash } from "./lib/BlooketEvent";
import { Subscriber } from "./Subscriber";
import { EventPriority } from "./EventPriority";
import { StateChangeEventData } from "./StateChangeEventData";

/**
 * Abstract class for the publish-subscribe pattern
 */
export class StateChangeEvent implements AbstractStateChangeEvent {

    /**
     * @type {Map<number, Subscriber>} a list of callbacks
     */
    subscribers: Map<number, Subscriber>;

    constructor() {
        this.subscribers = new Map();
    }

    /**
     * Subscribe to the event using a string
     * @param {string} name the name of the subscriber that will be used to create a hash
     * @param {Subscriber} subscriberData data of the subscriber
     * @returns {number} the subscriber id provided by the jenkins hash of the name field
     */
    subscribe(name: string, subscriberData: Subscriber): number {
        const id = jenkinsHash(name);
        this.subscribers.set(id, subscriberData);
        return id;
    }

    /**
     * Subscribe to the event using a string and a callback
     * @param {string} name the name of the subscriber that will be used to create a hash
     * @param {Subscriber} subscriberData data of the subscriber
     * @returns {number} the subscriber id provided by the jenkins hash of the name field
     */
    quickSubscribe(name: string, subscriberData: (data: StateChangeEventData) => StateChangeEventData): number {
        const id = jenkinsHash(name);
        this.subscribers.set(id, {
            callback: subscriberData,
            priority: EventPriority.NORMAL
        });
        return id;
    }

    /**
     * Subscribe to the event using an id
     * @param {number} id the id of the subscriber
     * @param {Subscriber} subscriberData data of subscriber
     */
    subscribeWithId(id: number, subscriberData: Subscriber): void {
        this.subscribers.set(id, subscriberData);
    }

    /**
     * Unsubscribe to the event using an id
     * @param {number} subscriberId
     */
    unsubscribe(subscriberId: string): void {
        this.subscribers.delete(jenkinsHash(subscriberId));
    }

    unsubscribeWithId(subscriberId: number): void {
        this.subscribers.delete(subscriberId);
    }

    /**
     * Emit the event and send it to every subscriber
     *
     */
    emit(data: StateChangeEventData): StateChangeEventData {
        let callBackList: Function[][] = [];
        for (const key of Object.values(EventPriority)) {
            callBackList[key as number] = [];
        }
        for (let [, subscriber] of this.subscribers) {
            callBackList[subscriber.priority].push(subscriber.callback);
        }

        let eventData = data;
        for (const priority of callBackList) {
            for (const callback of priority) {
                eventData = callback.call(null, data);
            }
        }
        return eventData;
    }
}
