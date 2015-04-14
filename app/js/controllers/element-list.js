/**
 * Created by elias on 30.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function elementListCtrl($scope, elementService) {
    // ViewModel
    var vm = this;

    elementService.getUnlockedElements().then(function (elements) {
        console.log(elements)
       vm.unlockedElements = elements;
    });
}

controllersModule.controller('elementListCtrl', elementListCtrl);
