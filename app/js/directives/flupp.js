'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function flupp($state, dataService) {
    var directive = {};
    directive.templateUrl = "templates/flupp.html";
    directive.replace = true;
    directive.restrict = 'E';
    directive.scope = {
        elementData: '='
    };

    directive.link = function (scope, element, attributes) {
        scope.show = false;
        var shortTabData = null;

        scope.$root.$on("UNS-ELM-SHORT-TAB", function (event, data) {
            if (scope.show || data.elementData.$$hashKey != scope.elementData.$$hashKey) {
                return;
            }

            scope.show = true;
            shortTabData = data;
        });

        scope.getPositionX = function () {
            if (shortTabData == null) {
                return;
            }

            return scope.elementData.Location.x + (shortTabData.width / 2) + 10;
        };

        scope.getPositionY = function () {
            if (shortTabData == null) {
                return;
            }

            return scope.elementData.Location.y - (shortTabData.width / 2);
        };
    };

    return directive;
}

directivesModule.directive('flupp', flupp);

