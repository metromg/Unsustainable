/*global angular */

'use strict';

describe('Unit: IntersectService', function () {

    var service;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        // mock the service
        angular.mock.inject(function (IntersectService) {
            service = IntersectService;
        });
    });

    it('should exist', function () {
        expect(service).toBeDefined();
    });

    it('should find an Intersection', function () {
        var position1 = {x: 100, y: 100};
        var position2 = {x: 100, y: 100};
        var tolerance = 20;

        expect(service.checkIntersection(position1, position2, tolerance)).toBe(true);
    });
    it('should not find an Intersection', function () {
        var position1 = {x: 200, y: 100};
        var position2 = {x: 100, y: 100};
        var tolerance = 20;
        expect(service.checkIntersection(position1, position2, tolerance)).toBe(false);
    });
});