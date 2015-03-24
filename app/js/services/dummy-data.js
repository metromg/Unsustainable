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
                    {'typeId': '1', 'name': 'Water', 'image': 'water.png', 'position':{'x':100,'y':200}},
                    {'typeId': '2', 'name': 'Fire', 'image': 'fire.png', 'position':{'x':200,'y':200}},
                    {'typeId': '3', 'name': 'Steam', 'image': 'steam.png', 'position':{'x':300,'y':200}, recipes: [
                        {
                            'element1': {'typeId': '1', 'name': 'Water', 'image': 'water.png'},
                            'element2': {'typeId': '2', 'name': 'Fire', 'image': 'fire.png'},
                            'energy': 50
                        }
                    ]}
                ],
                energy: 300
            };
        $timeout(function () {
          deferred.resolve(dummyData);
        });

        return deferred.promise;
    };

    return service;
});

