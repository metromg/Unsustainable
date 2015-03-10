define(['angular'], function (ng) {
    'use strict';
    var ctrl = ng.module('unsustainableControls', []);
    //http://chawi3.com/2015/02/17/error-ngareq-argument-fn-is-not-a-function-got-string/

    ctrl.controller('alchemyTableCtrl', ['$scope', function ($scope){
        var vm = $scope.vm = this;
        vm.title = "Wow it Works!";

    }]);

    return ctrl;

});
