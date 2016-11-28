/**
 * Created by abhe on 8/16/2015.
 */
(function() {
    'use strict';

    angular
        .module('iprimeUtility.auth')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state','$stateParams', 'logger', 'oauthInfo', 'authservice', '$location'];

    /* @ngInject */
    function appRun($rootScope, $state, $stateParams, logger, oauthInfo, authservice, $location) {
        //setup state
        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //watch info change :p
        $rootScope.$watch(
            function(){ return oauthInfo.getAuthInfo() },

            function(newVal) {$rootScope.AuthInfo = newVal;}

        );

        //load from storage :)
        oauthInfo.load();

        //watch for refresh token
        $rootScope.$on('event:auth-refreshRequired', function () {
            authservice.refreshToken();
        });

        //watch for state changed
        $rootScope.$on('$stateChangeStart', function (event, next) {

            logger.log.debug('$stateChangeStart', next);
            
            
            var authorizedRoles = next.data && next.data.authorizedRoles ?                
                next.data.authorizedRoles :
                [] ;

            if (next.name === '404') {
                return;
            }

            if ((next.name === 'login')) {
                authservice.clearInfo();
            } else {
                if (authorizedRoles.length && !authservice.isAutorized(authorizedRoles)) {
                    if (!$rootScope.AuthInfo.isLoggedIn) {
                        $location.path('/login');
                    } else {
                        logger.error('user not autorized for access this');
                        event.preventDefault();
                    }
                }
            }
        });
    }


})();