/**
 * Created by elias on 12.05.15.
 */
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
servicesModule.service('achievementService', function ($q, dataService, $log) {
    var service = {};

    service.checkForAchievements = function () {
        var deferred = $q.defer();
        var newlyUnlockedAchievements = [];

        dataService.getLockedAchievements().then(function (lockedAchievements) {


            var requests = [];
            lockedAchievements.forEach(function (lockedAchievement) {
                var innerDeferred = $q.defer();
                requests.push(innerDeferred.promise);

                dataService.checkAchievement(lockedAchievement.Query).then(function (checked) {

                    if (checked.length > 0 && checked[0].isReached > 0) {

                        dataService.unlockAchievement(lockedAchievement.Id).then(function () {
                            newlyUnlockedAchievements.push(lockedAchievement);
                            innerDeferred.resolve();
                        })
                    }
                    else
                        innerDeferred.resolve();

                });

            });

            $q.all(requests).then(function () {
                if (newlyUnlockedAchievements.length > 0)
                    deferred.resolve(newlyUnlockedAchievements);
                else
                    deferred.reject();
            }, deferred.reject)
        }, deferred.reject);


        return deferred.promise;
    };

    service.getUnlockedAchievements = function () {
        return dataService.getUnlockedAchievements();
    };

    return service;
});