'use strict';

var angular = require('angular');


module.exports = angular.module('app.services', [])
    .constant("AppSettings",require('../constants'));

// Define the list of services here
require('./intersect-service');
require('./dummy-data-service');
require('./element-service');
require('./sqlite-service')