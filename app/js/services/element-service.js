/**
 * Created by elias on 19.03.2015.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('elementService', function ($q, $timeout, dataService, $log) {
    var service = {};

    service.combineElements = function (element1, element2) {
        var deferred = $q.defer();
        dataService.getCombinedElement(element1, element2).then(function (data) {
            if (data.length != 1) {
                deferred.reject();
            }
            dataService.unlockRecipe(data[0].RecipeId);
            deferred.resolve([data[0], angular.copy(data[0])]);
        }, deferred.reject);

        return deferred.promise;
    };

    service.splitElement = function (element) {
        var deferred = $q.defer();




        dataService.isBaseElement(element).then(function (isBaseElement) {
            var promise = null;
            if (isBaseElement) {
                promise = dataService.getBaseElementsExcept(element.Id);
            } else {
                promise = dataService.getElementParts(element);
            }

            promise.then(function (data) {
                if (data.length == 0) {
                    deferred.reject();
                }

                var min = 0;
                var max = data.length - 1;

                // Random number between min and max
                var random = Math.floor(Math.random()*(max-min+1)+min);

                deferred.resolve(data[random]);
                $log.log(data);
            }, deferred.reject);
        });

        return deferred.promise;
    };

    service.getCurrentElements = function () {
        return dataService.getCurrentElements();
    };

    service.getUnlockedElements = function () {
        //TODO: Change to get unlocked Elements
        return dataService.getAllElements();
    };

    service.getBaseElements= function () {
        return dataService.getBaseElements();
    };

    service.updateCurrentElement = function (element) {
        return dataService.updateCurrentElement(element);
    };

    service.restoreBaseElements = function () {
        return dataService.restoreBaseElements();
    };

    service.getElementParts = function (element) {
        return dataService.getElementParts(element);
    };

    return service;
});

