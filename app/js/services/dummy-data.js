/**
 * Created by elias on 19.03.2015.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('dummyDataService', function ($q, $timeout) {

    var service = {};


    service.gettingData = function () {
            var deferred = $q.defer();
            var dummyData = {
                elements: [
                    {'typeId': '1', 'name': 'Waterelement'},
                    {'typeId': '2', 'name': 'Fireelement'},
                    {'typeId': '3', 'name': 'Airelement', parents: [{'typeId': 1}, {'typeId': 2}]}
                ]
            };
        $timeout(function () {
          deferred.resolve(dummyData);
        });

        return deferred.promise;
    };


    return service;
});

