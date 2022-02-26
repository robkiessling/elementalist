/**
 * Mixin to add event support. Events are implemented similarly to jQuery events. E.g.
 * - Add an event listener using .on('myEvent', myFunction)
 * - Remove event listener(s) using .off('myEvent')
 * - Trigger event listener(s) using .trigger('myEvent')
 *
 * Like jQuery events, the event names can be namespaced using a period. E.g. .on('myEvent.myNamespace', ...).
 * Namespaces are important so you can remove particular handlers from an object without affecting other namespaces.
 * See https://api.jquery.com/on/ for more info event namespaces.
 *
 * Handlers can be given a priority using the third parameter of .on(). This can be used to call handlers in a certain
 * order. If no priority is given, the handler will be called at the end of the chain.
 *
 */

export const PRIORITIES = {
    pre: 1,
    addition: 2,
    multiplication: 3,
    division: 4,
    subtraction: 5,
    post: 6,
    none: 7
};

const NO_NAMESPACE = '__no_namespace__';

export const EventMixin = (superclass) => class extends superclass {
    constructor(...args) {
        super(...args);
        this._eventHandlers = {};
    }

    /**
     * Subscribe to event, usage:
     *  object.on('myEvent.myNamespace', event => { ... })
     *
     * The '.myNamespace' substring is optional; see the top of the file for more info.
     */
    on(eventName, handler, priority = PRIORITIES.none) {
        let namespaces = eventName.split('.');
        eventName = namespaces.shift();
        if (namespaces.length === 0) { namespaces = [NO_NAMESPACE]; }

        if (!this._eventHandlers[eventName]) { this._eventHandlers[eventName] = {}; }

        // Add handler to all namespaces
        namespaces.forEach(namespace => {
            if (!this._eventHandlers[eventName][namespace]) { this._eventHandlers[eventName][namespace] = []; }
            this._eventHandlers[eventName][namespace].push({handler: handler, priority: priority});
        });

        return this;
    }

    /**
     * Cancel the subscription, usage:
     *  object.off('myEvent.myNamespace') // removes 'myEvent' handlers that were in 'myNamespace'
     *  object.off('myEvent')             // removes 'myEvent' handlers across all namespaces
     *  object.off('.myNamespace')        // removes all event handlers that were in 'myNamespace'
     *  object.off()                      // removes all event handlers
     */
    off(eventName = '') {
        let namespaces = eventName.split('.');
        eventName = namespaces.shift();
        if (namespaces.length === 0) { namespaces = NO_NAMESPACE; }

        if (eventName) {
            this._removeNamespaces(eventName, namespaces);
        }
        else {
            // No eventName; remove all namespaces that match
            Object.keys(this._eventHandlers).forEach(eventName => {
                this._removeNamespaces(eventName, namespaces);
            });
        }

        return this;
    }

    _removeNamespaces(eventName, namespaces) {
        if (this._eventHandlers[eventName]) {
            if (namespaces === NO_NAMESPACE) {
                delete this._eventHandlers[eventName];
            }
            else {
                namespaces.forEach(namespace => delete this._eventHandlers[eventName][namespace]);
            }
        }
    }

    /**
     * Generate an event with the given name
     *  object.trigger('myEvent', { data1: value1, data2: value2 });
     */
    trigger(eventName, event) {
        if (this._eventHandlers[eventName]) {
            // Merge handlers across all namespaces into one array, sort it by priority, then call all handler functions
            let allHandlers = [].concat(...Object.values(this._eventHandlers[eventName]));
            allHandlers.sort((a, b) => { return a.priority - b.priority; });
            allHandlers.forEach(handlerObj => handlerObj.handler.call(this, event));
        }

        return this;
    }

};
