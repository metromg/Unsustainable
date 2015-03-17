/**
 * Created by elias on 17.03.15.
 */
'use strict';
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function alchemyTableCtrl() {

    // ViewModel
    var vm = this;

    vm.position = {x:100,y:100}

}

controllersModule.controller('alchemyTableCtrl', alchemyTableCtrl);
