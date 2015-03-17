'use strict';

module.exports = {

  'serverport': 3000,

  'styles': {
    'src' : 'app/styles/**/*.scss',
    'dest': 'www/css'
  },

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': 'www/js'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'www/images'
  },

  'fonts': {
    'src' : ['app/fonts/**/*'],
    'dest': 'www/fonts'
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'app/js'
  },

  'gzip': {
    'src': 'www/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'www/',
    'options': {}
  },

  'dist': {
    'root'  : 'www'
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
