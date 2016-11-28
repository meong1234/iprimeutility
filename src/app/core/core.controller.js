/**
 * Created by abhe on 8/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('loginCtrl', loginCtrl)
        .controller('AppCtrl', AppCtrl);


    loginCtrl.$inject = ['$rootScope', 'authservice', '$translate'];
    function loginCtrl( $rootScope, authservice, $translate) {
        var vm = this;

        vm.credentials = {
            username: '',
            password: '',
            rememberme: true
        };

        vm.login = function (credentials) {
            authservice.login(vm.credentials.username, vm.credentials.password, vm.credentials.rememberme, function(){
                $rootScope.$state.go("app.dashboard");
            })
        };

        activate();

        function activate() {
            vm.message1 = $translate.instant('login.message1');
            vm.message2 = $translate.instant('login.message2');
            vm.message3 = $translate.instant('login.message3');
        }
    }


    AppCtrl.$inject = ['$q','logger', '$window', '$document', '$rootScope', '$scope', 'cfpLoadingBar', '$translate', 'authservice', 'dynamicMenuService', '$location'];
    /* @ngInject */
    function AppCtrl($q, logger, $window, $document, $rootScope, $scope, cfpLoadingBar, $translate, authservice, dynamicMenuService, $location) {
        var vm = this;
        var $win = $($window);

        activate();

        function activate() {
            var promises = [getAllMenu()];
            return $q.all(promises).then(function() {
                logger.log.log('Activated Root View', vm.allMenu);
            });
        }

        function getAllMenu(){
            return dynamicMenuService.getAllMenu().then(function (data) {
                vm.allMenu = data;
                return vm.allMenu;
            });
        }

        vm.toTheTop = function () {

            $document.scrollTopAnimated(0, 600);

        };

        vm.logout=function(){
            authservice.logout();
        }

        // angular translate
        // ----------------------
        vm.language = {
            // Handles language dropdown
            listIsOpen: false,
            // list of available languages
            available: {
                'en': 'English',
                'id': 'Indonesia'
            },
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage();
                // we know we have set a preferred one in app.config
                vm.language.selected = vm.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function (localeId, ev) {
                $translate.use(localeId);
                vm.language.selected = vm.language.available[localeId];
                vm.language.listIsOpen = !vm.language.listIsOpen;
            }
        };

        vm.language.init();

        var viewport = function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        };
        // function that adds information in a scope of the height and width of the page
        vm.getWindowDimensions = function () {
            return {
                'h': viewport().height,
                'w': viewport().width
            };
        };
        // Detect when window is resized and set some variables
        $scope.$watch(vm.getWindowDimensions, function (newValue, oldValue) {
            vm.windowHeight = newValue.h;
            vm.windowWidth = newValue.w;
            if (newValue.w >= 992) {
                vm.isLargeDevice = true;
            } else {
                vm.isLargeDevice = false;
            }
            if (newValue.w < 992) {
                vm.isSmallDevice = true;
            } else {
                vm.isSmallDevice = false;
            }
            if (newValue.w <= 768) {
                vm.isMobileDevice = true;
            } else {
                vm.isMobileDevice = false;
            }
        }, true);
        // Apply on resize
        $win.on('resize', function () {
            $scope.$apply();
        });

        $rootScope.$on('$stateChangeStart', function () {
            //start loading bar on stateChangeStart
            cfpLoadingBar.start();

        });

        $rootScope.$on('$stateChangeSuccess', function (event) {

            //stop loading bar on stateChangeSuccess
            event.targetScope.$watch("$viewContentLoaded", function () {

                cfpLoadingBar.complete();
            });

            // scroll top the page on change state

            $document.scrollTo(0, 0);

        });
    }
})();