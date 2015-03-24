'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('sqliteService', function ($q, $timeout, $window, AppSettings,$log) {
    var service = {};
    var db;
    if ($window.sqlitePlugin) {
        db = $window.sqlitePlugin.openDatabase(
            {
                name: AppSettings.dbName,
                createFromLocation: 1,
                location: 1,
                androidLockWorkaround: 1
            });
    }
    else {
        db = $window.openDatabase(AppSettings.dbName, '1.0', '', 2 * 1024 * 1024);
    }

    service.query = function (sql, preparedValues) {
        preparedValues = preparedValues || [];
        var deferred = $q.defer();
        db.transaction(function (tx) {
            tx.executeSql(sql, preparedValues, function (db, res) {
                    $log.log("SQLData",res);
                    deferred.resolve(res);
                }, function (err) {
                    $log.error("SQLError ",err);
                    deferred.reject(err);
                }
            );

        });

        return deferred.promise;
    };

    return service;
});

