'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function unsustainableElement() {
    var directive = {};
    directive.templateUrl = "templates/unsustainable-element.html";
    directive.replace = true;
    directive.restrict = 'E';
    directive.scope = {
        elementName: '=',
        position: '='
    };
    directive.link = function (scope, element, attributes) {
        var mouseDown = false;

        element.bind("touchstart", onTouchStart);
        element.bind("mousedown", onTouchStart);

        angular.element(document.body).bind("touchmove", onTouchMove);
        angular.element(document.body).bind("mousemove", onMouseMove);

        element.bind("touchend", onTouchEnd);
        element.bind("mouseup", onTouchEnd);

        function onTouchStart(e) {
            console.log('dragstart');
            mouseDown = true;
        }

        function onTouchEnd(e) {
            console.log('dragend');
            mouseDown = false;
        }

        function onMouseMove(e) {
            if (!mouseDown) return;

            scope.$apply(function () {
                scope.position.x = e.clientX - element[0].clientWidth / 2;
                scope.position.y = e.clientY - element[0].clientHeight / 2;
            });
        }

        function onTouchMove(e) {
            if (!mouseDown) return;

            scope.$apply(function () {
                scope.position.x = e.touches[0].clientX - element[0].clientWidth / 2;
                scope.position.y = e.touches[0].clientY - element[0].clientWidth / 2;
            });
        }
    };
    return directive;


}

directivesModule.directive('unsustainableElement', unsustainableElement);

