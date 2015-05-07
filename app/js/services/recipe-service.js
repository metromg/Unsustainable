'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('recipeService', function ($q, $timeout, dataService, $log) {
    var service = {};

    service.getUnlockedRecipes = function () {
       return dataService.getUnlockedRecipes();
    };

    return service;
});

