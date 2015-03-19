/**
 * Created by elias on 17.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function alchemyTableCtrl($scope,intersectService,combineService) {

    // ViewModel
    var vm = this;
    vm.elements = [
        {'typeId':'1','name':'Waterelement','position':{x:100,y:100}},
        {'typeId':'2','name':'Fireelement','position':{x:200,y:200}},
        {'typeId':'3','name':'Airelement','position':{x:200,y:300}}
    ];
    $scope.$on("UNS-ELM-DROPPED", function (event,element) {
        intersectService.getIntersectingElements(element,vm.elements).then(function (intersecting) {
            console.log(element.name +" intersects with " +intersecting[0].name);

            combineService.combineElements(element,intersecting[0]).then(function (combinedElement) {
                console.log(combinedElement);
            }, function (err) {
                console.log("Well shit!");
            })

        });

    });
    $scope.$on("UNS-ELM-DROPPED", function (event,element) {
        console.log("splitting: "+element.name);

    });

}

controllersModule.controller('alchemyTableCtrl', alchemyTableCtrl);
