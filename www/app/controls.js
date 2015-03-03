'use strict';
define(['angular'], function (ng) {

    var ctrl = ng.module('controls', []);
    //http://chawi3.com/2015/02/17/error-ngareq-argument-fn-is-not-a-function-got-string/
    ctrl.controller('MainCtrl', ['$scope', function ($scope){
        $scope.vm = this;
        this.title = "Wow it Works!";

    }]);
    return ctrl;

});
