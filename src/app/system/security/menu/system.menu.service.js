/**
 * Created by abhe on 8/22/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.system')
        .factory('menuService', menuService);

    menuService.$inject = ['$resource', 'globalConstants', '$http'];
    /* @ngInject */
    function menuService($resource, globalConstants, $http) {

        var res = $resource(globalConstants.apiUrl+'security/menu/:id', {}, {
            queryPage: {method:'GET', isArray: false}
        });

        var service = {
            res: res,
            get: get,
            query: query,
            save: save,
            remove: remove
        };

        return service;

        function get(param, callback) {
            return res.get(param, callback);
        }

        function query(param, callback) {
            return res.queryPage(param, callback);
        }

        function save(obj) {
            if(obj.id == null){
                return $http.post(globalConstants.apiUrl+'security/menu', obj);
            } else {
                return $http.put(globalConstants.apiUrl+'security/menu/'+obj.id, obj);
            }
        }

        function remove(obj) {
            if(obj.id != null){
                return $http.delete(globalConstants.apiUrl+'security/menu/'+obj.id);
            }
        }
    }

})();