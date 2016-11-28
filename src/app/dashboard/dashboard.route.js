(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'app/core/view/fade-out.html',
                    title: 'dashboard',
                    ncyBreadcrumb: {
                        label: 'Dashboard'
                    },
                    data: {
                        authorizedRoles: ["DASHBOARD_VIEW"],
                        pagetitle: 'sidebar.nav.dashboard.MAIN',
                        pagedesc: 'sidebar.nav.dashboard.MAIN_DESC'
                    }
                }
            }
        ];
    }
})();
