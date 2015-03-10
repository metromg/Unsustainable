/**
 * Created by elias on 10.03.15.
 */
define(['angular'], function (ng) {
    'use strict';
    var mdl = ng.module('unsustainableDirectives', []);

    mdl.directive('unsustainableElement', [ function () {
        var directive = {};
        directive.template = "<div>I'm a {{elementName}}</div>";

        directive.replace = true;
        directive.restrict = 'E';
        directive.scope = {
            elementName:'='
        };
        directive.link = function (scope, element, attributes) {

        };

        return directive;
    }]);


    return mdl;
});
