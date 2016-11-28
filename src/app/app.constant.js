/**
 * Created by abhe on 8/16/2015.
 */
angular.module('AppConstants', [])
	.constant('domain','http://localhost:8080')
    .constant('api','/iprime/api/oauth2/v1/')
    .constant('toastr', toastr)
    .constant('APP_MEDIAQUERY', {
        'desktopXL': 1200,
        'desktop': 992,
        'tablet': 768,
        'mobile': 480
    })
    /*
    .constant('JS_REQUIRES', {
        scripts: {
            //*** PLUGINS
            'modernizr': ['../bower_components/components-modernizr/modernizr.js'],
            'perfect-scrollbar-plugin': ['../bower_components/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js', '../bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css'],
            //*** My Script
            'system.User': ['app/system/security/user/system.user.controller.js', 'app/system/security/user/system.user.service.js'],
            'system.Role': ['app/system/security/role/system.role.service.js', 'app/system/security/role/system.role.controller.js'],
            'system.Permission': ['app/system/security/permission/system.permission.service.js', 'app/system/security/permission/system.permission.controller.js'],
            'system.Menu': ['app/system/security/menu/system.menu.service.js', 'app/system/security/menu/system.menu.controller.js'],
            'ereport.Group': ['app/ereport/reportGroup/ereport.reportGroup.service.js', 'app/ereport/reportGroup/ereport.reportGroup.controller.js'],
            'ereport.Item': ['app/ereport/reportItem/ereport.reportItem.service.js', 'app/ereport/reportItem/ereport.reportItem.controller.js']
        },
        modules: [{
            name: 'kendoUi',
            files: ['../bower_components/kendo/kendo.custom.js', '../bower_components/kendo/kendo.common-bootstrap.css'
                , '../bower_components/kendo/kendo.custom.css', '../bower_components/kendo/jszip.min.js'  ]
            //files: ['../bower_components/kendo/jszip.min.js']
        },{
            name: 'IVHTreeview',
            files: ['../bower_components/angular-ivh-treeview/dist/ivh-treeview.min.js', '../bower_components/angular-ivh-treeview/dist/ivh-treeview.min.css']
        },{
            name: 'ngTable',
            files: ['../bower_components/ng-table/dist/ng-table.min.js', '../bower_components/ng-table/dist/ng-table.min.css']
        }, {
            name: 'ui.select',
            files: ['../bower_components/angular-ui-select/dist/select.min.js', '../bower_components/angular-ui-select/dist/select.min.css', '../bower_components/select2/dist/css/select2.min.css', '../bower_components/select2-bootstrap-css/select2-bootstrap.min.css', '../bower_components/selectize/dist/css/selectize.bootstrap3.css']
        },
        {
            name: 'touchspin',
            files: ['../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css']
        },
        {
            name: 'ckeditor',
            files: ['../bower_components/ckeditor/ckeditor.js','../bower_components/angular-ckeditor/angular-ckeditor.min.js']
        }]
    })
    */

    .constant('JS_REQUIRES', {
        scripts: {
            //*** PLUGINS
            'modernizr': [],
            'perfect-scrollbar-plugin': ['assets/otherlib/perfect-scrollbar/css/perfect-scrollbar.min.css'],
            //*** My Script
            'system.User': [],
            'system.Role': [],
            'system.Permission': [],
            'system.Menu': [],
            'ereport.Group': [],
            'ereport.Item': []
        },
        modules: [{
            name: 'kendoUi',
            files: ['assets/otherlib/kendo/kendo.culture.id-ID.min.js', 'assets/otherlib/kendo/kendo.custom.js', 'assets/otherlib/kendo/kendo.common-bootstrap.css'
                , 'assets/otherlib/kendo/kendo.custom.css', 'assets/otherlib/kendo/jszip.min.js'  ]
            //files: ['../bower_components/kendo/jszip.min.js']
        },{
            name: 'IVHTreeview',
            files: ['assets/otherlib/angular-ivh-treeview/dist/ivh-treeview.min.js', 'assets/otherlib/angular-ivh-treeview/dist/ivh-treeview.min.css']
        },{
            name: 'ngTable',
            files: ['assets/otherlib/ng-table/dist/ng-table.min.js', 'assets/otherlib/ng-table/dist/ng-table.min.css']
        }, {
            name: 'ui.select',
            files: ['assets/otherlib/angular-ui-select/dist/select.min.js', 'assets/otherlib/angular-ui-select/dist/select.min.css', 'assets/otherlib/select2/dist/css/select2.min.css', 'assets/otherlib/select2-bootstrap-css/select2-bootstrap.min.css', 'assets/otherlib/selectize/dist/css/selectize.bootstrap3.css']
        },
            {
                name: 'touchspin',
                files: ['assets/otherlib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'assets/otherlib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css']
            },
            {
                name: 'ckeditor',
                files: ['assets/otherlib/ckeditor/ckeditor.js','assets/otherlib/angular-ckeditor/angular-ckeditor.min.js']
            }]
    })


    .service('globalConstants',['domain', 'api', function(domain, api){

        this.apiUrl = domain+api;

        this.urlInfo = {
            OAUTH_SERVER : domain,
            TOKEN_URL : '/iprime/oauth/token',
            PASSWORD_GRANT_TYPE: 'grant_type=password',
            REFRESH_GRANT_TYPE: 'grant_type=refresh_token',
            CLIENT_ID:'iprimeOSClient',
            CLIENT_SECRET: 'top_secret',
            LOGOUT_URL:'logout'
        };


    }]);