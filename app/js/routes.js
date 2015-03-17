'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('alchemyTable', {
            url: '/',
            controller: 'alchemyTableCtrl as vm',
            templateUrl: 'alchemy-table.html'
        });

    $urlRouterProvider.otherwise('/');

}

module.exports = Routes;