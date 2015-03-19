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
        elementData: '=',
        touchDuration: '='
    };
    directive.link = function (scope, element, attributes) {
        var mouseDown = false;
        var timer;
        var touchDuration = scope.touchDuration || 1200;

        element.bind("touchstart", onTouchStart);
        element.bind("mousedown", onTouchStart);

        angular.element(document.body).bind("touchmove", onTouchMove);
        angular.element(document.body).bind("mousemove", onMouseMove);

        element.bind("touchend", onTouchEnd);
        element.bind("mouseup", onTouchEnd);


        function onTouchStart(e) {
            mouseDown = true;
            //TODO make splitting possible
            timer = setTimeout(onLongTouch, touchDuration);
        }

        function onTouchEnd(e) {
            mouseDown = false;
            if (timer)
                clearTimeout(timer);
            scope.$emit("UNS-ELM-DROPPED",scope.elementData);

        }

        function onLongTouch () {
            scope.$emit("UNS-ELM-LONGTOUCH",scope.elementData);
        }

        function onMouseMove(e) {
            if (!mouseDown) return;
            scope.$apply(function () {
                scope.elementData.position.x = e.clientX - element[0].clientWidth / 2;
                scope.elementData.position.y = e.clientY - element[0].clientHeight / 2;
            });
        }

        function onTouchMove(e) {
            if (!mouseDown) return;
            scope.$apply(function () {
                scope.elementData.position.x = e.touches[0].clientX - element[0].clientWidth / 2;
                scope.elementData.position.y = e.touches[0].clientY - element[0].clientWidth / 2;
            });
        }
    };
    return directive;


}

directivesModule.directive('unsustainableElement', unsustainableElement);

