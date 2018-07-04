AngularJS: Show and Hide Elements
===================================
여기에선 Event에 대해서 알아가보자.  

Event Counter
--------------
간단한 Event Counter로 어떤 Event들이 있는지 봐보자.  
  
~~~
//angulartut4.html
<!DOCTYPE html>
<html ng-app="app4" ng-cloak>
	<head>
		<title>Example</title>
		<style>
		[ng\:cloak], [ng-cloak], .ng-cloak {
			display: none;
		}
		.bluetext {
			color: blue;
		}
		.boldtext {
			font-weight: bold;
		}
		.stripedblue {
			color: #007FFF;
			background-color: #DBE9F4;
		}
		.stripedbeige {
			color: #CC0000;
			background-color: #F5F5DC
		}
		</style>
	</head>
	<body>
		<div ng-controller="eventCtrl">

		</div>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.js.min"></script>
			<script src="js/exam4.js"></script>
	</body>
</html>
~~~
위의 예제가 기본 틀이다. `ng-app`는 `app4` Module을 부르고 있고, `ng-cloak`기능도 넣었다. 그리고 앞으로의 예제에서 사용하게 될 몇가지 CSS들을 추가했다. 이 예제에서 View가 시작하는 곳은 body 안의 div element이다. `ng-controller`로 `"eventCtrl"` Controller를 부르고 있다.  
  
그럼 이제 어떤 Event들이 있는지 봐보자.  
  
~~~
//angulartut4.html
...
<div ng-controller="eventCtrl">

	<input ng-blur="blur = blur + 1" />

	<h4>Blur Events : {{blur}}</h4>

</div>
...
~~~
위의 코드는 사용자가 Text Box에 Focus할 때에 생기는 Blur Event가 일어날 때 마다 `blur`라는 property에 1을 더해줘서 횟수를 count하는 것이다. 이렇게 하고 밑에 예제처럼 새로운 Module 'app4'를 만든다.  
  
~~~
//exam4.js
var app4 = angular.module('app4', []);

app4.controller('eventCtrl', function($scope) {
	$scope.blur = 0;
});
~~~
이렇게 하고 실행을 하면 사용자가 Text Box에 Focurs할 때마다 Blur이 생기고, Focus를 풀면 밑의 Blur Events가 1이 늘어나는 것을 확인할 수 있다. 이와 같은 방식으로 모든 Event를 확인해보자.  
  
~~~
//angulartut4.html
...



...
~~~


