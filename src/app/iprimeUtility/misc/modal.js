/**
 * Created by abhe on 8/21/2015.
 */
/**
 * Created by abhe on 8/15/2015.
 */
(function() {
    'use strict';

    angular
        .module('iprimeUtility.misc')
        .factory('modalService', modalService);


    /* @ngInject */
    modalService.$inject = ['$modal', '$translate'] ;
    function modalService($modal, $translate) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'app/iprimeUtility/misc/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        var service = {
            showModal   : showModal,
            show    : show,
            Confirmation: Confirmation,
            ConfirmationTable: ConfirmationTable
        };

        return service;
        /////////////////////

        function Confirmation(text, confirmationOk, check){
            var modalConfirmasi = {
                closeButtonText: $translate.instant('confirmation_message.btn_no'),
                actionButtonText: $translate.instant('confirmation_message.btn_yes'),
                headerText: $translate.instant('confirmation_message.header'),
                bodyText: text//'Apakah anda akan mereset perubahan yang anda telah dilakukan ?'
            };

            var showit = (check === true) || (check === undefined);

            if (showit) {
                showModal({}, modalConfirmasi).then(function (result) {
                    confirmationOk();
                });
            } else {
                confirmationOk();
            }
        }

        function ConfirmationTable(modalConfirmasiTable, template, confirmationOk,  data) {

            showModal({controller: confirmModalCtrl, templateUrl: template}, modalConfirmasiTable).then(function (result) {
                confirmationOk(result);
            });

            confirmModalCtrl.$inject = ['$scope', '$modalInstance', 'ngTableParams', '$translate'] ;
            function confirmModalCtrl($scope, $modalInstance, ngTableParams, $translate) {

                $scope.data = data;
                $scope.modalOptions = modalConfirmasiTable;
                $scope.modalOptions.ok = function () {
                    var data = _.filter($scope.data,function(item) {
                        return item.checked;
                    });
                    $modalInstance.close(data);
                };

                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };

                $scope.translate = function (data) {
                    return $translate.instant(data);
                };

                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 5           // count per page
                }, {
                    total: $scope.data.length, // length of data
                    getData: function($defer, params) {

                        params.total($scope.data.length); // set total for recalc pagination
                        $defer.resolve($scope.users = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });

                $scope.checkboxes = { 'checked': false};

                $scope.$watch('checkboxes.checked', function(value) {
                    angular.forEach($scope.data, function(item) {
                        if (angular.isDefined(item.id)) {
                            item.checked = value;
                        }
                    });
                });

                $scope.$watch('checkboxes.items', function(values) {
                    if (!$scope.users) {
                        return;
                    }
                    var checked = 0, unchecked = 0,
                        total = $scope.users.length;
                    angular.forEach($scope.users, function(item) {
                        checked   +=  (item.checked) || 0;
                        unchecked += (!item.checked) || 0;
                    });
                    if ((unchecked == 0) || (checked == 0)) {
                        $scope.checkboxes.checked = (checked == total);
                    }
                    // grayed checkbox
                    angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
                }, true);
            }
        }


        function showModal(customModalDefaults, customModalOptions, data) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return show(customModalDefaults, customModalOptions, data);
        }

        function show(customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = simpleModalCtrl
            };

            return $modal.open(tempModalDefaults).result;


            simpleModalCtrl.$inject = ['$scope', '$modalInstance'] ;
            function simpleModalCtrl($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }
        }



    }
}());
