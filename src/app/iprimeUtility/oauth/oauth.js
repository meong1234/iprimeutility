/**
 * Created by abhe on 8/15/2015.
 */
(function() {
    'use strict';

    angular
        .module('iprimeUtility.oauth')
        .factory('oauth', oauth);

    oauth.$inject = ['logger', 'oauthHelper', '$q', '$http','oauthHttpbuffer'];

    /* @ngInject */
    function oauth(logger, oauthHelper, $q, $http, oauthHttpbuffer) {
        var service = {
            _refreshToken: _refreshToken,
            _login   : _login,
            _loginConfirmed    : _loginConfirmed,
            _loginCancelled : _loginCancelled
        };

        return service;
        /////////////////////

        function _refreshToken(refreshToken, urlInfo) {
            var url = oauthHelper.buildRefreshTokenUrl(refreshToken, urlInfo);
            var encodedBasic = oauthHelper.getBaseAuthenticationHeader(urlInfo);

            var req = {
                method: 'POST',
                url: url,
                headers: encodedBasic
            };

            var deferred = $q.defer();
            $http(req).success(function (data) {
                logger.log.debug('Service refreshToken: '+data);
                deferred.resolve(oauthHelper.processAuthResponse(data));
            }).error(function (data, status) {
                deferred.reject(oauthHelper.processError(data, status));
            });

            return deferred.promise;
        }

        function _login(username, password, urlInfo) {
            var url = oauthHelper.buildAuthUrl(username, password, urlInfo);
            logger.log.debug('Login Url : ' + url);
            var encodedBasic = oauthHelper.getBaseAuthenticationHeader(urlInfo);
            var req = {
                method: 'POST',
                url: url,
                headers: encodedBasic
            };
            var deferred = $q.defer();
            $http(req).success(function (data) {
                /* jshint ignore:start */
                logger.log.debug('Service AccessToken : ' + data.access_token);
                /* jshint ignore:end */
                deferred.resolve(oauthHelper.processAuthResponse(data));
            }).error(function (data, status) {
                deferred.reject(oauthHelper.processError(data, status));
            });

            return deferred.promise;
        }

        function _loginConfirmed(data, configUpdater) {
            var updater = configUpdater || function(config) {return config;};
            oauthHttpbuffer.retryAll(updater);
        }

        function _loginCancelled(data, reason) {
            oauthHttpbuffer.rejectAll(reason);
        }

    }
}());
