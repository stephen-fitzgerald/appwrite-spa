// @ts-check
/* jshint esversion: 6 */

// if( myObject[isProxy] ){...};
const is_A_Proxy = Symbol("isProxy");

export function isProxified(obj) {
    return (obj[is_A_Proxy] == true);
}

export function proxify(object, change) {

    // unique field to show object is proxy already
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
                return object[prop];
            },
            // @ts-ignore
            set: function (object, prop, value) {
                var old = object[prop];
                if (value && typeof value == 'object') {
                    // new object need to be proxified as well
                    value = proxify(value, change);
                }
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