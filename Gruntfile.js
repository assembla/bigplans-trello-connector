'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg   : grunt.file.readJSON('package.json'),
    jshint: {
      files: grunt.file.readJSON('.jshint.files'),
      options: {
        jshintrc: '.jshintrc',
        ignores: []
      }
    },

    'jasmine_node': {
      options: {
        projectRoot: './spec',
        verbose: false,
        forceExit: true,
        captureExceptions : true
      },
      all: [ './spec' ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['jshint', 'jasmine_node']);
  grunt.registerTask('default', ['test']);
};
