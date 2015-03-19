'use strict';

var angular = require('angular');

module.exports = angular.module('app.services', []);

// Define the list of services here
require('./intersect.js');
require('./dummy-data.js');
require('./combine.js');