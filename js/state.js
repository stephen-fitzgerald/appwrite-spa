// @ts-check
/* jshint esversion: 6 */

// if( myObject[isProxy] ){...};
const is_A_Proxy = Symbol("isProxy");

/**
 * @param {{ [x: string]: boolean; }} obj
 */
export function isProxified(obj) {
    // @ts-ignore
    return (obj[is_A_Proxy] == true);
}

/**
 * @param {{ [x: string]: any; hasOwnProperty?: any; }} object
 * @param {{ (object: any, property: any, oldValue: any, newValue: any): void; (arg0: any, arg1: string | symbol, arg2: any, arg3: any): void; }} change
 */
export function proxify(object, change) {

    // unique field to show object is proxy already
    // @ts-ignore
    if (object && object[is_A_Proxy]) {
        return object;
    }

    var proxy = new Proxy(
        object,
        {
            get: function (object, prop) {
                if (prop === is_A_Proxy) {
                    return true;
                }
                // @ts-ignore
                return object[prop];
            },
            // @ts-ignore
            set: function (object, prop, value) {
                // @ts-ignore
                var old = object[prop];
                if (value && typeof value == 'object') {
                    // new object need to be proxified as well
                    value = proxify(value, change);
                }
                // @ts-ignore
                object[prop] = value;
                change(object, prop, old, value);
            }
        }
    );

    for (var prop in object) {
        if (object.hasOwnProperty(prop) && object[prop] &&
            typeof object[prop] == 'object') {
            // proxify all child objects
            object[prop] = proxify(object[prop], change);
        }
    }
    return proxy;
}

let object = {};

object = proxify(object, function (object, property, oldValue, newValue) {
    console.log('property ' + property + ' changed from ' + oldValue +
        ' to ' + newValue);
});