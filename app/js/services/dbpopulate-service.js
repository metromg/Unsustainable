/**
 * Created by Michael on 24.03.15.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('dbPopulateService', function ($q, sqliteService) {
    var service = {};

    service.createTables = function () {
        var queries = [];
        // Element Table
        queries.push("\
            CREATE TABLE IF NOT EXISTS Element (\
                Id INTEGER PRIMARY KEY,\
                Name TEXT NOT NULL,\
                Description TEXT NOT NULL,\
                Image TEXT NOT NULL\
            );\
        ");

        // Recipe Table
        queries.push("\
            CREATE TABLE IF NOT EXISTS Recipe (\
                Id INTEGER PRIMARY KEY,\
                Element1Id INTEGER NOT NULL,\
                Element2Id INTEGER NOT NULL,\
                ResultId INTEGER NOT NULL,\
                EnergyUsage INTEGER NOT NULL,\
                CONSTRAINT fk_Recipe_Element\
                    FOREIGN KEY (Element1Id)\
                    REFERENCES Element (Id)\
                CONSTRAINT fk_Recipe_Element1\
                    FOREIGN KEY (Element2Id)\
                    REFERENCES Element (Id)\
                CONSTRAINT fk_Recipe_Element2\
                    FOREIGN KEY (ResultId)\
                    REFERENCES Element (Id)\
            );\
        ");

        // Achievement Table
        queries.push("\
            CREATE TABLE IF NOT EXISTS Achievement (\
                Id INTEGER PRIMARY KEY,\
                Name TEXT NOT NULL,\
                Description TEXT NOT NULL,\
                Image TEXT NOT NULL,\
                Query TEXT NOT NULL\
            );\
        ");

        // Player Table
        queries.push("\
            CREATE TABLE IF NOT EXISTS Player (\
                Id INTEGER PRIMARY KEY,\
                CurrentEnergy INTEGER NOT NULL\
            );\
        ");

        // CurrentElement
        queries.push("\
            CREATE TABLE IF NOT EXISTS CurrentElement (\
                Id INTEGER PRIMARY KEY,\
                PlayerId INTEGER NOT NULL,\
                ElementId INTEGER NOT NULL,\
                Location TEXT NOT NULL,\
                CONSTRAINT fk_CurrentElement_Player1\
                    FOREIGN KEY (PlayerId)\
                    REFERENCES Player (Id),\
                CONSTRAINT fk_CurrentElement_Element1\
                    FOREIGN KEY (ElementId)\
                    REFERENCES Element (Id)\
            );\
        ");

        // UnlockedAchievement
        queries.push("\
            CREATE TABLE IF NOT EXISTS UnlockedAchievement (\
                Id INTEGER PRIMARY KEY,\
                PlayerId INTEGER NOT NULL,\
                AchievementId INTEGER NOT NULL,\
                CONSTRAINT fk_UnlockedAchievement_Player1\
                    FOREIGN KEY (PlayerId)\
                    REFERENCES Player (Id),\
                CONSTRAINT fk_UnlockedAchievement_Achievement1\
                    FOREIGN KEY (AchievementId)\
                    REFERENCES Achievement (Id)\
            );\
        ");

        // UnlockedRecipe
        queries.push("\
            CREATE TABLE IF NOT EXISTS UnlockedRecipe (\
                Id INTEGER PRIMARY KEY,\
                PlayerId INTEGER NOT NULL,\
                RecipeId INTEGER NOT NULL,\
                CONSTRAINT fk_UnlockedRecipe_Player1\
                    FOREIGN KEY (PlayerId)\
                    REFERENCES Player (Id),\
                CONSTRAINT fk_UnlockedRecipe_Recipe1\
                    FOREIGN KEY (RecipeId)\
                    REFERENCES Recipe (Id)\
            );\
        ");

        return chain(queries);
    };

    service.populateDatabase = function () {
        var elements = [
            {'typeId': 1, 'name': 'Water', 'desc': '', 'image': 'water.png'},
            {'typeId': 2, 'name': 'Fire', 'desc': '', 'image': 'fire.png'},
            {'typeId': 3, 'name': 'Steam', 'desc': '', 'image': 'steam.png'}
        ];

        var recipes = [
            {'id': 1, 'element1Id': 1, 'element2Id': 2, 'resultId': 3, energy: 50}
        ];

        var player = {'id': 1, 'energy': 300};

        var currentElements = [
            {'id': 1, 'elementId': 1, 'playerId': 1, position: '{"x": 100, "y": 200}'},
            {'id': 2, 'elementId': 2, 'playerId': 1, position: '{"x": 200, "y": 200}'}
        ];

        // TODO: Is it enough to check only for elements containing data?
        sqliteService.query("SELECT COUNT(*) AS count FROM Element", []).then(function (data) {
            if (!(data[0].count > 0)) {
                // Data not populated, insert it
                var queries = [];

                // Elements
                angular.forEach(elements, function (element) {
                    queries.push("\
                        INSERT INTO Element\
                        (Id, Name, Description, Image)\
                        VALUES\
                        (\
                        " + element.typeId + ",\
                        '" + element.name + "',\
                        '" + element.desc + "',\
                        '" + element.image + "'\
                        );\
                    ");
                });

                // Recipes
                angular.forEach(recipes, function (recipe) {
                    queries.push("\
                        INSERT INTO Recipe\
                        (Id, Element1Id, Element2Id, ResultId, EnergyUsage)\
                        VALUES\
                        (\
                        " + recipe.id + ",\
                        " + recipe.element1Id + ",\
                        " + recipe.element2Id + ",\
                        " + recipe.resultId + ",\
                        " + recipe.energy + "\
                        );\
                    ");
                });

                // Player
                queries.push("\
                    INSERT INTO Player\
                    (Id, CurrentEnergy)\
                    VALUES\
                    (" + player.id + ", " + player.energy + ");\
                ");

                // Current Elements
                angular.forEach(currentElements, function (currentElement) {
                    queries.push("\
                        INSERT INTO CurrentElement\
                        (Id, PlayerId, ElementId, Location)\
                        VALUES\
                        (\
                        " + currentElement.id + ",\
                        " + currentElement.playerId + ",\
                        " + currentElement.elementId + ",\
                        '" + currentElement.position + "'\
                        );\
                    ");
                });

                return chain(queries);
            }
        });
    };

    function chain(queries) {
        var deferred = $q.defer();

        var promise = queries.reduce(function (previous, query) {
            return previous.then(function () {
                return sqliteService.query(query, []);
            });
        }, $q(function (resolve) { resolve()}));

        promise.then(function () {
            deferred.resolve();
        });

        return deferred.promise;
    }

    return service;
});