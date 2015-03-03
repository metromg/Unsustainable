/**
 * Created by elias on 03.03.15.
 */
'use strict';
define([
    'angular',
    'angularRoute',
    'controls'
], function(angular) {
    return angular.module('app', ['ngRoute','controls']
    ).config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'pages/homePage.html',
                    controller: 'MainCtrl'
                })
                .otherwise({redirectTo: '/'});
        }]);
});