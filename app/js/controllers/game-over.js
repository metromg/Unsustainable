/**
 * Created by Michael on 22.03.2015.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function gameOverCtrl($scope, intersectService, elementService, dataService) {
    // ViewModel
    var vm = this;
    vm.show = false;

    elementService.restoreBaseElements().then(function () {
        return dataService.updateCurrentEnergy(300);
    }).then(function () {
        vm.show = true;
    });
}

controllersModule.controller('gameOverCtrl', gameOverCtrl);
