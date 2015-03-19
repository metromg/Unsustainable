/**
 * Created by elias on 19.03.2015.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('elementService', function ($q, $timeout, dummyDataService, unsustainableUtil) {

    var service = {};

    service.combineElements = function (element1, element2) {
        var deferred = $q.defer();
        dummyDataService.gettingData().then(function (data) {
            $timeout(function () {
                var combinations = data.elements.filter(function (e) {
                    return e.parents &&
                        e.parents.length > 1 &&
                        ((e.parents[0].typeId == element1.typeId && e.parents[1].typeId == element2.typeId)
                        || (e.parents[1].typeId == element1.typeId && e.parents[0].typeId == element2.typeId));
                });
                if (combinations.length >= 1) {

                    deferred.resolve([combinations[0], unsustainableUtil.clone(combinations[0])]);
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
                if (element.parents && element.parents.length == 2) {
                    var index =Math.round(Math.random());
                    console.log(element.parents[index])
                    deferred.resolve(element.parents[index]);
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

