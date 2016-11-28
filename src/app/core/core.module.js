/**
 * Created by abhe on 8/16/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.core', [
            'iprimeUtility.exception',
            'iprimeUtility.misc',
            'iprimeUtility.router',
            'AppConstants',
            'cfp.loadingBar',
            'cfp.loadingBarInterceptor',
            'pascalprecht.translate',
            'ngStorage',
            'ngCookies'
        ]);
})();
