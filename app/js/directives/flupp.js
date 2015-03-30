'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function flupp(dataService) {
    var directive = {};
    directive.templateUrl = "templates/flupp.html";
    directive.replace = true;
    directive.restrict = 'E';
    directive.scope = {
        elementData: '='
    };

    directive.link = function (scope, element, attributes) {
        scope.show = false;
        scope.elementParts = [];

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

            return scope.elementData.Location.x + (shortTabData.width / 2) + 15;
        };

        scope.getPositionY = function () {
            if (shortTabData == null) {
                return;
            }

            return scope.elementData.Location.y - (shortTabData.width / 2);
        };

        if (!!window.cordova) {
            angular.element(document.body).bind("touchstart", onTouchStart);
        } else {
            angular.element(document.body).bind("mousedown", onTouchStart);
        }

        function onTouchStart() {
            scope.$apply(function () {
                if (scope.show) {
                    scope.show = false;
                }
            });
        }

        scope.$watch('elementData', function (curr) {
            if (curr == null) {
                return;
            }

            console.log("Query new elementParts");
            dataService.getElementParts(curr).then(function (data) {
                scope.elementParts = data;
            });
        });
    };

    return directive;
}

directivesModule.directive('flupp', flupp);

