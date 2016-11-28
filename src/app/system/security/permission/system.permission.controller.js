/**
 * Created by abhe on 8/19/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.system')
        .controller('permissionController', permissionController)
        .controller('permissionEditController', permissionEditController);

    permissionController.$inject = ['$rootScope','logger', 'permissionService', 'pageable', 'modalService', '$translate', 'gridOptions'];
    function permissionController($rootScope, logger, permissionService, pageable, modalService, $translate, gridOptions) {
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

        function setupGrid() {
            var gridmodel = {
                fields: {
                    id: { type: 'string' },
                    label: { type: 'string' },
                    value: { type: 'string' }
                }
            };

            var gridRead = function gridRead(e) {
                vm.optionCallback = e;
                permissionService.query(pageable.buildPageKendo(e.data)).$promise.then(function(data) {
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
            vm.mainGridOptions.columns.push({ field: 'label', title: translate('Modules.System.permission_page.fields.field1') });
            vm.mainGridOptions.columns.push({ field: 'value', title: translate('Modules.System.permission_page.fields.field2') });
            vm.mainGridOptions.columns[0].title = translate('table.command');
        }

        function hapus(id) {

            modalService.Confirmation(
                $translate.instant('confirmation_message.delete')+' '+id.label,
                function () {
                    permissionService.remove(id).success(
                        function (response, status, headers, config) {
                            logger.info('permission '+id.label+' '+$translate.instant('confirmation_message.delete_info'));
                            vm.refreshGrid();
                        })
                }
            );

        };

        function addrow(id) {
            $rootScope.$state.go('app.system.security.permission.edit', {id: id});
        }

        function refreshGrid() {
            if (vm.optionCallback !== undefined) {
                vm.mainGridOptions.dataSource.transport.read(vm.optionCallback);
            }
        }


    }

    permissionEditController.$inject = [
        '$rootScope', '$scope','$q', '$stateParams',
        'logger','modalService', 'permissionService',
        '$translate'
    ];
    function permissionEditController($rootScope, $scope, $q, $stateParams,
                                logger, modalService, permissionService,
                                $translate ) {

        var vm = this;
        vm.currentData = {};
        vm.original = {};

        vm.translate = translate;
        vm.isEdit = ($stateParams.id !== '');
        vm.simpan = simpan;
        vm.cancel = cancel;
        vm.baru = baru;

        activate();

        function activate() {
            var promises = [getCurrentData()];
            return $q.all(promises).then(function() {
                logger.info('Activated '+$rootScope.pagetitle+' View');
            });
        }

        function translate(data) {
            return $translate.instant(data);
        }

        function getCurrentData(){
            if ($stateParams.id !== '') {

                return permissionService.get({id: $stateParams.id}).$promise.then(function (data) {
                    vm.currentData = data;
                    vm.original = angular.copy(vm.currentData);
                    return vm.currentData;
                });
            } else {
                return null
            }
        }


        $scope.$watch('vm.currentData', function(current, original) {
            vm.isClean = angular.equals(vm.currentData, vm.original);
        }, true)

        function simpan(){

            permissionService.save(vm.currentData)
                .success(function(){
                    logger.info($translate.instant('confirmation_message.save_info'));
                    $rootScope.$state.go('app.system.security.permission.list');
                });
        }

        function cancel(){
            modalService.Confirmation(
                $translate.instant('confirmation_message.cancel'),
                function () {
                    $rootScope.$state.go('app.system.security.permission.list');
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
    }

})();