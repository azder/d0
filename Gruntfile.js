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
            testPage: 'test/*.html',
            jshintrc: '.jshintrc',
            mddocs: 'docs/*.md',
            docs: {
                mdhtml: 'tmp/docs/html/',
                docco: 'tmp/docs/docco/',
                dox: 'tmp/docs/dox/'
            },
            temps: ['<%=files.docs.docco%>', '<%=files.docs.dox%>', '<%=files.docs.mdhtml%>']
        },

        clean: {
            init: '<%=files.temps%>'
        },


        mkdir: {
            init: {
                options: {
                    create: '<%=files.temps%>'
                }
            }
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
            all: ['<%= files.testPage %>']
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

        markdown: {
            docs: {
                files: ['<%= files.mddocs %>'],
                dest: '<%= files.docs.mdhtml %>',
                //template: 'myTemplate.jst',
                options: {
                    gfm: false,
                    highlight: 'auto'
                }
            }
        },

        docco: {
            docs: {
                src: ['<%= files.build %>'],
                options: {
                    output: '<%= files.docs.docco %>'
                }
            }
        },


        dox: {

            options: {
                title: '<%= pkg.name %>'
            },

            files: {
                src: ['<%= files.build %>'],
                dest: '<%= files.docs.dox %>'
            }
        },


        watch: {

            scripts: {
                files: ['<%= files.src %>', '<%= files.test %>', 'Gruntfile.js'],
                tasks: ['jshint:beforeconcat', 'mocha', 'docco', 'dox'],
                event: 'all',
                options: {
                    // nospawn: true
                }
            },

            docs: {
                files: ['<%= files.mddocs %>'],
                tasks: ['markdown:docs'],
                event: 'all'
            }
        }

    });

    //
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-dox');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-mocha');
    //
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //
    grunt.registerTask('init', ['clean:init', 'mkdir:init']);
    grunt.registerTask('docs', ['docco', 'dox', 'markdown:docs']);
    grunt.registerTask('default', ['init', 'jshint:beforeconcat', 'replace', 'docs', 'concat', 'jshint:afterconcat', 'uglify']);

};
