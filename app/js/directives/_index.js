'use strict';

var angular = require('angular');

module.exports = angular.module('app.directives', []);

// Define the list of directives here
require('./unsustainable-element.js');
require('./unsustainable-energy-bar.js');
require('./flupp.js');
require('./achievement-overlay');