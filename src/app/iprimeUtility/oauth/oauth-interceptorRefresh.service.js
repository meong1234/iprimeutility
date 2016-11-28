/**
 * Created by abhe on 8/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('iprimeUtility.oauth')
        .factory('oauthInterceptorRefresh', oauthInterceptorRefresh);


    oauthInterceptorRefresh.$inject = ['oauthInfo','$rootScope', '$q', 'oauthHttpbuffer', 'logger', '$location'];
    function oauthInterceptorRefresh(oauthInfo, $rootScope, $q, httpBuffer, logger, $location) {

        var HTTP_UNAUTHORIZED = 401,
            OAUTH_UNAUTHORIZED_CODE = 'invalid_token';

        var service = {
            isTokenRefreshable: isTokenRefreshable,
            responseError: responseError
        };

        return service;


        function isTokenRefreshable (status, data) {
            return (oauthInfo.hasRefreshToken() &&
            status === HTTP_UNAUTHORIZED && data.error === OAUTH_UNAUTHORIZED_CODE);
        }

        function responseError(rejection) {

            switch (rejection.status) {

                case 401:
                    var deferred = $q.defer();
                    httpBuffer.append(rejection.config, deferred);
                    logger.log.debug(isTokenRefreshable(rejection.status, rejection.data));

                    if (isTokenRefreshable(rejection.status, rejection.data)) {
                        logger.log.debug('Token Refreshable Status '+rejection.status+' Data :'+rejection.data.error);
                        $rootScope.$broadcast('event:auth-refreshRequired', rejection);
                        return deferred.promise;
                    } else {
                        logger.log.debug('Token not refreshable Status '+rejection.status);
                        if ($rootScope.$state.current.name !== 'login') {
                            $location.path('/login');
                        }
                    }

                    return $q.reject(rejection);

                case 403:
                    //check error
                    if (rejection.data) {
                        //kalau errornya belum di autorized
                        if ((rejection.data.error === 'unauthorized') &&
                            ($rootScope.$state.current.name !== 'login')) {
                            $location.path('/login');
                        } else if (rejection.data.error === 'access_denied') {
                            logger.error(rejection.data.error, rejection.data, rejection.data.error);
                        }
                    }
                    break;

                case 0:
                    logger.error('Connection Timeout', undefined, 'Timeout');
                    break;

                default:
                    if (rejection.data.error !== 'invalid_grant') {
                        //trap selain error login
                        logger.error(rejection.data.title, rejection.data, rejection.data.title);
                    }

            }

            return $q.reject(rejection);
        }
    }


})();
