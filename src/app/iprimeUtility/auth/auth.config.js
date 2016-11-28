/**
 * Created by abhe on 8/16/2015.
 */
(function () {
    'use strict';

    var core = angular.module('iprimeUtility.auth');
    core.config(authIntercept);

    authIntercept.$inject = ['$httpProvider'];
    /* @ngInject */
    function authIntercept($httpProvider) {
        $httpProvider.interceptors.push("oauthInterceptorBearer");
        $httpProvider.interceptors.push("oauthInterceptorRefresh");
    }

})();
