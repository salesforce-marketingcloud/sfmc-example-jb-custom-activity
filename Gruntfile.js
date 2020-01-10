module.exports = function(grunt) {

  const vendorJS = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/fuelux/dist/js/fuelux.min.js',
    'node_modules/requirejs/require.js',
    'node_modules/postmonger/postmonger.min.js',
  ];

  const vendorCSS = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/fuelux/dist/css/fuelux.min.css'
  ];

const activityExamples = [
  'ping/**',
  'customsplit/**'
]

const fonts = [
  'src/fonts/*',
  'node_modules/bootstrap/fonts/*'
];


  const appCSS = [
    'src/styles/**'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      dev: {
        options: {
          script: 'server.js',
          args: [
            'dev'
          ],
          options: {
            spawn: false
          }
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      }
    },
    clean: {
      all: [
        'public/*'
      ]
    },
    concat: {
      options: {
        separator: '\n',
      },
      vendor: {
        files: {
          'public/static/css/vendor.css': vendorCSS,
          'public/static/js/vendor.js': vendorJS
        }
      },
      appCSS: {
        files: {
          'public/static/css/app.css': appCSS
        }
      }
    },
    copy: {
      vendor: {
        files: [{
            expand: true,
            src: vendorCSS,
            dest: 'public/static/css/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            src: vendorJS,
            dest: 'public/static/js/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            src: fonts,
            dest: 'public/static/fonts/',
            flatten: true,
            filter: 'isFile'
          },
        ]
      },
      app: {
        files: [{
          expand: true,
          cwd: 'src',
          src: activityExamples,
          dest: 'public/',
        },{
          expand: true,
          cwd: 'src',
          src: ['index.html'],
          dest: 'public/',
        },{
          expand: true,
          cwd: 'src',
          src: [
            'images/**',
          ],
          dest: 'public/static',
        }]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      express: {
        files: ['public/**'],
        tasks: [
          'express:dev',
        ],
        options: {
          spawn: false,
          debounceDelay: 500,
        }
      },
      src: {
        files: [
          'src/**'
        ],
        tasks: ['build-app'],
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build-vendor', ['concat:vendor']);
  grunt.registerTask('build-app', ['concat:appCSS', 'copy:app']);

  grunt.registerTask('build', ['clean', 'build-vendor', 'copy:vendor', 'copy:app', 'build-app']);


  grunt.registerTask('dev', ['build', 'express:dev', 'watch']);


  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
