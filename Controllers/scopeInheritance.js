(function(angular){
	'use strict';

	var myApp = angular.module('scopeInheritance', []);
	
	myApp.controller('MainController', ['$scope', function($scope) {
		$scope.timeOfDay = 'mornig';
		$scope.name = 'Nikki';
	}]);

	myApp.controller('ChildController', ['$scope', function($scope) {
		$scope.name = 'John';
	}]);

	myApp.controller('GrandChildController', ['$scope', function($scope) {
		$scope.timeOfDay = 'evening';
	}]);
})(window.angular);
