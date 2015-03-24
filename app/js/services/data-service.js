'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('dataService', function ($q, $timeout, sqliteService, $log) {
    var service = {};

    service.getCurrentElements = function () {

        var parameters = [1]; //Player Id 1
        var query = "SELECT * FROM CurrentElement AS ce " +
            "JOIN Player AS p ON p.Id = ce.PlayerId " +
            "JOIN Element AS e ON e.Id = ce.ElementId " +
            "WHERE p.Id = 1" +
            ";";
        $log.log(query, parameters);
        $log.log("gettin current elements!");
        return sqliteService.query(query, parameters);

    };

    service.getAllElements = function () {

        var query = "SELECT * FROM Elements ";

        return sqliteService.query(query);
    };

    service.getCombinedElement = function (element1, element2) {
        var parameters = [element1.Id, element2.Id, element1.Id, element2.Id];
        var query = "SELECT * FROM Element AS e " +
            "JOIN Recipe AS r ON r.ResultId = e.Id " +
            "WHERE (r.Element1Id = ? AND r.Element2Id = ?) OR (r.Element2Id = ? AND r.Element1Id = ?)";

        return sqliteService.query(query, parameters);
    };

    service.getElementParts = function (element) {
        var parameters = [element.Id];
        var query = "SELECT * FROM Element AS e " +
            "JOIN Recipe AS r ON r.ResultId = e.Id " +
            "WHERE r.ResultId = ? ";

        return sqliteService.query(query, parameters);
    };

    service.getBaseElements = function () {
        var parameters = [];
        var query = "SELECT * FROM Element AS e " +
            "LEFT JOIN Recipe AS r ON r.ResultId = e.Id " +
            "WHERE r.ResultId = null ";

        return sqliteService.query(query, parameters);
    };

    return service;
});

