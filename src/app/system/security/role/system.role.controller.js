/**
 * Created by abhe on 8/19/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.system')
        .controller('roleController', roleController)
        .controller('roleEditController', roleEditController);

    roleController.$inject = ['$rootScope','logger', 'roleService', 'gridOptions', 'pageable', 'modalService', '$translate'];
    function roleController($rootScope, logger, roleService, gridOptions, pageable, modalService, $translate) {
        var vm = this;
        vm.hapus = hapus;
        vm.translate = translate;
        vm.addrow = addrow;
        vm.refreshGrid = refreshGrid;


        function translate(data) {
            return $translate.instant(data);
        }

        activate();

        function activate() {
            setupGrid();
            logger.info('Activated '+$rootScope.pagetitle+' View');
        }

        function hapus(id) {

            modalService.Confirmation(
                $translate.instant('confirmation_message.delete')+' '+id.name,
                function () {
                    roleService.remove(id).success(
                        function (response, status, headers, config) {
                            logger.info('role '+id.name+' '+$translate.instant('confirmation_message.delete_info'));
                            vm.refreshGrid();
                        })
                }
            );

        };

        function addrow(id) {
            $rootScope.$state.go('app.system.security.role.edit', {id: id});
        }

        function refreshGrid() {
            if (vm.optionCallback !== undefined) {
                vm.mainGridOptions.dataSource.transport.read(vm.optionCallback);
            }
        }

        function setupGrid() {
            var gridmodel = {
                fields: {
                    name: { type: 'string' },
                    description: { type: 'string' }
                }
            };

            var gridRead = function gridRead(e) {
                vm.optionCallback = e;
                roleService.query(pageable.buildPageKendo(e.data)).$promise.then(function(data) {
                    e.success(data);
                }, function(error) {
                    e.error(error);
                })
            }

            vm.mainGridOptions = gridOptions.buildGrid();
            vm.mainGridOptions.excel.fileName = $rootScope.pagetitle+'.xlsx';
            vm.mainGridOptions.pdf.fileName = $rootScope.pagetitle+'.pdf';
            vm.mainGridOptions.dataSource.schema.model = gridmodel;
            vm.mainGridOptions.dataSource.transport.read = gridRead;
            vm.mainGridOptions.columns.push({ field: 'name', title: translate('Modules.System.role_page.fields.field1') });
            vm.mainGridOptions.columns.push({ field: 'description', title: translate('Modules.System.role_page.fields.field2') });
            vm.mainGridOptions.columns[0].title = translate('table.command');
        }
    }

    roleEditController.$inject = [
        '$rootScope', '$scope','$q', '$stateParams',
        'logger','modalService', 'roleService',
        'permissionService', 'menuService', '$translate', 'pageable', 'ngTableParams'
    ];
    function roleEditController($rootScope, $scope, $q, $stateParams,
                                logger, modalService, roleService,
                                permissionService, menuService, $translate, pageable, ngTableParams ) {

        var vm = this;
        vm.currentData = {};
        vm.original = {};

        vm.translate = translate;
        vm.isEdit = ($stateParams.id !== "");
        vm.simpan = simpan;
        vm.cancel = cancel;
        vm.baru = baru;
        vm.removeSelectedPermission = removeSelectedPermission;
        vm.tambahPermission = tambahPermission;
        vm.removeSelectedMenu = removeSelectedMenu;
        vm.tambahMenu = tambahMenu;

        vm.tableMenu = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                "parent.order": 'desc',     // initial sorting,
                order: 'asc'
            }
        }, {
            total: 0, // length of data
            getData: function($defer, params) {
                if (vm.currentData && vm.currentData.menuSet) {
                    var data = pageable.buildPageLocal(params, vm.currentData.menuSet );
                    params.total(vm.currentData.menuSet.length);
                    $defer.resolve(data);
                }
            }
        });

        vm.tablePermission = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0, // length of data
            getData: function($defer, params) {
                if (vm.currentData && vm.currentData.permissionSet) {
                    var data = pageable.buildPageLocal(params, vm.currentData.permissionSet );
                    params.total(vm.currentData.permissionSet.length);
                    $defer.resolve(data);
                }
            }
        });

        activate();

        function activate() {
            var promises = [getCurrentData(), getAllPermission(), getAllMenu()];
            return $q.all(promises).then(function() {
                logger.info('Activated '+$rootScope.pagetitle+' View');
            });
        }

        function translate(data) {
            return $translate.instant(data);
        }

        function getCurrentData(){
            if ($stateParams.id !== "") {

                return roleService.get({id: $stateParams.id}).$promise.then(function (data) {
                    vm.currentData = data;
                    vm.original = angular.copy(vm.currentData);
                    vm.tablePermission.reload();
                    vm.tableMenu.reload();
                    return vm.currentData;
                });
            } else {
                return null
            }
        }

        function getAllPermission(){
            return permissionService.query({"page": 0, "size": 1000}, null).$promise.then(function (data) {
                vm.allPermission = data.content;
                return vm.allPermission;
            });
        }

        function getAllMenu(){
            return menuService.query({"page": 0, "size": 1000}, null).$promise.then(function (data) {
                vm.allMenu = data.content;
                return vm.allMenu;
            });
        }

        $scope.$watch('vm.currentData', function(current, original) {
            vm.isClean = angular.equals(vm.currentData, vm.original);
        }, true)

        function simpan(){


            roleService.save(vm.currentData)
                .success(function(){
                    logger.info($translate.instant('confirmation_message.save_info'));
                    $rootScope.$state.go('app.system.security.role.list');
                });
        }

        function cancel(){
            modalService.Confirmation(
                $translate.instant('confirmation_message.cancel'),
                function () {
                    $rootScope.$state.go('app.system.security.role.list');
                },
                !vm.isClean
            );
        }

        function baru(){
            modalService.Confirmation(
                $translate.instant('confirmation_message.reset'),
                function () {
                    vm.currentData = angular.copy(vm.original);
                },
                !$scope.isClean
            );
        }

        function removeSelectedPermission(p) {
            var data = vm.currentData.permissionSet;
            vm.currentData.permissionSet = _.without(data, _.findWhere(data, {id: p.id}));
            vm.tablePermission.reload();
        }

        function removeSelectedMenu(p) {
            var data = vm.currentData.menuSet;
            vm.currentData.menuSet = _.without(data, _.findWhere(data, {id: p.id}));
            vm.tableMenu.reload();
        }

        function tambahPermission() {

            modalService.ConfirmationTable(
                {
                    closeButtonText: $translate.instant('confirmation_message.btn_no'),
                    actionButtonText: $translate.instant('confirmation_message.btn_yes'),
                    headerText: $translate.instant('Modules.System.role_page.confirmation_message.permission_header'),
                    bodyText: $translate.instant('Modules.System.role_page.confirmation_message.permission_body')
                },
                'app/system/security/role/dialog.permission.html',
                function (data) {
                    var arr = (vm.currentData.permissionSet !== undefined) ? vm.currentData.permissionSet : []
                    arr = arr.concat(data);
                    vm.currentData.permissionSet = arr;
                    vm.tablePermission.reload();
                },
                vm.currentData === null ?
                    vm.allPermission :
                    _.reject(vm.allPermission, function(d){
                        var test = _.findWhere(vm.currentData.permissionSet, {id: d.id});
                        return test === undefined ? false : true;
                    })
            );

        }

        function tambahMenu() {

            modalService.ConfirmationTable(
                {
                    closeButtonText: $translate.instant('confirmation_message.btn_no'),
                    actionButtonText: $translate.instant('confirmation_message.btn_yes'),
                    headerText: $translate.instant('Modules.System.role_page.confirmation_message.menu_header'),
                    bodyText: $translate.instant('Modules.System.role_page.confirmation_message.menu_body')
                },
                'app/system/security/role/dialog.menu.html',
                function (data) {
                    var arr = (vm.currentData.menuSet !== undefined) ? vm.currentData.menuSet : []
                    arr = arr.concat(data);
                    vm.currentData.menuSet = arr;
                    vm.tableMenu.reload();
                },
                vm.currentData === null ?
                    vm.allMenu :
                    _.reject(vm.allMenu, function(d){
                        var test = _.findWhere(vm.currentData.menuSet, {id: d.id});
                        return test === undefined ? false : true;
                    })
            );

        }
    }

})();