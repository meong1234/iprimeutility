/**
 * Created by abhe on 8/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('iprimeUtility.oauth')
        .factory('oauthInfo', oauthInfoService);

    oauthInfoService.$inject = ['storage', 'logger'];
    /* @ngInject */
    function oauthInfoService(storage, logger) {

        var _authInfo = {
            accessToken: '',
            isLoggedIn: false,
            refreshToken: '',
            expires: 0,
            scope: '',
            username: '',
            authorities: []
        };

        var _authInfo_ = {
            accessToken: '',
            isLoggedIn: false,
            refreshToken: '',
            expires: 0,
            scope: '',
            username: '',
            authorities: [],
        };

        var service = {
            configure: configure,
            load: load,
            save: save,
            reset: reset,
            getAuthInfo: getAuthInfo,
            hasAccessToken: hasAccessToken,
            hasRefreshToken: hasRefreshToken,
            refresh: refresh,
            expireToken: expireToken,
            toString: toString
        };

        return service;
        /////////////////////

        function configure  (authInfo) {
            _authInfo = authInfo;
            logger.log.debug('_authInfo', _authInfo);
        }

        function load() {
            var datastorage = storage.getObject('AuthInfo');
            if (!_.isEmpty(datastorage)) {
                configure(datastorage);
            }
        }

        function save() {
            storage.setObject('AuthInfo', _authInfo);
        }

        function reset () {
            configure(_authInfo_);
        }

        function getAuthInfo () {
            return _authInfo;
        }

        function hasAccessToken () {
            return _authInfo.accessToken;
        }

        function hasRefreshToken () {
            return _authInfo.refreshToken !== '';
        }

        function refresh (accessToken, expires) {
            _authInfo.accessToken = accessToken;
            _authInfo.expires = expires;
            _authInfo.isLoggedIn = true;
        }

        function expireToken () {
            _authInfo.accessToken = null;
            _authInfo.expires = 0;
        }

        function toString () {
            return 'accessToken: -' +
                'isLoggedIn :' + _authInfo.isLoggedIn +
                'refreshToken: -' +
                'expires:' + _authInfo.expires +
                'username:' + _authInfo.username +
                'scope:' + _authInfo.scope;
        }
    }
})();
