/**
 * Created by abhe on 8/19/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.system')
        .factory('userService', userService);

    userService.$inject = ['$resource', 'globalConstants', '$http', '$q'];
    /* @ngInject */
    function userService($resource, globalConstants, $http, $q) {

        var user = $resource(globalConstants.apiUrl+'security/users/:id', {}, {
            queryPage: {method:'GET', isArray: false}
        });

        var service = {
            user: user,
            get: get,
            query: query,
            save: save,
            remove: remove
        };

        return service;

        function get(param, callback) {
            return user.get(param, callback);
        }

        function query(param, callback) {
            return user.queryPage(param, callback);
        }

        function save(obj) {
            if(obj.id == null){
                return $http.post(globalConstants.apiUrl+'security/users', obj);
            } else {
                return $http.put(globalConstants.apiUrl+'security/users/'+obj.id, obj);
            }
        }

        function remove(obj) {
            if(obj.id != null){
                return $http.delete(globalConstants.apiUrl+'security/users/'+obj.id);
            }
        }
    }

})();
