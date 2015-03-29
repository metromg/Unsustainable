'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function unsustainableElement(elementService, intersectService) {
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
        var isLongTouch = false;
        var isMouseMoved = false;
        var timerUntilShake;
        var timer;
        var touchDuration = scope.touchDuration || 1200;
        var touchDurationUntilShake = scope.touchDurationUntilShake || 300;

        var bounds = document.getElementById("uns-alchemy-table");

        if (!!window.cordova) {
            element.bind("touchstart", onTouchStart);
            angular.element(bounds).bind("touchmove", onTouchMove);
            angular.element(bounds).bind("touchend", onTouchEnd);
        }
        else {
            element.bind("mousedown", onTouchStart);
            angular.element(bounds).bind("mousemove", onMouseMove);
            angular.element(bounds).bind("mouseup", onTouchEnd);
        }

        scope.getPositionX = function () {
            return scope.elementData.Location.x - element[0].clientWidth / 2;
        };

        scope.getPositionY = function () {
            return scope.elementData.Location.y - element[0].clientHeight / 2;
        };

        var startPosition = angular.copy(scope.elementData.Location);
        function onTouchStart(e) {
            if (mouseDown) {
                return;
            }

            console.log("Touchstart");
            mouseDown = true;
            startPosition = angular.copy(scope.elementData.Location);
            isMouseMoved = false;
            timerUntilShake = setTimeout(startLongTouch,touchDurationUntilShake);
        }

        function startLongTouch() {
            // If mouse was already moved before long touch starts
            if (isMouseMoved) {
                return;
            }

            console.log("Start long touch");
            scope.$apply(function () {
                scope.elementClass = "shake shake-horizontal shake-constant";
            });

            timer = setTimeout(onLongTouch, touchDuration);
            isLongTouch = true;
        }

        function cancelLongTouch() {
            console.log("Cancel long touch");
            scope.$apply(function () {
                scope.elementClass = "";
            });

            isLongTouch = false;

            if (timer) {
                clearTimeout(timer);
            }

            if (timerUntilShake) {
                clearTimeout(timerUntilShake);
            }
        }

        function onLongTouch() {
            console.log("Finish long touch");
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

            // If element is at start position
            if (!isLongTouch && intersectService.checkIntersection(scope.elementData.Location, startPosition, 20)) {
                console.log("Short tab");
            }

            cancelLongTouch();

            elementService.updateCurrentElement(scope.elementData).then(function () {
                scope.$emit("UNS-ELM-DROPPED", scope.elementData);
            });
        }

        function onMouseMove(e) {
            if (!mouseDown) return;

            // Long touch tolerance
            var clientPosition = { x: e.clientX, y: e.clientY };
            if (isLongTouch && intersectService.checkIntersection(scope.elementData.Location, clientPosition, 20)) {
                return;
            }

            scope.$apply(function () {
                scope.elementData.Location.x = clientPosition.x;
                scope.elementData.Location.y = clientPosition.y;
                resetPositionBounds();
            });

            // Do not continue if element wasn't moved from its start position
            if (intersectService.checkIntersection(scope.elementData.Location, startPosition, 20)) {
                return;
            }

            isMouseMoved = true;
            if (isLongTouch) {
                cancelLongTouch();
            }
        }

        function onTouchMove(e) {
            if (!mouseDown) return;
            if (e.touches.length > 1) return;

            // Long touch tolerance
            var clientPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            if (isLongTouch && intersectService.checkIntersection(scope.elementData.Location, clientPosition, 20)) {
                return;
            }

            scope.$apply(function () {
                scope.elementData.Location.x = clientPosition.x;
                scope.elementData.Location.y = clientPosition.y;
                resetPositionBounds();
            });

            // Do not continue if element wasn't moved from its start position
            if (intersectService.checkIntersection(scope.elementData.Location, startPosition, 0)) {
                return;
            }

            isMouseMoved = true;
            if (isLongTouch) {
                cancelLongTouch();
            }
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

