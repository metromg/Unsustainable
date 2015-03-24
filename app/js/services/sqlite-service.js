'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('sqliteService', function ($q, $timeout, $window, AppSettings) {
    var service = {};
    var dbProvider = $window.sqlitePlugin || $window;
    var db = dbProvider.openDatabase({name: AppSettings.dbName, createFromLocation: 1, location: 1});

    service.query = function (sql, preparedValues) {
        var deferred = $q.defer();
        db.executeSql(sql, preparedValues, function (db, res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    };

    return service;
});

