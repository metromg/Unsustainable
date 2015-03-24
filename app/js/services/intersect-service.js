'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('intersectService',function ($q, $timeout) {
    var service = {};

    service.getIntersectingElements = function (element, elements) {
        var that = this;
        var deferred = $q.defer();
        var tolerance = 20;
        var intersectingElements = [];
        $timeout(function () {
            for (var i = 0; i < elements.length; i++) {
                if (element.$$hashKey != elements[i].$$hashKey)
                    if (that.checkIntersection(element.Location, elements[i].Location, tolerance))
                        intersectingElements.push(elements[i]);
            }
            if (intersectingElements.length > 0)
                deferred.resolve(intersectingElements);
            else
                deferred.reject();
        });

        return deferred.promise;
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

