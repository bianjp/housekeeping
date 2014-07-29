module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      js_client: 'public/javascripts',
      js_server: ['bin/routes', 'bin/lib', 'bin/config'],
      css: 'public/stylesheets'
    },

    copy: {
      server_routes: {
        expand: true,
        cwd: 'src/routes',
        src: '**/*.js',
        dest: 'bin/routes'
      },
      server_lib: {
        expand: true,
        cwd: 'src/lib',
        src: '**/*.js',
        dest: 'bin/lib'
      }
    },

    livescript: {
      server: {
        files: [
          { 
            expand: true,
            cwd: '.',
            src: 'app.ls',
            dest: '.',
            ext: '.js'
          },
          { 
            expand: true,
            cwd: 'src/config',
            src: '*.ls',
            dest: 'bin/config',
            ext: '.js'
          },
          {
            expand: true,
            cwd: 'src/lib',
            src: '*.ls',
            dest: 'bin/lib',
            ext: '.js'
          },
          {
            expand: true,
            cwd: 'src/routes',
            src: '*.ls',
            dest: 'bin/routes',
            ext: '.js'
          }
        ]
      },

      client: {
        files: {
          'public/javascripts/lib/lib.js': 'src/client/js/lib/**/*.ls',
          'public/javascripts/all.js': ['src/client/js/**/*.ls', '!src/client/js/lib/**/*.ls']
        }
      }
    },

    compass: {
      all: {
        options: {
          sassDir: 'src/client/css',
          cssDir: 'public/stylesheets',
          outputStyle: 'compressed'
        }
      }
    },

    concat: {
      css: {
        src: ['public/stylesheets/**/*.css', '!public/stylesheets/all.css'],
        dest: 'public/stylesheets/all.css'
      }
    },

    express: {
      options: {
        debug: false
      },
      server: {
        options: {
          script: 'app.js'
        }
      }
    },

    watch: {
      options: {
        spawn: false
      },

      stylesheets: {
        files: ['src/client/css/**/*.scss'],
        tasks: ['clean:css', 'compass', 'concat:css']
      },

      javascripts_client: {
        files: ['src/client/js/**/*.ls'],
        tasks: ['clean:js_client', 'livescript:client']
      },

      javascripts_server: {
        files: ['src/lib/**/*', 'src/routes/**/*', 'app.ls'],
        tasks: ['clean:js_server', 'livescript:server', 'copy', 'express']
      },

      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['default']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-livescript');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  // Define tasks
  grunt.registerTask('default', ['clean', 'livescript', 'copy', 'compass', 'concat', 'express', 'watch']);
  grunt.registerTask('build', ['clean', 'livescript', 'copy', 'compass', 'concat']);
  grunt.registerTask('run', ['express', 'watch']);

  grunt.registerTask('resetDatabase', 'Reset database...', function(){
    var db = require('./bin/lib/db');
    var done = this.async();

    db.connect(function(err){
      db.clear(function(){
        db.initialize(function(){
          done();
        });
      });
    })
  });

  grunt.registerTask('reset', ['build', 'resetDatabase']);
};