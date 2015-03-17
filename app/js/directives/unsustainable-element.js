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
        angular.element(element).attr("draggable", "true");
        var mouseDown = false;

        element.bind("touchstart", onTouchStart);
        element.bind("mousedown", onTouchStart);

        angular.element(document.body).bind("touchmove", onTouchMove);
        angular.element(document.body).bind("mousemove", onTouchMove);

        angular.element(document.body).bind("touchend", onTouchEnd);
        angular.element(document.body).bind("mouseup", onTouchEnd);

        function onTouchStart(e) {
            console.log('dragstart');
            mouseDown = true;
        }

        function onTouchEnd(e) {
            console.log('dragend');
            mouseDown = false;
        }

        function onTouchMove(e) {
            if (!mouseDown) return;

            scope.position.x = e.clientX;
            scope.position.y = e.clientY;
        }
    };
    return directive;


}

directivesModule.directive('unsustainableElement', unsustainableElement);

