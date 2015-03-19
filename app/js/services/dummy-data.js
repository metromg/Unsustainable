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
                    {'typeId': '1', 'name': 'Waterelement','position':{'x':100,'y':100}},
                    {'typeId': '2', 'name': 'Fireelement','position':{'x':200,'y':100}},
                    {'typeId': '3', 'name': 'Airelement','position':{'x':300,'y':100}, recipes: [
                        {
                            'element1': {'typeId': '1', 'name': 'Waterelement'},
                            'element2': {'typeId': '2', 'name': 'Fireelement'},
                            'energy': 50
                        }
                    ]}
                ],
                energy: 200
            };
        $timeout(function () {
          deferred.resolve(dummyData);
        });

        return deferred.promise;
    };

    return service;
});

