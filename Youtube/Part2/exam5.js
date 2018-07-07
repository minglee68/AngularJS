var app5 = angular.module('app5', ['weatherFilters']);

app5.controller('mainCtrl', function($scope) {
	
  	$scope.student = {
      		gpas:[
        		{name: "George Thomas", gpa: 3.5},
        		{name: "Susy Smith", gpa: 3.6},
        		{name: "Paul Marks", gpa: 3.2},
        		{name: "Sue Edgar", gpa: 3.8}
      		]
  	};

	$scope.currDate = new Date();

	$scope.randomStr = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
 
  	$scope.randArray = [
    		"Tomato",
    		"Potato",
    		"Bread",
    		"Pickles",
    		"Raisins"
  	];
 
  	$scope.weather = [
    		{day: "Monday", rain: false},
    		{day: "Tuesday", rain: true}
  	];
});
