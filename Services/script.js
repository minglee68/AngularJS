(function(angular) {
	'use strict';
	var myServiceModule = angular.module('myServiceModule', []);
	myServiceModule.controller('MyController', ['$scope', 'notify', function($scope, notify) {
		$scope.callNotify = function(msg) {
			notify(msg);
		};
	}]);
	
	myServiceModule.factory('notify', ['$window', function(win) {
		var msgs = [];
		return function(msg) {
			if (msgs.length === 3) {
				win.alert(msgs.join('\n'));
				msgs = [];
			}	
		};
	}]);
})(window.angular);
