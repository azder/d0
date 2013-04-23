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
            build: 'tmp/<%= pkg.name %>.js',
            dist: '<%= pkg.name %>.min.js',
            test: 'test/*.js',
            testpage: 'test/*.html',
            jshintrc: '.jshintrc'
        },

        jshint: {

            options: {
                jshintrc: '<%= files.jshintrc %>',
                force: true
            },

            beforeconcat: ['Gruntfile.js', '<%= files.src %>', '<%= files.test %>'],
            afterconcat: ['<%= files.build %>']


        },

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

        uglify: {

            all: {

                options: {
                    banner: '/*!\n <%= pkg.name %> <%= today %> \n author: <%= pkg.author %> \n*/\n'
                },

                files: {
                    '<%= files.dist %>': ['<%= files.build %>']
                }

            }

        },

        concat: {
            '<%= files.dist %>': '<%= files.build %>'
        },

        mocha: {
            all: ['<%= files.testpage %>']
        },

        compress: {
            dist: {
                options: {
                    mode: 'tgz',
                    archive: 'test.tar.gz'
                },
                expand: true,
                cwd: 'test/',
                src: ['**/*'],
                dest: './'

            }
        },

        watch: {
            scripts: {
                files: ['<%= files.src %>', '<%= files.test %>', 'Gruntfile.js'],
                tasks: ['jshint:beforeconcat', 'mocha'],
                event: 'all',
                options: {
                    // nospawn: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['jshint', 'replace', 'concat', 'uglify']);

};
