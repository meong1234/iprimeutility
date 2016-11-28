/**
 * Created by abhe on 8/19/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.system')
        .controller('userController', userController)
        .controller('userEditController', userEditController);

    userController.$inject = ['$rootScope','logger', 'userService', 'pageable', 'modalService', '$translate', 'gridOptions'];
    function userController($rootScope, logger, userService,  pageable, modalService, $translate, gridOptions) {
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
        };

        function hapus(id) {

            modalService.Confirmation(
                $translate.instant('confirmation_message.delete')+' '+id.username,
                function () {
                    userService.remove(id).success(
                        function (response, status, headers, config) {
                            logger.info('user '+id.username+' '+$translate.instant('confirmation_message.delete_info'));
                            vm.refreshGrid();
                        })
                }
            );

        };

        function addrow(id) {
            $rootScope.$state.go('app.system.security.user.edit', {id: id});
        }

        function refreshGrid() {
            if (vm.optionCallback !== undefined) {
                vm.mainGridOptions.dataSource.transport.read(vm.optionCallback);
            }
        }

        function setupGrid() {
            var gridmodel = {
                fields: {
                    username: { type: 'string' },
                    fullname: { type: 'string' },
                    active: { type: 'boolean' },
                    roleName: { type: 'string' },
                    email: { type: 'string' },
                    langKey: { type: 'string' }
                }
            };

            var gridRead = function gridRead(e) {
                vm.optionCallback = e;
                userService.query(pageable.buildPageKendo(e.data)).$promise.then(function(data) {
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
            vm.mainGridOptions.columns.push({ field: 'username', title: translate('Modules.System.user_page.fields.field1') });
            vm.mainGridOptions.columns.push({ field: 'fullname', title: translate('Modules.System.user_page.fields.field2') });
            vm.mainGridOptions.columns.push({ field: 'active', title: translate('Modules.System.user_page.fields.field3') });
            vm.mainGridOptions.columns.push({ field: 'roleName', title: translate('Modules.System.user_page.fields.field4'), filterable : false });
            vm.mainGridOptions.columns.push({ field: 'email', title: translate('Modules.System.user_page.fields.field6') });
            vm.mainGridOptions.columns.push({ field: 'langKey', title: translate('Modules.System.user_page.fields.field7') });
            vm.mainGridOptions.columns[0].title = translate('table.command');
        }
    }

    userEditController.$inject = ['$rootScope', '$scope','$q', '$stateParams', 'logger', 'userService','modalService', 'roleService', '$translate'];
    function userEditController($rootScope, $scope, $q, $stateParams, logger, userService, modalService, roleService, $translate ) {

        var vm = this;
        vm.currentUser = {};
        vm.original = {};

        vm.isEdit = ($stateParams.id !== "");
        vm.simpan = simpan;
        vm.cancel = cancel;
        vm.baru = baru;

        activate();

        function activate() {
            var promises = [getCurrentUser(), getAllRoles()];
            return $q.all(promises).then(function() {
                logger.info('Activated '+$rootScope.pagetitle+' View');
            });
        }

        function getCurrentUser(){
            if ($stateParams.id !== "") {

                return userService.get({id: $stateParams.id}).$promise.then(function (data) {
                    vm.currentUser = data;
                    vm.original = angular.copy(vm.currentUser);
                    return vm.currentUser;
                });
            } else {
                return null
            }
        }

        function getAllRoles(){
            return roleService.query({"page": 0, "size": 1000}, null).$promise.then(function (data) {
                vm.allRoles = data.content;
                return vm.allRoles;
            });
        }

        $scope.$watch('vm.currentUser', function(current, original) {
            vm.isClean = angular.equals(vm.currentUser, vm.original);
        }, true)

        function simpan(){

            if(vm.currentUser.active == null){
                vm.currentUser.active = false;
            };
            
            if (!vm.isEdit) {
                vm.currentUser.langKey = $translate.use();
            }

            userService.save(vm.currentUser)
                .success(function(){
                    logger.info($translate.instant('confirmation_message.save_info'));
                    $rootScope.$state.go('app.system.security.user.list');
                });
        }

        function cancel(){
            modalService.Confirmation(
                $translate.instant('confirmation_message.cancel'),
                function () {
                    $rootScope.$state.go('app.system.security.user.list');
                },
                !vm.isClean
            );
        }

        function baru(){
            modalService.Confirmation(
                'Apakah anda akan mereset perubahan yang anda telah dilakukan ?',
                function () {
                    vm.currentUser = angular.copy(vm.original);
                },
                !$scope.isClean
            );
        }
    }
})();