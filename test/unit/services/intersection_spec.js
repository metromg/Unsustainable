/*global angular */

'use strict';

describe('Unit: IntersectService', function () {

    var service;
    var $rootScope;
    var $timeout;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('app.services'));


    beforeEach(angular.mock.inject(function (intersectService, _$rootScope_, _$timeout_) {
        service = intersectService;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
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

    it('should get only the intersecting elements with tolerance 20', function () {
        var element = {Id: 1, Name: 'Water', Location: {x: 200, y: 200}, $$hashKey: "1"};
        var elements = [
            {Id: 1, Name: 'Water', Location: {x: 200, y: 200}, $$hashKey: "1"},
            {Id: 2, Name: 'Fire', Location: {x: 200, y: 200}, $$hashKey: "2"},
            {Id: 1, Name: 'Water', Location: {x: 221, y: 179}, $$hashKey: "3"},
            {Id: 3, Name: 'Steam', Location: {x: 179, y: 221}, $$hashKey: "4"},
            {Id: 3, Name: 'Steam', Location: {x: 180, y: 220}, $$hashKey: "5"},
            {Id: 3, Name: 'Steam', Location: {x: 220, y: 180}, $$hashKey: "6"}
        ];

        var result;
        service.getIntersectingElements(element, elements).then(function (res) {
            result = res;
        });

        $rootScope.$apply();
        $timeout.flush();

        expect(result).toEqual([
            {Id: 2, Name: 'Fire', Location: {x: 200, y: 200}, $$hashKey: "2"},
            {Id: 3, Name: 'Steam', Location: {x: 180, y: 220}, $$hashKey: "5"},
            {Id: 3, Name: 'Steam', Location: {x: 220, y: 180}, $$hashKey: "6"}
        ]);
    });
});