( function(G, factory) {

        //ALWAYS
        'use strict';

        var name = '@@name', version = '@@version', define = G.define;


        if ('function' === typeof define && define.amd) {
            // AMD. Register as an anonymous module.
            define(name, factory);
        } else {
            // Browser global
            factory(G);
        }


    }(this, function(G) {

        //ALWAYS
        'use strict';

        /**@@docstub*/


    })

);
