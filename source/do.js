( function(G, factory) {

        //ALWAYS
        'use strict';

        var name = '@@name', version = '@@version', define = G.define;


        if ('function' === typeof define && define.amd) {
            // AMD. Register as an anonymous module.
            define(name, ['jquery'], factory);
        } else {
            // Browser global
            factory(G.jQuery);
        }


    }(this, function($) {

        //ALWAYS
        'use strict';
        var

        /**@@docstub*/
        methods = {
            init: function(options) {

                return this.each(function() {

                    var $this = $(this), data = $this.data('tooltip'), tooltip = $('<div />', {
                        text: $this.attr('title')
                    });

                    // If the plugin hasn't been initialized yet
                    if (!data) {

                        /*
                         Do more setup stuff here
                         */

                        $(this).data('tooltip', {
                            target: $this,
                            tooltip: tooltip
                        });

                    }
                });
            },
            //
            destroy: function() {

                return this.each(function() {

                    var $this = $(this), data = $this.data('tooltip');

                });

            }

        },

        //
        plugin = function(method) {

            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if ( typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.@@name');
            }

        }

        // var
        ;

        $.fn['@@name'] = plugin;

    })

);
