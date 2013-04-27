( function(G, factory) {

        //ALWAYS
        'use strict';

        var name = '@@name', version = '@@version', define = G.define, module = G.module;


        if ('object' === typeof module && 'object' === typeof module.exports) {

            module.exports = factory(G);

        } else {

            // Browser global
            G[name] = factory(G);

            if ( typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define(name, factory);
            }

        }


    }(this, function(G) {

        //ALWAYS
        'use strict';

        var


        /**@@docstub*/
        //
        forEach = Array.prototype.forEach,

        /**@@docstub*/
        hasOwn = Object.prototype.hasOwnProperty,

        /**@@docstub*/
        isNumber = function(value) {
            return value === +value;
        },

        /**@@docstub*/
        each = function(object, iterator, context) {

            var length, index, key;

            if (null === object || /*@f:off*/void 0/*@f:on*/ === object) {
                return object;
            }
            if (null === iterator || /*@f:off*/void 0/*@f:on*/ === iterator) {
                return object;
            }

            if (forEach && object.forEach === forEach) {
                object.forEach(iterator, context);
                return object;
            }

            length = object.length;

            if (length !== +length) {
                for (key in object) {
                    if (null === iterator.call(context, object[key], key, object)) {
                        return object;
                    }
                }
                return object;
            }

            if (0 >= length) {
                return object;
            }

            for ( index = 0; index < length; index += 1) {
                if (null === iterator.call(context, object[index], index, object)) {
                    return object;
                }
            }

            return object;

        },

        /**@@docstub*/
        names = [],

        /**@@docstub*/
        behaviors = {}
        // var
        ;

        /**@@docstub*/
        function d0() {
        }


        return d0;

    })

);
