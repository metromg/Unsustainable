'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('dbPopulateService', function ($q, $timeout) {
    var service = {};

    service.populateDatabase = function () {
        var deferred = $q.defer();
        var elements = [
            {'typeId': 1, 'name': 'Water', 'image': 'water.png'},
            {'typeId': 2, 'name': 'Fire', 'image': 'fire.png'},
            {'typeId': 3, 'name': 'Steam', 'image': 'steam.png'}
            ];
        var recipes = [
            {'element1Id':1,'element2Id':2,'resultId':3,energy:50}
        ];

        return deferred.promise;
    };

    return service;
});

/**
 * Created by elias on 24.03.15.
 */
