/**
 * Created by abhe on 8/17/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('toggleHelper', toggleHelper)
        .directive('ctToggle', ctToggle)
        .directive('toggleable', toggleable);

    toggleHelper.$inject = ['$rootScope'];
    function toggleHelper($rootScope) {

        var events = {
            toggle: 'clip-two.toggle',
            toggleByClass: 'clip-two.toggleByClass',
            togglerLinked: 'clip-two.linked',
            toggleableToggled: 'clip-two.toggled'
        }

        var commands = {
            alternate: 'toggle',
            activate: 'on',
            deactivate: 'off'
        }

        var service = {
            events: events,
            commands: commands,
            toggle: toggle,
            toggleByClass: toggleByClass,
            notifyToggleState: notifyToggleState,
            toggleStateChanged: toggleStateChanged,
            applyCommand: applyCommand,
            updateElemClasses: updateElemClasses
        };

        return service;

        function toggle (target, command) {
            if (command == null) {
                command = 'toggle';
            }
            $rootScope.$emit(events.toggle, target, command);
        }

        function toggleByClass (targetClass, command) {
            if (command == null) {
                command = 'toggle';
            }
            $rootScope.$emit(events.toggleByClass, targetClass, command);
        }

        function notifyToggleState (elem, attrs, toggleState) {
            $rootScope.$emit(events.toggleableToggled, attrs.id, toggleState, attrs.exclusionGroup);
        }

        function toggleStateChanged (elem, attrs, toggleState) {
            updateElemClasses(elem, attrs, toggleState);
            notifyToggleState(elem, attrs, toggleState);
        }

        function applyCommand (command, oldState) {
            switch (command) {
                case commands.activate:
                    return true;
                case commands.deactivate:
                    return false;
                case commands.alternate:
                    return !oldState;
            }
        }

        function updateElemClasses (elem, attrs, active) {

            if (active) {
                if (attrs.activeClass) {
                    elem.addClass(attrs.activeClass);
                }
                if (attrs.inactiveClass) {
                    elem.removeClass(attrs.inactiveClass);
                }
                var parent = elem.parent();
                if (attrs.parentActiveClass) {
                    parent.addClass(attrs.parentActiveClass);
                }
                if (attrs.parentInactiveClass) {
                    parent.removeClass(attrs.parentInactiveClass);
                }
            } else {
                if (attrs.inactiveClass) {
                    elem.addClass(attrs.inactiveClass);
                }
                if (attrs.activeClass) {
                    elem.removeClass(attrs.activeClass);
                }
                var parent = elem.parent();
                if (attrs.parentInactiveClass) {
                    parent.addClass(attrs.parentInactiveClass);
                }
                if (attrs.parentActiveClass) {
                    parent.removeClass(attrs.parentActiveClass);
                }
            }
        }
    }

    ctToggle.$inject = ['$rootScope', 'toggleHelper'];
    function ctToggle($rootScope, toggleHelper) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, elem, attrs) {
            var command = attrs.ctToggle || toggleHelper.commands.alternate;
            var target = attrs.target;
            var targetClass = attrs.targetClass;
            var bubble = attrs.bubble === "true" || attrs.bubble === "1" || attrs.bubble === 1 || attrs.bubble === "" || attrs.bubble === "bubble";

            if ((!target) && attrs.href) {
                target = attrs.href.slice(1);
            }

            if (!(target || targetClass)) {
                throw "'target' or 'target-class' attribute required with 'ct-toggle'";
            }
            elem.on("click tap", function (e) {

                var angularElem = angular.element(e.target);
                if (!angularElem.hasClass("disabled")) {
                    if (target != null) {
                        toggleHelper.toggle(target, command);
                    }
                    if (targetClass != null) {
                        toggleHelper.toggleByClass(targetClass, command);
                    }
                    if (!bubble) {
                        e.preventDefault();
                        return false;
                    } else {
                        return true;
                    }
                }

            });
            var unbindUpdateElemClasses = $rootScope.$on(toggleHelper.events.toggleableToggled, function (e, id, newState) {
                if (id === target) {
                    toggleHelper.updateElemClasses(elem, attrs, newState);
                }
            });

            if (target != null) {
                $rootScope.$emit(toggleHelper.events.togglerLinked, target);
            }

            scope.$on('$destroy', unbindUpdateElemClasses);
        }
    }


    toggleable.$inject = ['$rootScope', 'toggleHelper'];
    function toggleable($rootScope, toggleHelper) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, elem, attrs) {
            var toggleState = false;

            if (attrs["default"]) {
                switch (attrs["default"]) {
                    case "active":
                        toggleState = true;
                        break;
                    case "inactive":
                        toggleState = false;
                }
                toggleHelper.toggleStateChanged(elem, attrs, toggleState);
            }

            var unbindToggle = $rootScope.$on(toggleHelper.events.toggle, function (e, target, command) {
                var oldState;
                if (target === attrs.id) {
                    oldState = toggleState;
                    toggleState = toggleHelper.applyCommand(command, oldState);
                    if (oldState !== toggleState) {
                        toggleHelper.toggleStateChanged(elem, attrs, toggleState);
                    }
                }
            });

            var unbindToggleByClass = $rootScope.$on(toggleHelper.events.toggleByClass, function (e, targetClass, command) {
                var oldState;
                if (elem.hasClass(targetClass)) {
                    oldState = toggleState;
                    toggleState = toggleHelper.applyCommand(command, oldState);
                    if (oldState !== toggleState) {
                        toggleHelper.toggleStateChanged(elem, attrs, toggleState);
                    }
                }
            });

            var unbindToggleableToggled = $rootScope.$on(toggleHelper.events.toggleableToggled, function (e, target, newState, sameGroup) {
                if (newState && (attrs.id !== target) && (attrs.exclusionGroup === sameGroup) && (attrs.exclusionGroup != null)) {
                    toggleState = false;
                    toggleHelper.toggleStateChanged(elem, attrs, toggleState);
                }
            });

            var unbindTogglerLinked = $rootScope.$on(toggleHelper.events.togglerLinked, function (e, target) {
                if (attrs.id === target) {
                    toggleHelper.notifyToggleState(elem, attrs, toggleState);
                }
            });

            scope.$on('$destroy', function () {
                unbindToggle();
                unbindToggleByClass();
                unbindToggleableToggled();
                unbindTogglerLinked();
            });
        }
    }

})();