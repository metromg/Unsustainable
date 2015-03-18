'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function IntersectService($q, $timeout) {

    var service = {};

    service.getIntersectingElements = function (element, elements) {
        var that = this;
        var deferred = $q.defer();
        var tolerance = 20;
        var intersectingElements = [];
        $timeout(function () {
            for (var i = 0; i < elements.length; i++) {
                if (element.$$hashKey != elements[i].$$hashKey)
                    if (that.checkIntersection(element.position, elements[i].position, tolerance))
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

        if (position1.x + tolerance >= position2.x && position1.x <= position2.x)
            return true;
        if (position1.y + tolerance >= position2.y && position1.y <= position2.y)
            return true;


        return false;
    };

    return service;

}

servicesModule.service('IntersectService', IntersectService);