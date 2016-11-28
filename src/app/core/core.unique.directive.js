(function() {
    'use strict';
	
	angular
        .module('app.core')
		.factory('uniqueService', uniqueService)
		.directive('wcUnique', wcUnique);
   
   
   uniqueService.$inject = ['$resource', 'globalConstants', '$http', '$q'];
   function uniqueService($resource, globalConstants, $http, $q) {
	   
	   var service = {
            checkUniqueValue: checkUniqueValue
        };

        return service;
	   
	   function checkUniqueValue(key, property, value) {
           var def = $q.defer();
		   var url;
		   
		   //mapping request here
		   if (key == 'users') {
			   url = globalConstants.apiUrl+'security/users?search=';
		   }
		   
		   
            $http.get(url+property+'_div_eq_div_'+value)
                .success(function(data) {
                    def.resolve(data.content);
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise; 
        }
    }
	
	wcUnique.$inject = ['uniqueService'];
    function wcUnique(uniqueService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function (e) {
                if (!ngModel || !element.val()) return;
                var keyProperty = scope.$eval(attrs.wcUnique);
                var currentValue = element.val();
                uniqueService.checkUniqueValue(keyProperty.key, keyProperty.property, currentValue)
                    .then(function (unique) {
                        //Ensure value that being checked hasn't changed
                        //since the Ajax call was made
                        if (currentValue == element.val()) { 
                            ngModel.$setValidity('unique', unique.length == 0);
                        }
                    }, function () {
                        //Probably want a more robust way to handle an error
                        //For this demo we'll set unique to true though
                        ngModel.$setValidity('unique', true);
                    });
            });
            }
        };
    }

})();