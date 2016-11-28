/**
 * Created by abhe on 8/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('iprimeUtility.oauth')
        .factory('oauthEncode', oauthEncodeService);

    oauthEncodeService.$inject = ['$base64', '$window'];
    /* @ngInject */
    function oauthEncodeService($base64, $window) {

        var service = {
            encodeData: encodeData,
            decodeData: decodeData
        };

        return service;


        function encodeData (data) {
            if ($window.btoa) {
                return $window.btoa(data);
            }
            else {
                return $base64.encode(data);
            }
        }

        function decodeData (data) {
            if ($window.atob) {
                return $window.atob(data);
            } else {
                return $base64.decode(data);
            }
        }



    }
})();
