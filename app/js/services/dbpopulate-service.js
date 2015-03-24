'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('dbPopulateService', function ($q, $timeout, sqliteService, $log) {
    var service = {};

    service.createTables = function () {
        var query = require('./createquery.js').query();
        $log.log(query);
        //sqliteService.query(query, []);
        query = require('./insertquery.js').query();
        //sqliteService.query(query, []);

        //sqliteService.query("INSERT INTO Element(Name,Description) VALUES ('Testelement2','bla')", []).then(function () {
        //    sqliteService.query("SELECT * FROM Element", []).then($log.log, $log.error);
        //});


    };

    service.populateDatabase = function () {
        var deferred = $q.defer();
        var elements = [
            {'typeId': 1, 'name': 'Water', 'image': 'water.png'},
            {'typeId': 2, 'name': 'Fire', 'image': 'fire.png'},
            {'typeId': 3, 'name': 'Steam', 'image': 'steam.png'}
        ];
        var recipes = [
            {'element1Id': 1, 'element2Id': 2, 'resultId': 3, energy: 50}
        ];

        return deferred.promise;
    };

    return service;
});

