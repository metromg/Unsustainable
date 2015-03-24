/**
 * Created by elias on 19.03.2015.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('elementService', function ($q, $timeout, dummyDataService) {
    var service = {};

    service.combineElements = function (element1, element2) {
        var deferred = $q.defer();
        dummyDataService.gettingData().then(function (data) {
            $timeout(function () {
                var combinations = data.elements.filter(function (e) {
                    //TODO: Loop through all recipes
                    return e.recipes &&
                        e.recipes.length >= 1 &&
                        ((e.recipes[0].element1.typeId == element1.typeId && e.recipes[0].element2.typeId == element2.typeId)
                        || (e.recipes[0].element2.typeId == element1.typeId && e.recipes[0].element1.typeId == element2.typeId));
                });

                if (combinations.length >= 1) {
                    deferred.resolve([combinations[0], angular.copy(combinations[0])]);
                } else {
                    deferred.reject();
                }
            });
        });

        return deferred.promise;
    };

    service.splitElement = function (element) {
        var deferred = $q.defer();

        dummyDataService.gettingData().then(function (data) {
            $timeout(function () {
                element = data.elements.filter(function (el) {
                    return el.typeId == element.typeId;
                })[0];
                if (element.recipes && element.recipes.length >= 1) {
                    var elementNumber = Math.round(Math.random());

                    //TODO: Loop through all recipes
                    var result = element.recipes[0].element1;
                    if (elementNumber == 1) {
                        result = element.recipes[0].element2;
                    }

                    console.log(result);
                    deferred.resolve({splittedElement: result, energy: element.recipes[0].energy / 2});
                } else {
                    deferred.reject();
                }
            });
        });

        return deferred.promise;
    };

    service.gettingAllElements = function () {
        return dummyDataService.gettingData();
    };

    return service;
});

