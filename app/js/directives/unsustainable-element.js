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
        touchDuration: '=',
        touchDurationUntilShake: '='
    };

    directive.link = function (scope, element, attributes) {
        scope.elementData.position = scope.elementData.position || {'x': 100, 'y': 100};
        scope.elementClass = "";

        var mouseDown = false;
        var timerUntilShake;
        var timer;
        var touchDuration = scope.touchDuration || 1200;
        var touchDurationUntilShake = scope.touchDurationUntilShake || 300;

        element.bind("touchstart", onTouchStart);
        element.bind("mousedown", onTouchStart);

        angular.element(document.body).bind("touchmove", onTouchMove);
        angular.element(document.body).bind("mousemove", onMouseMove);

        angular.element(document.body).bind("touchend", onTouchEnd);
        angular.element(document.body).bind("mouseup", onTouchEnd);

        scope.getPositionX = function () {
            return scope.elementData.position.x - element[0].clientWidth / 2;
        };

        scope.getPositionY = function () {
            return scope.elementData.position.y - element[0].clientHeight / 2;
        };

        function onTouchStart(e) {
            if (mouseDown) {
                return;
            }

            console.log("Touchstart");
            mouseDown = true;
            timerUntilShake = setTimeout(startLongTouch,touchDurationUntilShake);
        }

        function startLongTouch() {
            scope.$apply(function () {
                scope.elementClass = "shake shake-horizontal shake-constant";
            });

            timer = setTimeout(onLongTouch, touchDuration);
        }

        function cancelLongTouch() {
            scope.$apply(function () {
                scope.elementClass = "";
            });

            if (timer) {
                clearTimeout(timer);
            }

            if (timerUntilShake) {
                clearTimeout(timerUntilShake);
            }
        }

        function onLongTouch() {
            if (!mouseDown) {
                return;
            }

            cancelLongTouch();
            mouseDown = false;
            scope.$emit("UNS-ELM-LONGTOUCH", scope.elementData);
        }

        function onTouchEnd(e) {
            if (!mouseDown) {
                return;
            }

            console.log("Touchend");
            mouseDown = false;
            cancelLongTouch();
            scope.$emit("UNS-ELM-DROPPED", scope.elementData);
        }


        function onMouseMove(e) {
            if (!mouseDown) return;
            cancelLongTouch();
            scope.$apply(function () {
                scope.elementData.position.x = e.clientX;
                scope.elementData.position.y = e.clientY;
            });
        }

        function onTouchMove(e) {
            if (!mouseDown) return;
            if (e.touches.length > 1) return;

            cancelLongTouch();
            scope.$apply(function () {
                scope.elementData.position.x = e.touches[0].clientX;
                scope.elementData.position.y = e.touches[0].clientY;
            });
        }
    };

    return directive;
}

directivesModule.directive('unsustainableElement', unsustainableElement);

