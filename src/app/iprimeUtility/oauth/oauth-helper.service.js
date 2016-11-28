/**
 * Created by abhe on 8/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('iprimeUtility.oauth')
        .factory('oauthHelper', oauthHelperService);

    oauthHelperService.$inject = ['oauthEncode'];
    /* @ngInject */
    function oauthHelperService(oauthEncode) {

        var service = {
            getBaseAuthenticationHeader: getBaseAuthenticationHeader,
            buildAuthUrl: buildAuthUrl,
            buildRefreshTokenUrl: buildRefreshTokenUrl,
            processAuthResponse: processAuthResponse,
            processError: processError
        };

        return service;


        function getBaseAuthenticationHeader (urlInfo) {
            var BASIC_HEADER_VALUE = oauthEncode.encodeData(urlInfo.CLIENT_ID + ':' + urlInfo.CLIENT_SECRET);
            return {
                'Authorization': 'Basic ' + BASIC_HEADER_VALUE

            };
        }

        function buildAuthUrl (username, password, urlInfo) {
            return urlInfo.OAUTH_SERVER + urlInfo.TOKEN_URL + '?' +
                urlInfo.PASSWORD_GRANT_TYPE +
                '&' + 'username=' + username + '&' + 'password=' + password;
        }

        function buildRefreshTokenUrl (refreshToken, urlInfo) {
            return urlInfo.OAUTH_SERVER + urlInfo.TOKEN_URL + '?' +
                urlInfo.REFRESH_GRANT_TYPE +
                '&' + 'refresh_token=' + refreshToken;
        }


        function processAuthResponse (data) {
            // Code here will be linted with JSHint.
            /* jshint ignore:start */
            return {
                'accessToken': data.access_token,
                'refreshToken': data.refresh_token,
                'expires': data.expires_in,
                'scope': data.scope,
                'username': data.username,
                'authorities': data.authorities
            };
            // Code here will be ignored by JSHint.
            /* jshint ignore:end */
        }


        function processError (data, status) {
            return {
                data: data,
                status: status
            };
        }



    }
})();
