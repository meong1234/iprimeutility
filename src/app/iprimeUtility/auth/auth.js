/**
 * Created by abhe on 8/15/2015.
 */
/**
 * Created by abhe on 8/15/2015.
 */
(function() {
    'use strict';

    angular
        .module('iprimeUtility.auth')
        .factory('authservice', authService);

    authService.$inject = ['logger', 'oauthInfo', 'oauth', 'globalConstants', '$http', '$location'];

    /* @ngInject */
    function authService(logger, oauthInfo, oauth, globalConstants, $http, $location) {
        var service = {
            refreshToken: refreshToken,
            login: login,
            clearInfo: clearInfo,
            logout: logout,
            isAutorized: isAutorized
        };

        return service;
        /////////////////////

        function refreshToken() {
            oauthInfo.expireToken();

            //get the refresh token
            var refreshPromise = oauth._refreshToken(oauthInfo.getAuthInfo().refreshToken, globalConstants.urlInfo);
            refreshPromise.then(function (response) {
                oauthInfo.refresh(response.accessToken, response.expires);
                oauthInfo.save();
                oauth._loginConfirmed();
            }, function (error) {
                logout();
            });
        }

        function login(username, password, rememberme, succesFunction)  {

            oauthInfo.reset();

            var loginPromise = oauth._login(username, password, globalConstants.urlInfo);
            loginPromise.then(function (response) {
                response.authorities = _.pluck(response.authorities, 'authority');
                response.isLoggedIn = true;
                oauthInfo.configure(response);
                if (rememberme) {
                    oauthInfo.save();
                }
                oauth._loginConfirmed();
                succesFunction(response);
            }, function (error) {
                if (error.data !== null){
                    logger.error('Wrong Username / Password', error.data.error_description);
                    oauth._loginCancelled();
                }
            });
        }

        function clearInfo() {
            oauthInfo.reset();
            oauthInfo.save();
            oauth._loginCancelled();
        }

        function logout() {
            $http(
                { method: 'GET', url: globalConstants.apiUrl+globalConstants.urlInfo.LOGOUT_URL}
            ).success(function (response) {
                    clearInfo();
                    $location.path('/login');
                });
        }

        function isAutorized(roles) {
            return _.intersection(oauthInfo.getAuthInfo().authorities,roles).length > 0;
        }

    }
}());
