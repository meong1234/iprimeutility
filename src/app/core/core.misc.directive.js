/**
 * Created by abhe on 8/17/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('touchspin', touchspin);

    function touchspin () {

        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, elem, attr) {
            var tsOptions = [
                'initval',
                'min',
                'max',
                'step',
                'forcestepdivisibility',
                'decimals',
                'stepinterval',
                'stepintervaldelay',
                'verticalbuttons',
                'verticalupclass',
                'verticaldownclass',
                'prefix',
                'postfix',
                'prefix_extraclass',
                'postfix_extraclass',
                'booster',
                'boostat',
                'maxboostedstep',
                'mousewheel',
                'buttondown_class',
                'buttonup_class'
            ];
            var options = {};
            for(var i = 0, l = tsOptions.length; i < l; i++) {
                var opt = tsOptions[i];
                if(attr[opt] !== undefined) {
                    options[opt] = attr[opt];
                }
            }
            elem.TouchSpin(options);
        }
    }
})();