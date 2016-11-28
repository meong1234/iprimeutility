/**
 * Created by abhe on 8/15/2015.
 */
(function() {
    'use strict';

    angular
        .module('iprimeUtility.misc')
        .factory('storage', storage);

    storage.$inject = ['$window'] ;

    /* @ngInject */
    function storage($window){

        var service = {
            setvalue   : setvalue,
            getvalue    : getvalue,
            setObject : setObject,
            getObject : getObject,
        };

        return service;
        /////////////////////

        function setvalue(key, value){
            $window.localStorage[key] = value;
        }

        function getvalue(key, defaultValue){
            return $window.localStorage[key] || defaultValue;
        }

        function setObject(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }

        function getObject(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}());
