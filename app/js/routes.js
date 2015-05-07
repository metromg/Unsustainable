'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(false);

    $stateProvider
        .state('alchemyTable', {
            url: '/',
            controller: 'alchemyTableCtrl as vm',
            templateUrl: 'alchemy-table.html'
        })
        .state('elementList',{
          url:'/element-list',
            controller:'elementListCtrl as vm',
            templateUrl:'element-list.html'
        })
        .state('gameOver', {
            url: '/game-over',
            controller: 'gameOverCtrl as vm',
            templateUrl: 'game-over.html'
        });

    $urlRouterProvider.otherwise('/');
}

module.exports = Routes;