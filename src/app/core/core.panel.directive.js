/**
 * Created by abhe on 8/17/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('ctPaneltool', ctPaneltool);

    ctPaneltool.$inject = ['$rootScope', 'toggleHelper'];
    function ctPaneltool($rootScope, toggleHelper) {
	
		var templates = {
			/* jshint multistr: true */
			collapse: "<a href='#' class='btn btn-transparent btn-sm' panel-collapse='' tooltip-placement='top' tooltip='Collapse' ng-click='{{panelId}} = !{{panelId}}' ng-init='{{panelId}}=false'>" + "<i ng-if='{{panelId}}' class='ti-plus'></i>" + "<i ng-if='!{{panelId}}' class='ti-minus'></i>" + "</a>",
			dismiss: "<a href='#' class='btn btn-transparent btn-sm' panel-dismiss='' tooltip-placement='top' tooltip='Close'>" + "<i class='ti-close'></i>" + "</a>",
			refresh: "<a href='#' class='btn btn-transparent btn-sm' panel-refresh='' tooltip-placement='top' tooltip='Refresh' data-spinner='{{spinner}}'>" + "<i class='ti-reload'></i>" + "</a>"
		};

        var directive = {
            template: link,
            restrict: 'E'
        };
        return directive;

        function link(elem, attrs) {
            var temp = '';
            if (attrs.toolCollapse)
                temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')));
            if (attrs.toolDismiss)
                temp += templates.dismiss;
            if (attrs.toolRefresh)
                temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            return temp;
        }
    }

})();