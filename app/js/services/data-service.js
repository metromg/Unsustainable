'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('dataService', function ($q, $timeout, sqliteService, $log) {
    var service = {};

    service.getCurrentElements = function () {
        var query = "SELECT e.Id, e.Name, e.Description, e.Image, p.CurrentEnergy, ce.Location, ce.Id AS CeId FROM CurrentElement AS ce " +
            "JOIN Player AS p ON p.Id = ce.PlayerId " +
            "JOIN Element AS e ON e.Id = ce.ElementId " +
            "WHERE p.Id = 1" +
            ";";

        return sqliteService.query(query, []);
    };
    
    service.getAllElements = function () {
        var query = "SELECT * FROM Element ";
        return sqliteService.query(query);
    };

    service.getCombinedElement = function (element1, element2) {
        var parameters = [element1.Id, element2.Id, element1.Id, element2.Id];
        var query = "SELECT e.Id, e.Name, e.Description, e.Image, r.EnergyUsage,r.Id as RecipeId FROM Element AS e " +
            "JOIN Recipe AS r ON r.ResultId = e.Id " +
            "WHERE (r.Element1Id = ? AND r.Element2Id = ?) OR (r.Element2Id = ? AND r.Element1Id = ?)";

        return sqliteService.query(query, parameters);
    };

    service.getElementParts = function (element) {
        var parameters = [element.Id];
        var query = "SELECT e.Id, e.Name, e.Description, e.Image, r.EnergyUsage FROM Element AS e " +
            "JOIN Recipe AS r ON r.Element1Id = e.Id OR r.Element2Id = e.Id " +
            "WHERE r.ResultId = ?";

        return sqliteService.query(query, parameters);
    };

    service.getBaseElements = function () {
        var parameters = [];
        var query = "SELECT e.Id, e.Name, e.Description, e.Image, r.EnergyUsage FROM Element AS e " +
            "LEFT JOIN Recipe AS r ON r.ResultId = e.Id " +
            "WHERE r.ResultId IS NULL";

        return sqliteService.query(query, parameters);
    };

    service.getBaseElementsExcept = function (elementId) {
        var parameters = [elementId];
        var query = "SELECT e.Id, e.Name, e.Description, e.Image, r.EnergyUsage FROM Element AS e " +
            "LEFT JOIN Recipe AS r ON r.ResultId = e.Id " +
            "WHERE r.ResultId IS NULL AND e.Id != ?";

        return sqliteService.query(query, parameters);
    };

    service.isBaseElement = function (element) {
        var deferred = $q.defer();

        var parameters = [element.Id];
        var query = "SELECT COUNT(*) AS count FROM Element AS e \
            LEFT JOIN Recipe AS r ON r.ResultId = e.Id\
            WHERE r.ResultId IS NULL AND e.Id = ?\
        ";

        sqliteService.query(query, parameters).then(function (result) {
            deferred.resolve(result[0].count == 1);
        });

        return deferred.promise;
    };

    service.getBaseElements = function () {
        var parameters = [];
        var query = "SELECT e.Id,e.Name,e.Image,e.Description,1 as isBaseElement FROM Element AS e \
            LEFT JOIN Recipe AS r ON r.ResultId = e.Id\
            WHERE r.ResultId IS NULL\
        ";

        return sqliteService.query(query, parameters);
    };

    service.restoreBaseElements = function () {
        var deferred = $q.defer();

        service.getBaseElements().then(function (baseElements) {
            var queries = [];
            queries.push("DELETE FROM CurrentElement");

            var location = {x: 100, y: 200};
            angular.forEach(baseElements, function (element) {
                queries.push("INSERT INTO CurrentElement\
                    (PlayerId, ElementId, Location)\
                    VALUES\
                    (1, " + element.Id + ", '" + JSON.stringify(location) + "')\
                ");

                location.x = location.x + 100;
            });

            sqliteService.chain(queries).then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    service.updateCurrentElement = function (element) {
        var parameters = [element.Id, JSON.stringify(element.Location), element.CeId];
        var query = "UPDATE CurrentElement SET \
            ElementId = ?, Location = ?\
            WHERE Id = ?\
        ";

        return sqliteService.query(query, parameters);
    };

    service.updateCurrentEnergy = function (energy) {
        var parameters = [energy];
        var query = "UPDATE Player SET CurrentEnergy = ? WHERE Id = 1";

        return sqliteService.query(query, parameters);
    };

    service.getUnlockedRecipes = function () {
        var parameters = [];
        var query = "SELECT r.Id as RecipeId,r.Element1Id,r.Element2Id,r.ResultId as Id,r.EnergyUsage,e.Description,e.Name,e.Image FROM Recipe AS r \
        JOIN Element AS e ON e.Id = r.ResultId\
        JOIN UnlockedRecipe AS ur ON ur.RecipeId = r.Id\
        JOIN Player AS p ON p.Id = ur.PlayerId";

        return sqliteService.query(query, parameters);
    };

    service.unlockRecipe = function (recipeId) {
        var deferred = $q.defer();
        if (recipeId != null) {
            sqliteService.query("SELECT count(*) AS count FROM UnlockedRecipe WHERE RecipeId = ?", [recipeId]).then(function (data) {
                if (data[0].count >= 1) {
                    deferred.reject();
                    return;
                }

                var query = "INSERT INTO UnlockedRecipe(RecipeId,PlayerId) VALUES (?,?) ";
                console.log(recipeId);
                sqliteService.query(query, [recipeId, 1]).then(deferred.resolve
                    , deferred.reject);

            }, deferred.reject);
        }
        else
        {
            deferred.reject("Id cannot be null!");
        }

        return deferred.promise;
    };

    return service;
});

