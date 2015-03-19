/*global angular */

'use strict';

describe('Unit: IntersectService', function () {

    var service;

    beforeEach(angular.mock.module('app'));
    angular.mock.module('app.services');


    beforeEach(angular.mock.inject(function (intersectService) {
        service = intersectService;
    }));

    it('should exist', function () {

        expect(service).toBeDefined();
    });

    it('should find an Intersection', function () {
        var position1 = {x: 100, y: 100};
        var position2 = {x: 100, y: 100};
        var tolerance = 20;

        expect(service.checkIntersection(position1, position2, tolerance)).toEqual(true);
    });
    it('should not find an Intersection', function () {
        var position1 = {x: 200, y: 179};
        var position2 = {x: 200, y: 200};
        var tolerance = 20;

        expect(service.checkIntersection(position1, position2, tolerance)).toEqual(false);
    });
});