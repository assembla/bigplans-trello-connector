'use strict';

var config = require('load-grunt-config');
var path = require('path');

module.exports = function(grunt) {
  config(grunt, {
    init: true,
    loadGruntTasks: true,

    config: {
      pkg    : require('package.json'),
      src    : ['index.js', 'lib/**/*.js'],
      config : ['package.json', 'Gruntfile.js', '.jshintrc'],
      specs  : ['spec/**/*Spec.js']
    }
  });

  grunt.registerTask('default', ['test']);
};
