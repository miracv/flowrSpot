module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    destAppCss: 'dist/css/all.css',

    imagemin: {
      standard: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{png,jpg,gif,ico}'],
          dest: 'dist/images'
        }]
      },

      svg: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{svg}'],
          dest: 'dist/images'
        }]
      }
    },

    // sass task
    sass: {
      dist: {
        options: {
          noCache: true,
          style: 'compressed'
        },
        files: {
          'src/css/main.css': 'src/sass/main.scss'
        }
      }
    },

    // Compress css files in odrder to be smaller
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      all: {
        files: [{
          src: [
            'src/css/*.css'
          ],
          dest:  '<%= destAppCss %>',
          ext: '.css'
        }]
      }
    },

    concat: {
      options: {
        separator: '\n\n/* ------------------------------------------------------------------------------------------------------------ */\n\n'
      },
      dist: {
        src: ['src/js/jquery.min.js','src/js/scripts.js'],
        dest: 'src/js/all.js'
      }
    },

    // uglify javascript files.
    uglify: {
      options: {
        mangle: {
          except: ['jQuery', 'angular', '$', 'require', 'exports', 'kendo']
        }
      },

      all: {
        files: {
          'dist/js/all.min.js': ['src/js/all.js']
        }
      }

    },

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("production", ["concat", "sass", "cssmin", "imagemin", "uglify"]);

};
