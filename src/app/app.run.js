/**
 * Created by abhe on 8/16/2015.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun);


    appRun.$inject = ['$rootScope', 'authservice'];
    function appRun($rootScope, authservice) {

        FastClick.attach(document.body);

        //authservice.login('iniabhe', 'abhe', function(){});

        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'IPrime', // name of your project
            author: 'IPrime', // author's name or company name
            description: 'IPrime', // brief description
            version: '1.0', // current version
            year: ((new Date()).getFullYear()),
            isMobile: (function () {// true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })(),
            layout: {
                isNavbarFixed: true, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                isFooterFixed: false, // true if you want to initialize the template with fixed footer
                theme: 'theme-2', // indicate the theme chosen for your project
                logo: 'assets/images/logo2.png', // relative path of the project logo
                logo1: 'assets/images/logo.png'
            }
        };

        $rootScope.user = {
            job: 'ng-Dev',
            picture: 'app/img/user/02.jpg'
        };


        $rootScope.title = 'iprime'
    }


})();
