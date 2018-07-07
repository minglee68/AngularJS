AngularJS $rootScope
====================
AngularJS의 중요한 점들 중 하나가 바로 Scope의 개념이다. 이 Tutorial을 진행하면서 계속 얘기한 것 처럼 특정 HTML Element에서 `ng-controller`로 어떤 Controller를 시작하면 그 Element와 그 안에있는 다른 Element들을 위한 Scope가 생긴다. 만일 같은 층에서 두 개의 다른 HTML Element들이 같은 Controller를 `ng-controller`로 불러냈다고 해도 그들은 다른 Scope를 갖는다. 하지만 이 두 개의 다른 Scope들은 결국 `ng-app`로 시작된 하나의 큰 RootScope안에 있는 Scope들이다. 이 개념을 잘 이해하기 위해서 아래의 예제들을 해보자.   
  

### angulartut3.html

~~~
// angulartut3.html
<!DOCTYPE html>
<html ng-app="app3" ng-cloak>
	<head>
		<title>Example</title>
		<style>
		[ng\cloak], [ng-cloak], .ng-cloak {
			display: none;
		}
		</style>
	</head>
	<body>
		<div ng-controller="heroCtrl">
		
			<label>Hero to Search for : </label>

			<input type="text" ng-model="heroName" />
			<br><br>

			<button ng-click="getHeroData()">Submit</button>
			<br><br>

			{{heroData}}<br>

		</div>

		<div ng-controller="heroCtrl">

			<label>Hero Name : </label>
			<input type="text" ng-model="heroName" />
			<br><br>
			
			<label>Real Name : </label>
			<input type="text" ng-model="realName" />
			<br><br>

			<button ng-click="addHeroData(realName, heroName)">Add</button>


		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam3.js"></script>
	</body>
</html>
~~~
제일 먼저 HTML부터 보고 가자. html tag에서 `ng-app`로 `app3` Module를 부르고 있고, `ng-cloak`로 AngularJS의 Compile이 다 끝나고 출력이 될 때까지 페이지를 출력하지 않게 한다. 그리고 body 부분 안을 보면 같은 층에 div element가 2개가 있는데, 둘 다 `ng-controller`로 `heroCtrl` Controller를 부르고 있다.   
  
아까 위에서 말했듯이 이 두 div element들은 서로 다른 View, Scope를 가지게 된다. 따라서 어느 한 쪽에서 자신의 Scope에 어떤 property나 함수를 더한다면 그 property나 함수는 다른 Scope에서 사용할 수 없다는 것이다. 하지만 여기에선 그 두가지를 연결할 수 있는 방법을 볼 것이다.  그것을 이해하기 위해서 각 div element들을 자세히 들여다보자.   
  
먼저 첫번째 div element는 Hero 정보를 Search하기 위한 div element이다. input element로 Text Box를 만들어서 입력된 값을 `ng-model`로 `$scope.heroName`에 넣는다. 그리고 다음에 나오는 버튼을 누르면 `ng-click`로 `$scope.getHeroData()`함수를 불러서 결과를 `$scope.heroData`를 Expression으로 출력한다.   
  
다음으로 두번째 div element는 Hero 정보를 더하기 위한 div element이다. input element 2개로 처음에는 Hero명, 두번째는 본명을 입력 받아서 그것을 각각 `ng-model`로 `$scope.heroName`과 `$scope.realName`에 입력한 후, 버튼을 누르면 `ng-click`으로 `addHeroData()`함수에 `herName`과 `realName`을 보내서 정보를 더한다.   
  
하지만 여기에서 문제점이 하나 있다. 두번째 div element에서 Hero정보를 더해도 Scope가 다르기 때문에 그것이 첫번째 div element에도 적용되지 않는 다는 점이다. 이 문제점을 해결하기 위해서 exam3.js에서 `$rootScope`와 `$broadcast`를 사용한다. 이 Service들의 사용법을 알아보자.  
  


### exam3.js
  
~~~
// exam3.js
var app3 = angular.module('app3', []);

