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
            build: 'build/<%= pkg.name %>.js',
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
                jshintrc: '<%= files.jshintrc %>',
                force: true
            },

            beforeconcat: ['Gruntfile.js', '<%= files.src %>'],
            afterconcat: ['<%= files.build %>']


        },

        concat: {
            src: '<%= files.build %>',
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
                tasks: ['jshint:beforeconcat'],
                event: 'all',
                options: {
                    // nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['jshint', 'replace', 'concat', 'uglify']);

};
