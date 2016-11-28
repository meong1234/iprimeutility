/**
 * Created by abhe on 8/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('iprimeUtility.oauth')
        .factory('oauthInterceptorBearer', oauthInterceptorBearer);

    oauthInterceptorBearer.$inject = ['oauthInfo'];
    /* @ngInject */
    function oauthInterceptorBearer(oauthInfo) {

        var service = {
            request: request
        };

        return service;


        function request (config) {
            if (oauthInfo.hasAccessToken() && oauthInfo.getAuthInfo().expires) {
                config.headers.Authorization = 'Bearer ' + oauthInfo.getAuthInfo().accessToken;
            }

            return config;
        }
    }


})();
