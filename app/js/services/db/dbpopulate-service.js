/**
 * Created by Michael on 24.03.15.
 */
'use strict';

var servicesModule = require('./../_index.js');

/**
 * @ngInject
 */
servicesModule.service('dbPopulateService', function ($http, $q, sqliteService) {
    var service = {};

    service.constructModel = function () {
        var sql = require('./sql/construct-model.js').query();
        var queries = sqlToQueries(sql);

        return sqliteService.chain(queries);
    };

    service.generateMasterData = function () {
        var deferred = $q.defer();

        // TODO: Is it enough to check only for elements containing data?
        sqliteService.query("SELECT COUNT(*) AS count FROM Element", []).then(function (data) {
            if (!(data[0].count > 0)) {
                var sql = require('./sql/generate-masterdata.js').query();
                var queries = sqlToQueries(sql);

                sqliteService.chain(queries).then(function () {
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    function sqlToQueries(sql) {
        var queries = sql.split(";");
        queries.splice(queries.length - 1, 1);

        return queries;
    }

    return service;
});
