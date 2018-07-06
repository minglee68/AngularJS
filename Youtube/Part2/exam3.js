var app3 = angular.module('app3', []);

app3.controller('heroCtrl', function($scope, $rootscope){
	$scope.hero = [
		{realName: "Bruce Wayne", heroName: "Batman"},
		{realName: "Clark Kent", heroName: "Superman"}
	];

	$scope.getHeroData = function(){
		heroSearch($scope.heroName);
	};

	function heroSearch(name){
		$scope.heroData = "Not Found";
		for (var i = 0; i < $scope.hero.length; i++){
			if ($scope.hero[i].heroName === name) {
				$scope.heroData = $scope.hero[i].realName + " is " + $scope.hero[i].heroName;
			}
		}
	};
});
