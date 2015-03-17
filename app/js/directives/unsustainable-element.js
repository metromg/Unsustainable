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

        element.bind("mousedown", function (e) {
            console.log('dragstart');
            mouseDown = true;
        });
        angular.element(document.body).bind("mousemove", function (e) {

            if (!mouseDown) return;
            scope.$apply(function () {
                scope.position.x = e.clientX;
                scope.position.y = e.clientY;
            });


        });


        angular.element(document.body).bind("mouseup", function (e) {
            console.log('dragend');
            mouseDown = false;
        });

    };
    return directive;

};

directivesModule.directive('unsustainableElement', unsustainableElement);

