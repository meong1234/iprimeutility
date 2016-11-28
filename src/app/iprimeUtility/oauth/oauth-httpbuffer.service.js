/**
 * Created by abhe on 8/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('iprimeUtility.oauth')
        .factory('oauthHttpbuffer', oauthHttpbufferService);

    oauthHttpbufferService.$inject = ['$injector'];
    /* @ngInject */
    function oauthHttpbufferService($injector) {

        var buffer = [];
        var $http;

        var service = {
            append: append,
            rejectAll: rejectAll,
            retryAll: retryAll
        };

        return service;


        function retryHttpRequest(config, deferred) {
            function successCallback(response) {
                deferred.resolve(response);
            }
            function errorCallback(response) {
                deferred.reject(response);
            }
            $http = $http || $injector.get('$http');
            $http(config).then(successCallback, errorCallback);
        }

        function append (config, deferred) {
            buffer.push({
                config: config,
                deferred: deferred
            });
        }

        function rejectAll (reason) {
            if (reason) {
                for (var i = 0; i < buffer.length; ++i) {
                    buffer[i].deferred.reject(reason);
                }
            }
            buffer = [];
        }

        function retryAll (updater) {
            for (var i = 0; i < buffer.length; ++i) {
                retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
            }
            buffer = [];
        }



    }
})();
