/**
 * Created by elias on 17.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function alchemyTableCtrl($scope, intersectService, elementService) {
    // ViewModel
    var vm = this;
    vm.energyClass = "";

    elementService.gettingAllElements().then(function (data) {
        vm.elements = data.elements;
        vm.energy = data.energy;
    });

    //Combine Elements
    $scope.$on("UNS-ELM-DROPPED", function (event, element) {
        intersectService.getIntersectingElements(element, vm.elements).then(function (intersecting) {
            console.log(element.name + " intersects with " + intersecting[0].name);

            elementService.combineElements(element, intersecting[0]).then(function (combinedElements) {
                combinedElements[0].position = element.position;
                combinedElements[1].position = intersecting[0].position;

                vm.elements.splice(vm.elements.indexOf(element), 1);
                vm.elements.splice(vm.elements.indexOf(intersecting[0]), 1);

                vm.elements.push(combinedElements[0]);
                vm.elements.push(combinedElements[1]);

                vm.energy -= combinedElements[0].recipes[0].energy;
            }, function (err) {
                console.log("Well shit! That's not a valid combination.");
            })
        });
    });

    //Split elements
    $scope.$on("UNS-ELM-LONGTOUCH", function (event, element) {
        console.log("splitting: " + element.name);
        elementService.splitElement(element).then(function (data) {
            data.splittedElement.position = element.position;
            vm.elements.splice(vm.elements.indexOf(element), 1);
            vm.elements.push(data.splittedElement);

            vm.energy -= data.energy;
        }, function (err) {
            console.log("Well shit! That's not a splittable element.");
        });
    });

    $scope.$watchCollection('vm.energy', function () {
        vm.energyClass = "shake shake-constant";
        setTimeout(function () {
            $scope.$apply(function () {
                vm.energyClass = "";
            });
        }, 200);
    });
}

controllersModule.controller('alchemyTableCtrl', alchemyTableCtrl);
