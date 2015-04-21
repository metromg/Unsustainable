'use strict';

var angular = require('angular');


module.exports = angular.module('app.services', [])
    .constant("AppSettings",require('../constants'));

// Define the list of services here
require('./intersect-service');
require('./element-service');
require('./db/dbpopulate-service');
require('./db/sqlite-service');
require('./data-service');
require('./recipe-service');