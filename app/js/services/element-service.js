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
            $log.log(data);
            //TODO clone elemtent
            deferred.resolve()
        }, deferred.reject);

        return deferred.promise;
    };

    service.splitElement = function (element) {
        var deferred = $q.defer();
        dataService.getElementParts(element).then(function (data) {
            //TODO Select element to split
            //deferred.resolve({splittedElement: result, energy: element.recipes[0].energy / 2});
            $log.log(data);
        }, deferred.reject);

        return deferred.promise;
    };

    service.getCurrentElements = function () {
        return dataService.getCurrentElements();
    };

    return service;
});

