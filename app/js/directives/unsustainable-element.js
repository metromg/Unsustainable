'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function unsustainableElement () {
    var directive = {};
    directive.templateUrl = "templates/unsustainable-element.html";
    directive.replace = true;
    directive.restrict = 'E';
    directive.scope = {
        elementName: '=',
        position: '='
    };
    directive.link = function (scope, element, attributes) {
    };
    return directive;

};

directivesModule.directive('unsustainableElement', unsustainableElement);

