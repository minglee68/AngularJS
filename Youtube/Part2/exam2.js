var app2 = angular.module('app2', []);

app2.controller('userCtrl', function($scope) {
	$scope.user = [{
		fName: "Derek",
		lName: "Banas",
		subscribe: "Subscribe",
		delivery: "Email"
	}];

	$scope.saveUser = function(userInfo){
		if($scope.userForm.$valid){
			$scope.user.push({
				fName: userInfo.fName,
				lName: userInfo.lName,
				street: userInfo.street,
				subscribe: userInfo.subscribe,
				delivery: userInfo.delivery
			});
			console.log('User Saved');
		} else {
			console.log("Error: Couldn't Save User");
		}
	};
});
