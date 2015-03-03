'use strict';

if(window.__karma__) {
    var allTestFiles = [];
    var TEST_REGEXP = /.*Spec\.js$/;

    var pathToModule = function(path) {

        return path.replace(/^\/base\/www\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {

        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });
}

require.config({
    paths: {
        app:'app/app',
        angular: 'libs/angular/angular',
        angularRoute: 'libs/angular-route/angular-route',
        angularMocks: 'libs/angular-mocks/angular-mocks',
        text: 'libs/requirejs-text/text'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'app' :{'deps': ['angular']},
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        }
    },
    priority: [
        "angular"
    ],
    deps: window.__karma__ ? allTestFiles : [],
    callback: window.__karma__ ? window.__karma__.start : null,
    baseUrl: window.__karma__ ? '/base/www' : ''
});

require([
        'angular',
        'app'
    ], function(angular, app) {
             angular.bootstrap(document, ['app']);
    }
);