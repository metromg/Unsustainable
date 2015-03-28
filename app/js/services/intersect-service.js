'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('intersectService',function ($q, $timeout) {
    var service = {};

    service.getIntersectingElements = function (element, elements) {
        var defer = $q.defer();
        $timeout(function () {
            var intersectingElements = [];
            for (var i = 0; i < elements.length; i++) {
                if (element.$$hashKey != elements[i].$$hashKey) {
                    if (service.checkIntersection(element.Location, elements[i].Location, 20)) {
                        intersectingElements.push(elements[i]);
                    }
                }
            }

            if (intersectingElements.length > 0) {
                defer.resolve(intersectingElements);
            } else {
                defer.reject();
            }
        });

        return defer.promise;
    };

    service.checkIntersection = function (position1, position2, tolerance) {
        if ((position1.x > (position2.x + tolerance)) || ((position1.x + tolerance) < position2.x)) {
            return false;
        }
        if ((position1.y > (position2.y + tolerance)) || ((position1.y + tolerance) < position2.y)) {
            return false;
        }
        return true;
    };

    return service;
});

