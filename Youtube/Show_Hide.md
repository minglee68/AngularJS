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



</div>
...
~~~

