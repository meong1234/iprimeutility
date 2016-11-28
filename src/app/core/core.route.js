/**
 * Created by abhe on 8/16/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['routerHelper', '$rootScope', 'toggleHelper'];
    /* @ngInject */
    function appRun(routerHelper, $rootScope, toggleHelper) {

        $rootScope.toggle = function (target, command) {
            if (command == null) {
                command = "toggle";
            }
            toggleHelper.toggle(target, command);
        };

        $rootScope.toggleByClass = function (targetClass, command) {
            if (command == null) {
                command = "toggle";
            }
            toggleHelper.toggleByClass(targetClass, command);
        };

        var otherwise = '/app/dashboard';
        routerHelper.configureStates(getStates(routerHelper), otherwise);
    }

    function getStates(routerHelper) {
        return [
            {
                state: 'app',
                config: {
                    url: '/app',
                    templateUrl: 'app/core/view/app.html',
                    controller: 'AppCtrl',
                    controllerAs: 'vm',
                    abstract: true,
                    resolve: routerHelper.loadSequence('modernizr', 'perfect-scrollbar-plugin')
                }
            },
            {
                state: 'account',
                config: {
                    url: '',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	                abstract: true
                }
            },
            {
                state: 'account.login',
                config: {
                    url: '/login',
                    templateUrl: 'app/core/login/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'vm'
                }
            },{
                state: 'account.registration',
                config: {
                    url: '/registration',
                    templateUrl: 'app/core/login/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
