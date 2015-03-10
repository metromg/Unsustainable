/**
 * Created by elias on 03.03.15.
 */
define(['angular','angularMocks','app'], function() {
    describe("demo test", function(){

        it("should be true", function(){
            expect(true).toBe(true);

        });
    });

    //describe("demo with controller", function () {
    //    var $controllerConstructor;
    //    var scope;
    //
    //    beforeEach(module('app'));
    //    beforeEach(module('controls'));
    //
    //    beforeEach(inject(function ($controller,$rootScope) {
    //        $controllerConstructor = $controller;
    //        scope = $rootScope.$new();
    //
    //    }));
    //
    //    it("should have a title", function () {
    //        var vm = $controllerConstructor('MainCtrl', {$scope:scope});
    //        expect(vm.title).toEqual("Wow it Works!");
    //
    //    });
    //
    //})
});
