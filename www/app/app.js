/**
 * Created by elias on 03.03.15.
 */
'use strict';
define([
    'angular',
    'angularRoute'
], function(angular, angularRoute) {
    return angular.module('app', [
        'ngRoute'
    ]).config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
});