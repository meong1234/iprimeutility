/**
 * Created by abhe on 8/23/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dynamicMenuService', dynamicMenuService);

    dynamicMenuService.$inject = ['$resource', 'globalConstants', '$q', 'logger'];
    function dynamicMenuService($resource, globalConstants,  $q, logger) {

        var allMenu;
        var topMenu;

        var service = {
            getAllMenu: getAllMenu,
            buildTree: buildTree
        };

        return service;

        function getAllMenu(){

            var res = $resource(globalConstants.apiUrl+'security/menu/:id', {}, {
                queryPage: {method:'GET', isArray: false}
            });


            var deferredObject = $q.defer();
            res.queryPage({page: 0, size: 1000, sort: 'order,asc'}, null).$promise.then(function (data) {
                allMenu = data.content;
                topMenu = _.where(allMenu, {parentId:null} );
                topMenu = addChildren(topMenu, allMenu);
                deferredObject.resolve(topMenu);
            });
            return deferredObject.promise;
        }

        function buildTree(data) {
            var tree = _.where(data, {parentId:null} );
            tree = addChildren(tree, data);
            return tree;
        }

        function addChildren(parent, all) {
            parent = _.each(parent, function(value, key, list) {
                value.children = addChildren(subitem(value.id, all), all);
            });
            return parent;
        }

        function subitem(parentdata, all){
            var dt = [];
            _.each(all, function(value, key, list) {
                if (value.parentId!=null && value.parentId==parentdata) {
                    dt.push(value);
                }
            });
            return dt;
        }


    }


})();