/**
 * Created by elias on 03.03.15.
 */
define([
    'angular',
    'unsustainableControls',
    'unsustainableDirectives',
    'angularUiRouter'
], function (angular) {
    'use strict';
    var app = angular.module('unsustainableApp', ['ui.router','unsustainableControls','unsustainableDirectives']);
    app.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('alchemyTable', {
            controller: 'alchemyTableCtrl',
            templateUrl: 'pages/alchemy-table.html'
        });
    }]);
    app.run(['$state', function ($state) {
        $state.go('alchemyTable');
    }]);
    return app;
});