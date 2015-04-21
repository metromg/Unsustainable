/**
 * Created by elias on 30.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function elementListCtrl($scope, recipeService, elementService) {
    // ViewModel
    var vm = this;

    vm.unlockedElements = [];

    elementService.getBaseElements().then(function (elements) {
        vm.unlockedElements = vm.unlockedElements.concat(elements);
        vm.selected = vm.unlockedElements[0];
    });

    recipeService.getUnlockedRecipes().then(function (elements) {
        vm.unlockedElements = vm.unlockedElements.concat(elements);

        console.log(vm.unlockedElements)
    });

    $scope.$watchCollection("vm.selected", function (newCollection) {
        vm.selectedChildren = [];

        if ( newCollection && newCollection.isBaseElement != 1 && newCollection.Id)
            elementService.getElementParts(newCollection).then(function (elements) {
                console.log("tews",elements,newCollection.Id)
                vm.selectedChildren = elements;
            })

    })


}

controllersModule.controller('elementListCtrl', elementListCtrl);
