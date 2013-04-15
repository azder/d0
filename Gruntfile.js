/*global */
/*jshint evil:true, node:true */

module.exports = function(grunt) {

    // ALWAYS
    'use strict';

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        today: '<%= grunt.template.today("isoDateTime") %>',

        files: {
            src: 'source/<%= pkg.name %>.js',
            build: 'build/<%= pkg.name %>.min.js',
            dest: '<%= pkg.name %>.min.js',
            test: 'test/*.js',
            jshintrc: '.jshintrc'
        },

        uglify: {

            all: {

                options: {
                    banner: '/*!\n <%= pkg.name %> <%= today %> \n author: <%= pkg.author %> \n*/\n'
                },
                files: {
                    '<%= files.dest %>': ['<%= files.build %>']
                }

            }

        },

        jshint: {

            options: {
                jshintrc: '<%= files.jshintrc %>'
                //, immed: false // DONT require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
            },

            all: ['Gruntfile.js', '<%= files.src %>']

        },

        concat: {
            src: '<%= files.src %>',
            dest: '<%= files.dest %>'
        },
        // ,
        // mocha: {
        // tests: ['tests/index.html'],
        // options: {
        // reporter: 'min'
        // }
        // },
        replace: {
            dist: {
                options: {
                    variables: {
                        'name': '<%= pkg.name %>',
                        'version': '<%= pkg.version %>',
                        'docstub': 'documentation missing'
                    },
                    prefix: '@@'
                },
                files: [{
                    expand: false,
                    flatten: true,
                    src: ['<%= files.src %>'],
                    dest: '<%= files.build %>'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['<%= files.src %>', 'Gruntfile.js'],
                tasks: ['jshint'],
                event: 'all',
                options: {
                    // nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['jshint', 'replace', 'uglify']);

};
