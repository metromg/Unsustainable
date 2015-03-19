/**
 * Created by elias on 17.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function alchemyTableCtrl($scope,intersectService,elementService) {

    // ViewModel
    var vm = this;
    elementService.gettingAllElements().then(function (data) {
        vm.elements = data.elements;
    });

    $scope.$on("UNS-ELM-DROPPED", function (event,element) {
        intersectService.getIntersectingElements(element,vm.elements).then(function (intersecting) {
            console.log(element.name +" intersects with " +intersecting[0].name);

            elementService.combineElements(element,intersecting[0]).then(function (combinedElement) {
                console.log(combinedElement);
                combinedElement.position = element.position;

                function Clone(){};
                Clone.prototype=combinedElement;
                var second  = new Clone();
                second.position = intersecting[0].position;
                vm.elements.splice(vm.elements.indexOf(element),1);
                vm.elements.splice(vm.elements.indexOf(intersecting[0]),1);

                vm.elements.push(second);
                vm.elements.push(combinedElement);

            }, function (err) {
                console.log("Well shit! That's not a valid combination.");
            })

        });

    });
    $scope.$on("UNS-ELM-LONGTOUCH", function (event,element) {
        console.log("splitting: "+element.name);

    });

}

controllersModule.controller('alchemyTableCtrl', alchemyTableCtrl);
