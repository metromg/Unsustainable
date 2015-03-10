/**
 * Created by elias on 10.03.15.
 */
define(['angular'], function (ng) {
    'use strict';
    var mdl = ng.module('unsustainableDirectives', []);

    mdl.directive('unsustainableElement', [ function () {
        var directive = {};
        directive.templateUrl = "directive-assets/unsustainable-element.html";

        directive.replace = true;
        directive.restrict = 'E';
        directive.scope = {
            elementName:'=',
            position : '='

        };
        directive.link = function (scope, element, attributes) {

        };

        return directive;
    }]);


    return mdl;
});
