/**
 * Created by Michael on 22.03.2015.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function gameOverCtrl($scope, intersectService, elementService) {
    // ViewModel
    var vm = this;

    //TODO: Reset current elements to basic elements in db
}

controllersModule.controller('gameOverCtrl', gameOverCtrl);
