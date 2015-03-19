/**
 * Created by elias on 17.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function alchemyTableCtrl($scope,intersectService) {

    // ViewModel
    var vm = this;
    vm.elements = [
        {'typeId':'1','name':'Waterelement','position':{x:100,y:100}},
        {'typeId':'2','name':'Fireelement','position':{x:200,y:200}},
        {'typeId':'3','name':'Airelement','position':{x:200,y:300}}
    ];
    $scope.$on("UNS-ELM-DROPPED", function (event,data) {
        intersectService.getIntersectingElements(data,vm.elements).then(function (intersecting) {
            console.log(intersecting);
        });

    });

}

controllersModule.controller('alchemyTableCtrl', alchemyTableCtrl);
