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
        unsustainableApp:'app/app',
        unsustainableControls:'app/unsustainable-controls',
        unsustainableDirectives:'app/unsustainable-directives',
        service:'',

        angular: 'libs/angular/angular',
        angularUiRouter: 'libs/angular-ui-router/release/angular-ui-router',
        angularMocks: 'libs/angular-mocks/angular-mocks',
        text: 'libs/requirejs-text/text'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularUiRouter': ['angular'],
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
        'unsustainableApp'
    ], function(angular) {

        angular.bootstrap(document, ['unsustainableApp']);

    }
);