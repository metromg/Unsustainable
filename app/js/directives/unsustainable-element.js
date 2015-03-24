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
        scope.elementData.Location = scope.elementData.Location || {'x': 100, 'y': 100};
        scope.elementClass = "";

        var mouseDown = false;
        var timerUntilShake;
        var timer;
        var touchDuration = scope.touchDuration || 1200;
        var touchDurationUntilShake = scope.touchDurationUntilShake || 300;

        element.bind("touchstart", onTouchStart);
        element.bind("mousedown", onTouchStart);

        var bounds = document.getElementById("uns-alchemy-table");

        angular.element(bounds).bind("touchmove", onTouchMove);
        angular.element(bounds).bind("mousemove", onMouseMove);

        angular.element(bounds).bind("touchend", onTouchEnd);
        angular.element(bounds).bind("mouseup", onTouchEnd);

        scope.getPositionX = function () {
            return scope.elementData.Location.x - element[0].clientWidth / 2;
        };

        scope.getPositionY = function () {
            return scope.elementData.Location.y - element[0].clientHeight / 2;
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
                scope.elementData.Location.x = e.clientX;
                scope.elementData.Location.y = e.clientY;
                resetPositionBounds();
            });
        }

        function onTouchMove(e) {
            if (!mouseDown) return;
            if (e.touches.length > 1) return;

            cancelLongTouch();
            scope.$apply(function () {
                scope.elementData.Location.x = e.touches[0].clientX;
                scope.elementData.Location.y = e.touches[0].clientY;
                resetPositionBounds();
            });
        }

        function resetPositionBounds() {
            // Top
            var topBound = document.body.clientHeight - bounds.clientHeight;
            if (scope.getPositionY() < topBound) {
                scope.elementData.Location.y = topBound + element[0].clientHeight / 2;
            }

            // Bottom
            var bottomBound = document.body.clientHeight;
            if (scope.getPositionY() + element[0].clientHeight > bottomBound) {
                scope.elementData.Location.y = bottomBound - element[0].clientHeight / 2;
            }

            // Left
            var leftBound = document.body.clientWidth - bounds.clientWidth;
            if (scope.getPositionX() < 0) {
                scope.elementData.Location.x = leftBound + element[0].clientWidth / 2;
            }

            // Right
            var rightBound = document.body.clientWidth;
            if (scope.getPositionX() + element[0].clientWidth > rightBound) {
                scope.elementData.Location.x = rightBound - element[0].clientWidth / 2;
            }
        }
    };

    return directive;
}

directivesModule.directive('unsustainableElement', unsustainableElement);