app3.controller('heroCtrl', function($scope, $rootScope){
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

	$scope.addHeroData = function(realName, heroName){
		$rootScope.$broadcast("heroUpdated", {realName: realName, heroName, heroName});
		console.log("Real : " + realName + " Hero : " + heroName);
	};

	$scope.$on("heroUpdated", function(event, args){
		$scope.hero.push({realName: args.realName, heroName: args.heroName});
	});

});
~~~
일단 먼저 첫번째 줄에서 이 Module의 이름을 `app3`으로 지정해준다. 그런뒤 이 Module의 Controller, `heroCtrl`를 하나 만든다. 여기에서 만들 때에 중요한 점은 이 Controller의 Factory function에 `$scope`뿐만이 아니라 `$rootScope`도 같이 넣는 것이다. 이 다음부터 하나씩 차례대로 봐보자.  
  
먼저 `$scope.hero`라는 object array를 만든다. 여기에는 초기화로 'Batman'과 'Superman'에 대한 정보가 들어가있다. 다음으로 `$scope.getHeroData`함수를 만든다. HTML에서 받았을 $scope.heroName을 `heroSearch`라는 함수에 보내는 역할이다.  
  
다음으로 `heroSearch()`함수를 define한다. 먼저 찾으려는 hero의 이름을 `name`으로 받는다. 그런 뒤 HTML에서 결과로 출력할 `$scope.heroData` property를 만드는데, 먼저 "Not Found"를 넣어 놓는다. 다음으로 for문을 이용해서 현재 `$scope.hero` object array에 있는 object들의 개수만큼 반복을 하면서, 각각의 `heroName` Field의 값과 입력받은 `name`을 비교한다. 만약에 일치하면 일치한 object의 정보를 `$scope.heroData`에 넣어서 HTML에서 출력하게 만들고, 전혀 일치하지 않는다면 원래 처음에 넣은 "Not Found"가 출력되도록 한다.   
  
이 다음부터가 중요하다. 먼저 `$scope.addHeroData()`함수를 만드는데, 이 때에 HTML에서 입력으로 보내는 `realName`과 `heroName` property를 받는다. 이것들은 원래 `$scope.hero`안에 있는 Field들의 `$scope.hero.realName`과 `$scope.hero.heroName`과 전혀 다른 새로운 property들이다. 여기에서 두 가지의 새로운 것, `$rootScope`와 `$broadcast`가 나온다.  
  
`$rootScope`는 말 그대로 모든 Scope들의 근원이 되는 Root Scope라고 생각하면 된다. Scope도 Tree형식을 갖추고 있는데, 그 모든 Scope들의 가장 위에 있는 Scope가 Root Scope이다. 다음으로 그 `$rootScope`에서 사용하는 `$broadcast`는 영단어의 뜻대로 어떤 특정 Scope에서 일어난 변화를 다른 Scope들에게 '방송'하기 위한 것이라고 생각하면 된다. 이것으로 어떤 특정 Scope에서 어떤 Event가 일어났다는 것을 `$rootScope`를 통해서 특정 이름으로 다른 Scope들에게 널리 알려서, 다른 Scope들은 그 Event를 그 Event의 특정 이름을 사용해서 `$on`으로 받아들이는 것이다. 실제로 써보면 더 이해하기 편할 것이다.  
  
지금 우리는 `$scope.addHeroData`함수에서 `$rootScope.$broadcast`를 통해서 `"heroUpdated"`라는 이름으로 Hero의 정보가 입력된 것을 알린다. 이것을 알릴 때에 Event의 이름 뿐만이 아니라 입력된 정보를 object형식으로 뒤에 붙여서 `{realName(field): realName(입력받은 값), heroName(field): heroName(입력받은 값)}`으로 보낸다. 그러면서 console.log에도 어떤 Hero 정보가 입력되었는지 알아본다.  
  
마지막으로 `$scope.$on()`함수로 `$rootScope`에 `$broadcast`된 Event를 받는다. 여기에선 `"heroUpdated"`라는 이름으로 된 `$broadcast`를 `event` property로 받고, 그 `$broadcast`로 보내지는 값들을 `args` property로 받는다. 그리고 그것을 지금의 `$scope.hero`에 더하기 위해서 `$scope.hero.push()`로 받은 값을 보낸다. 









