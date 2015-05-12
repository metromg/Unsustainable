/**
 * Created by elias on 12.05.15.
 */
'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function achievementOverlay($timeout) {
    var directive = {};
    directive.templateUrl = "templates/achievement-overlay.html";
    directive.replace = true;
    directive.restrict = 'E';
    directive.scope = {
        achievements: '='
    };

    directive.link = function (scope, element, attributes) {
        scope.showOverlay = false;
        scope.$watch('achievements', function (achievements) {
            scope.showOverlay = true;
            $timeout(function () {
                scope.showOverlay = false;
            }, 2 * 1000)
        });
    };

    return directive;
}

directivesModule.directive('achievementOverlay', achievementOverlay);

