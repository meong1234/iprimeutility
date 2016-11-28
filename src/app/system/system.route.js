(function() {
    'use strict';

    angular
        .module('app.system')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(routerHelper));
    }

    function getStates(routerHelper) {
        return [
            {
                state: 'app.system',
                config: {
                    abstract: true,
                    url: '',
                    templateUrl: 'app/core/view/fade-out.html',
                    title: 'System',
                    ncyBreadcrumb: {
                        label: 'System Menu'
                    }
                }
            },
            {
                state: 'app.system.security',
                config: {
                    url: '/security',
                    abstract: true,
                    title: 'Security',
                    templateUrl: 'app/core/view/menu_show.html',
                    ncyBreadcrumb: {
                        label: 'Security'
                    }
                }
            },
            //USER
            {
                state: 'app.system.security.user',
                config: {
                    abstract: true,
                    url: '/user',
                    templateUrl: 'app/core/view/main-page.html',
                    ncyBreadcrumb: {
                        skip: true
                    }
                }
            },
            {
                state: 'app.system.security.user.list',
                config: {
                    url: '',
                    templateUrl: 'app/system/security/user/user.html',
                    title: 'User List',
                    ncyBreadcrumb: {
                        label: 'User List'
                    },
                    data: {
                        authorizedRoles: ["USER_VIEW"],
                        pagetitle: 'Modules.System.user_page.list.page_title',
                        pagedesc: 'Modules.System.user_page.list.page_desc'
                    },

                    resolve: routerHelper.loadSequence('kendoUi','system.User'),
                    controller: 'userController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.system.security.user.edit',
                config: {
                    url: '/:id',
                    templateUrl: 'app/system/security/user/user.edit.html',
                    title: 'User Edit',
                    ncyBreadcrumb: {
                        label: 'User Edit'
                    },
                    data: {
                        authorizedRoles: ["USER_EDIT", "USER_CREATE"],
                        pagetitle: 'Modules.System.user_page.edit.page_title',
                        pagedesc: 'Modules.System.user_page.edit.page_desc'
                    },
                    resolve: routerHelper.loadSequence('ui.select','system.User', 'system.Role'),
                    controller: 'userEditController',
                    controllerAs: 'vm'
                }
            },
            //Role
            {
                state: 'app.system.security.role',
                config: {
                    abstract: true,
                    url: '/role',
                    templateUrl: 'app/core/view/main-page.html',
                    ncyBreadcrumb: {
                        skip: true
                    }
                }
            },
            {
                state: 'app.system.security.role.list',
                config: {
                    url: '',
                    templateUrl: 'app/system/security/role/role.html',
                    title: 'Role List',
                    ncyBreadcrumb: {
                        label: 'Role List'
                    },
                    data: {
                        authorizedRoles: ["ROLE_VIEW"],
                        pagetitle: 'Modules.System.role_page.list.page_title',
                        pagedesc: 'Modules.System.role_page.list.page_desc'
                    },

                    resolve: routerHelper.loadSequence('kendoUi','system.Role'),
                    controller: 'roleController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.system.security.role.edit',
                config: {
                    url: '/:id',
                    templateUrl: 'app/system/security/role/role.edit.html',
                    title: 'Role Edit',
                    ncyBreadcrumb: {
                        label: 'Role Edit'
                    },
                    data: {
                        authorizedRoles: ["ROLE_EDIT", "ROLE_CREATE"],
                        pagetitle: 'Modules.System.role_page.edit.page_title',
                        pagedesc: 'Modules.System.role_page.edit.page_desc'
                    },
                    resolve: routerHelper.loadSequence('ngTable','system.Permission','system.Menu', 'system.Role'),
                    controller: 'roleEditController',
                    controllerAs: 'vm'
                }
            },
            //Permission
            {
                state: 'app.system.security.permission',
                config: {
                    abstract: true,
                    url: '/permission',
                    templateUrl: 'app/core/view/main-page.html',
                    ncyBreadcrumb: {
                        skip: true
                    }
                }
            },
            {
                state: 'app.system.security.permission.list',
                config: {
                    url: '',
                    templateUrl: 'app/system/security/permission/permission.html',
                    title: 'Permission List',
                    ncyBreadcrumb: {
                        label: 'Permission List'
                    },
                    data: {
                        authorizedRoles: ["PERMISSION_VIEW"],
                        pagetitle: 'Modules.System.permission_page.list.page_title',
                        pagedesc: 'Modules.System.permission_page.list.page_desc'
                    },

                    resolve: routerHelper.loadSequence('kendoUi','system.Permission'),
                    controller: 'permissionController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.system.security.permission.edit',
                config: {
                    url: '/:id',
                    templateUrl: 'app/system/security/permission/permission.edit.html',
                    title: 'Permission Edit',
                    ncyBreadcrumb: {
                        label: 'Permission Edit'
                    },
                    data: {
                        authorizedRoles: ["PERMISSION_EDIT", "PERMISSION_CREATE"],
                        pagetitle: 'Modules.System.permission_page.edit.page_title',
                        pagedesc: 'Modules.System.permission_page.edit.page_desc'
                    },
                    resolve: routerHelper.loadSequence('system.Permission'),
                    controller: 'permissionEditController',
                    controllerAs: 'vm'
                }
            },
            //Menu
            {
                state: 'app.system.security.menu',
                config: {
                    abstract: true,
                    url: '/menu',
                    templateUrl: 'app/core/view/main-page.html',
                    ncyBreadcrumb: {
                        skip: true
                    }
                }
            },
            {
                state: 'app.system.security.menu.list',
                config: {
                    url: '',
                    templateUrl: 'app/system/security/menu/menu.html',
                    title: 'Menu List',
                    ncyBreadcrumb: {
                        label: 'Menu List'
                    },
                    data: {
                        authorizedRoles: ["MENU_VIEW"],
                        pagetitle: 'Modules.System.menu_page.list.page_title',
                        pagedesc: 'Modules.System.menu_page.list.page_desc'
                    },

                    resolve: routerHelper.loadSequence('kendoUi','system.Menu'),
                    controller: 'menuController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.system.security.menu.edit',
                config: {
                    url: '/:id',
                    templateUrl: 'app/system/security/menu/menu.edit.html',
                    title: 'Menu Edit',
                    params : {copydata: null},
                    ncyBreadcrumb: {
                        label: 'Menu Edit'
                    },
                    data: {
                        authorizedRoles: ["MENU_EDIT", "MENU_CREATE"],
                        pagetitle: 'Modules.System.menu_page.edit.page_title',
                        pagedesc: 'Modules.System.menu_page.edit.page_desc'
                    },
                    resolve: routerHelper.loadSequence('ui.select','touchspin','system.Menu'),
                    controller: 'menuEditController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
