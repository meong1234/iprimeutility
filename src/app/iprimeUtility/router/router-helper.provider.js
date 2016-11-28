/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('iprimeUtility.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider', 'JS_REQUIRES'];
    /* @ngInject */
    function routerHelperProvider( $stateProvider, $urlRouterProvider, jsRequires) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        //$locationProvider.html5Mode(true);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$translate', '$location', '$rootScope', '$state', 'logger'];
        /* @ngInject */
        function RouterHelper($translate, $location, $rootScope, $state, logger) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts,
                loadSequence: loadSequence
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>

                        if (toState.data && toState.data.pagetitle && toState.data.pagedesc) {
                            $rootScope.pagetitle = $translate.instant(toState.data.pagetitle);
                            $rootScope.desc = $translate.instant(toState.data.pagedesc);
                        }

                    }
                );
            }

            function loadSequence() {
                var _args = arguments;
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function ($ocLL, $q) {
                            var promise = $q.when(1);
                            for (var i = 0, len = _args.length; i < len; i++) {
                                promise = promiseThen(_args[i]);
                            }
                            return promise;

                            function promiseThen(_arg) {
                                if (typeof _arg == 'function')
                                    return promise.then(_arg);
                                else
                                    return promise.then(function () {
                                        var nowLoad = requiredData(_arg);
                                        if (!nowLoad)
                                            return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                        return $ocLL.load(nowLoad);
                                    });
                            }

                            function requiredData(name) {
                                if (jsRequires.modules)
                                    for (var m in jsRequires.modules)
                                        if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                            return jsRequires.modules[m];
                                return jsRequires.scripts && jsRequires.scripts[name];
                            }
                        }]
                };
            }
        }
    }
})();
