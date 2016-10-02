'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    datetime: Date.now(),

    /**
     * Run JSHint on our JS files
     * Docs at https://github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['*.js']
      }
    },

    /**
     * Run JSONLint on our configuration files
     */
    jsonlint: {
      configFiles: {
        src: ['package.json']
      }
    },


  });

  grunt.registerTask('default', ['jshint', 'jsonlint', 'travis-lint']);
};
