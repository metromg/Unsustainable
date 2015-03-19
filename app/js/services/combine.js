/**
 * Created by elias on 19.03.2015.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('combineService', function ($q, $timeout, dummyDataService) {

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
                    deferred.resolve(combinations[0]);
                } else {
                    deferred.reject();
                }
            });
        });


        return deferred.promise;
    };


    return service;
});

