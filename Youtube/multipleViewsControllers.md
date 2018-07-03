AngularJS - How to use Multiple Views and Multiple Controllers
===============================================================
여기에선 Multiple View와 Multiple Controller를 어떻게 다루는지 볼 것이다.  
  
Multiple Views, One Controller
------------------------------
바로 예제로 들어가서 1개의 Controller를 여러개의 View에서 사용하는 방법을 봐보자.  
  
~~~
// exam2.js
var app2 = angular.module('app2', []);

app2.controller('ctrl1', function($scope) {
	
});
~~~
  
~~~
// angulartut2.html
<!DOCTYPE html>
<html ng-app="app2">
	<head>
		<title>Example</title>
	</head>
	<body>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam2.js"></script>
	</body>
</html>
~~~
위의 예제가 기본적인 틀이다. Overview의 예제의 기본 틀과 안달라 보이지만, 자세히 보면 Module의 이름이 `app2`로 바뀌어 있다. 이로 인해서 HTML 파일에서 `ng-app`로 Module을 부를 때에도 `app2`의 이름으로 부르고 있다.  
  
여기에서 HTML 파일의 body tag안에 2개의 View를 더할 것이다.  
  
~~~
// angulartut2.html
...
<body>
	<h4 ng-controller="ctrl1">First Random Number : {{randomNum1}}</h4>
	<h4 ng-controller="ctrl1">Second Random Number : {{randomNum1}}</h4>
...
~~~
위의 예제를 보면 `ng-controller`를 2번 부름으로서 View를 2개를 만들었는데, 둘 다 `ctrl1` Controller를 사용하고 있다. 그리고 Expression에서도 사용하는 property가 같은 것을 알 수 있다.  
  
그러면 이제 JavaScript 파일에 필요한 데이터를 넣어보자.  
  
~~~
// exam2.js
var app2 = angular.module('app2', []);

app2.controller('ctrl1', function($scope) {
	$scope.randomNum1 = Math.floor((Math.random() * 10) + 1);

});
~~~
위의 예제를 보면 Controller의 이름은 Overview의 예제와 같은 `'ctrl1'`이다. 여기에서 JavaScript의 Built-in 함수를 사용해서 Random Number를 만든 뒤 그것을 `$scope.randomNum1`안에 넣었다.   
  
결과적으로 2개의 다른 View가 같은 Controller 'ctrl1', 같은 이름의 property 'randomNum1'을 사용하지만 다른 값을 출력하고 있는 것을 확인할 수 있다. 
  
  
  
Multiple Controllers
---------------------
여러개의 Controller를 다루는 방법을 알아보자.  
먼저 JavaScript 파일에 여러개의 Controller를 만든다.   
  
~~~
// exam2.js

~~~





