/**
 * Created by abhe on 8/15/2015.
 */
(function() {
    'use strict';

    angular
        .module('iprimeUtility.misc')
        .factory('pageable', pageable);


    /* @ngInject */
    function pageable() {

        var service = {
            buildPage   : buildPage,
            buildPageLocal    : buildPageLocal,
            buildPageKendo: buildPageKendo
        };

        return service;
        /////////////////////

        function buildPage(params){

            var sorting = params.sorting();

            var sort = [];
            if (!_.isEmpty(sorting)) {
                _.mapObject(sorting, function(val, key) {
                    sort.push(key.toString()+','+val)
                });
                return {page:(params.page() - 1), size:params.count(), sort:sort};
            } else {
                return {page:(params.page() - 1), size:params.count()};
            }
        }

        function buildPageKendo(params){

            var sort = [];
            var search = [];
            var page;
            var size;
            if (params.sort) {
                _.each(params.sort, function(value, key) {
                    sort.push(value.field+','+value.dir)

                });
            }

            if (params.filter) {
                _.each(params.filter.filters, function(value, key) {
                    search.push(value.field+'_div_'+value.operator+'_div_'+value.value)
                });
            }

            if (params.page) {
                page = (params.page - 1);
                size = params.pageSize;
            }

            return {page: page, size:size, sort:sort, search: search};
        }

        function buildPageLocal (params, data) {

            var sorting = params.sorting();
            var sort;
            var check;

            if (!_.isEmpty(sorting)) {

                _.mapObject(sorting, function(val, key) {

                    check = val === "asc" ?
                        _.chain(data).sortBy(key).value() :
                        _.chain(data).sortBy(key).reverse().value();
                });

                return check
            } else {
                return data.slice((params.page() - 1) * params.count(), params.page() * params.count())
            }
        }
    }
}());
