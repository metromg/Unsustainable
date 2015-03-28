/**
 * Created by elias on 17.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function alchemyTableCtrl($scope, intersectService, elementService, dbPopulateService) {
    // ViewModel
    var vm = this;

    dbPopulateService.constructModel().then(function () {
        dbPopulateService.generateMasterData().then(function () {
            elementService.getCurrentElements().then(function (data) {
                vm.elements = data;
                vm.energy = data[0].CurrentEnergy;

                angular.forEach(vm.elements, function (element) {
                    element.Location = JSON.parse(element.Location);
                });
            });
        });
    });

    //Combine Elements
    $scope.$on("UNS-ELM-DROPPED", function (event, element) {
        intersectService.getIntersectingElements(element, vm.elements).then(function (intersecting) {
            console.log(element.Name + " intersects with " + intersecting[0].Name);

            elementService.combineElements(element, intersecting[0]).then(function (combinedElements) {
                combinedElements[0].Location = element.Location;
                combinedElements[1].Location = intersecting[0].Location;
                combinedElements[0].CeId = element.CeId;
                combinedElements[1].CeId = intersecting[0].CeId;

                vm.elements.splice(vm.elements.indexOf(element), 1);
                vm.elements.splice(vm.elements.indexOf(intersecting[0]), 1);

                vm.elements.push(combinedElements[0]);
                vm.elements.push(combinedElements[1]);

                elementService.updateCurrentElement(combinedElements[0]);
                elementService.updateCurrentElement(combinedElements[1]);

                vm.energy -= combinedElements[0].EnergyUsage;
            }, function (err) {
                console.log("Well shit! That's not a valid combination.");
            })
        });
    });

    //Split elements
    $scope.$on("UNS-ELM-LONGTOUCH", function (event, element) {
        console.log("splitting: " + element.Name);
        elementService.splitElement(element).then(function (data) {
            data.Location = element.Location;
            data.CeId = element.CeId;

            vm.elements.splice(vm.elements.indexOf(element), 1);
            vm.elements.push(data);

            elementService.updateCurrentElement(data);

            vm.energy -= data.EnergyUsage / 2;
        }, function (err) {
            console.log("Well shit! That's not a splittable element.");
        });
    });
}

controllersModule.controller('alchemyTableCtrl', alchemyTableCtrl);
