'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('dataService', function ($q, $timeout,sqliteService) {
    var service = {};

   service.getElements = function () {
        sqliteService.query().then(function(data){
            
        }, function (error) {

        });
   };

    return service;
});

