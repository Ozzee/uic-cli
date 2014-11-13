module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost'
        }
      }
    },
    watch: {
      scripts: {
        files: ['script.js', 'index.html'],
        // tasks: ['connect:server'],
        options: {
          spawn: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect:server', 'watch']);
};
