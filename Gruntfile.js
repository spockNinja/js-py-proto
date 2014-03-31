// Grunt file to run automated project tasks

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            main: {
                src: [
                    'src/header.js',
                    'src/modules/*.js',
                    'src/main.js'
                ],
                dest: 'build/js-py-proto.js'
            }
        },
        nodeunit: {
            all: ['tests/*.js']
        },
        uglify: {
            build: {
                src: 'build/js-py-proto.js',
                dest: 'build/js-py-proto.min.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/main.js',
                'src/modules/*.js'
            ],
            options: {
                node: true,
                browser: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                freeze: false,
                indent: 4,
                unused: true,
                trailing: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'jshint',
        'concat',
        'nodeunit',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);
};
