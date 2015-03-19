/**
 * Created by elias on 19.03.2015.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('unsustainableUtil', function ($q, $timeout) {

    var service = {};
    service.clone = function(element){

        return JSON.parse(JSON.stringify(element));

    };

    return service;
});

