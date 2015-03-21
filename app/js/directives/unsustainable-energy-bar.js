'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function unsustainableEnergyBar() {
    var directive = {};
    directive.templateUrl = "templates/unsustainable-energy-bar.html";
    directive.replace = true;
    directive.restrict = 'E';
    directive.scope = {
        energy: '='
    };

    directive.link = function (scope, element, attributes) {
        scope.energyClass = "";

        scope.$watch('energy', function () {
            scope.energyClass = "shake shake-constant";
            setTimeout(function () {
                scope.$apply(function () {
                    scope.energyClass = "";
                });
            }, 200);
        });
    };

    return directive;
}

directivesModule.directive('unsustainableEnergyBar', unsustainableEnergyBar);

