/**
 * Created by abhe on 8/19/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('loginCtrl', loginCtrl);


    loginCtrl.$inject = ['$rootScope', 'authservice', '$translate'];
    function loginCtrl( $rootScope, authservice, $translate) {
        var vm = this;

        vm.credentials = {
            username: '',
            password: '',
            rememberme: true
        };

        vm.login = function (credentials) {
            authservice.login(vm.credentials.username, vm.credentials.password, vm.credentials.rememberme, function(){
                $rootScope.$state.go("app.dashboard");
            })
        };

        activate();

        function activate() {
            vm.message1 = $translate.instant('login.message1');
            vm.message2 = $translate.instant('login.message2');
            vm.message3 = $translate.instant('login.message3');
        }
    }

})();
