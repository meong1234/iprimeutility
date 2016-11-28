/**
 * Created by abhe on 8/23/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('gridOptions', gridOptions);

    function gridOptions() {

        var filterSetting = {
            extra: false,
            operators: {
                string: {
                    contains: "Contains",
                    eq: "Is equal to",
                    neq: "Is not equal to"
                },
                number: {
                    eq: "Custom Equal to",
                    neq: "Custom Not equal to",
                    gte: "Custom Is greater than or equal to",
                    gt: "Custom Is greater than",
                    lte: "Custom Is less than or equal to",
                    lt: "Custom Is less than"
                },
                //filter menu for "date" type columns
                date: {
                    eq: "Custom Equal to",
                    neq: "Custom Not equal to",
                    gte: "Custom Is after or equal to",
                    gt: "Custom Is after",
                    lte: "Custom Is before or equal to",
                    lt: "Custom Is before"
                },
                //filter menu for foreign key values
                enums: {
                    eq: "custom Is Equal to",
                    neq: "custom Is Not equal to"
                }
            }
        }

        var exportSetting = {
            fileName: '',
            allPages: true
        }

        var dataSourceSetting = {
            schema: {
                model: {},
                data: 'content',
                total: 'totalElements'
            },
            transport: {read : {}},
            pageSize: 15,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true
        }

        var mainGridOptions = {
            toolbar: [
                { 'name': 'add', template: '<a  class=\'k-button k-button-icontext\' data-ng-click=\'vm.addrow()\' ><span class=\'k-icon k-add\'></span><span translate=\'table.btn_add\'></span></a>' },
                { 'name': 'refresh', template: '<a  class=\'k-button k-button-icontext\' data-ng-click=\'vm.refreshGrid()\' ><span class=\'k-icon k-refresh\'></span><span translate=\'table.btn_refresh\'></span></a>' },
                'excel',
                'pdf'
            ],
            excel: angular.copy(exportSetting),
            pdf: angular.copy(exportSetting),
            dataSource: angular.copy(dataSourceSetting),
            selectable: 'row',
            pageable: true,
            sortable: true,
            scrollable: false,
            //filterable: true,

            filterable: angular.copy(filterSetting),
            columns: [
                { "command": [
                    { 'name': 'delete', template: '<a  class=\'k-button k-button-icontext\' data-ng-click=\'vm.hapus(dataItem)\' ><span class=\'k-icon k-delete\'></span><span translate=\'table.delete\'></span></a>' },
                    { 'name': 'edit', template: '<a  class=\'k-button k-button-icontext\' data-ng-click=\'vm.addrow(dataItem.id)\' ><span class=\'k-icon k-edit\'></span><span translate=\'table.change\'></span></a>' },
                ], title: '{{ "table.command" | translate }}', attributes: { "class": "table-cell", style: "text-align: center;" }}
            ]
        }

        var localGridOptions = {
            excel: angular.copy(exportSetting),
            pdf: angular.copy(exportSetting),
            selectable: 'row',
            pageable: true,
            sortable: true,
            scrollable: false,
            //filterable: true,

            filterable: angular.copy(filterSetting),
            columns: [{command:["edit", "destroy"], title: '{{ "table.command" | translate }}', attributes: { "class": "table-cell", style: "text-align: center;" }}]
        }

        var treeGridOptions = {
            toolbar: kendo.template($("#toolbartemplate").html()),
            excel: angular.copy(exportSetting),
            pdf: angular.copy(exportSetting),
            dataSource: {
                schema: {
                    model: {},
                    data: 'content',
                    total: 'totalElements'
                },
                transport: {read : {}},
                pageSize: 100,
                serverSorting: false,
                serverFiltering: false
            },
            sortable: true,
            scrollable: false,
            //filterable: true,
            pageable: false,
            filterable: angular.copy(filterSetting),
            columns: [
            ]
        }



        var service = {
            buildGrid: buildGrid,
            buildLocalGrid: buildLocalGrid,
            buildTreeGrid: buildTreeGrid
        };

        return service;

        function buildGrid(){
            return angular.copy(mainGridOptions);
        }

        function buildLocalGrid(){
            return angular.copy(localGridOptions);
        }

        function buildTreeGrid(){
            return angular.copy(treeGridOptions);
        }

}


})();