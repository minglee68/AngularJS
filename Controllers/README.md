Controller
===========
이것은 AngularJS의 Controller에 대한 이론적 설명과 예제이다.

What is Controller?
--------------------
AngularJS에서 Controller는 JavaScript의 Constructor Function으로 만들어 진다. Controller는 DOM에 많은 방법으로 불려질 수 있다. 그 모든 방법에서 AngularJS가 Controller의 Constructor Function을 사용해서 새로운 Controller Object를 만든다. 이렇게 해서 만들어지면 그 Controller까지 Scope가 늘어난다.  
* `ng-controller` directive는 새로운 **child scope** 를 만들고, `$scope`라는 이름으로 Controller의 Constructor Function의 parameter로 사용될 수 있게 된다.
* 여기서 얘기하는 `$scope`는 특정 Scope에 해당하는 Model을 얘기한다.
* '$route definition'의 route controller도 된다.
* Regular/Component directive의 Controller로 나뉜다.
  
  
만일 controller가 `controller as`형식으로 연결되면 그 scope의 property에 Controller의 instance가 만들어질 것이다. Controller는 `$scope` object의 초기화를 시키고, `$scope` object에 행동/작동 방식을 지정해준다. 하지만 이 Controller를 아래의 목적으로 사용하며 안 된다.  
* DOM을 조작하기 위해서 사용하면 안 된다. Controller는 오직 Logic을 저장하는 곳으로 사용해야 한다.
* Format 입력으로 사용하면 안된다. 
* Filter 출력으로 사용하면 안된다.
* 같은 코드를 다른 Controller에서 똑같이 사용하지 말아라. 대신에 Service를 사용해라.
* 다른 요소의 새로운 life-cycle이 되면 안 된다.
전체적으로 Controller는 너무 많은 일을 하면 안 된다. 그냥 한 view에 필요한 business logic을 가지고 있어야 한다. Controller의 길이를 줄이기 위해서 가장 효과적인 방법은 따로 있어도 되는 작업들은 다른 Service들에게 옮겨놓고, Controller에서 Dependency Injection으로 해당 Service를 부르는 방법이다.   
  
`$scope` object를 초기화 시키기
--------------------------------
일반적으로 새로운 application을 만들 때에 AngularJS의 `$scope`의 object들을 초기화시켜야 한다. 'Property'들을 `$scope` object에 넣는 것으로 초기화시킬 수 있다. Property들은 **view model**(view로 출력되는 model)을 갖고 있다. 변수라고 보면 된다. 이 `$scope`의 property들은 Template에서 `$scope.property`라는 형식으로 사용될 수 있다. `property`부분에 이름이 들어가면 된다. 예를 들자면 아래의 예제에서는 `GreetingController`라는 Controller를 만들고, 거기에서 `'Hello!'`라는 String을 가지고 있는 `greeting`이라는 property를 만든다.  

~~~
// 예제 1.1
// JavaScript File
var myApp = angular.module('myApp', []);

myApp.controller('GreetingController', ['$scope', function($scope) {
	$scope.greeting = 'Hello!';
}]);
~~~

위의 예제 1.1 에서 우리는 `myApp`이라는 AngularJS Module을 만들었고, 그다음에 `GreetingController`의 constructor function을 `.controller()` method로 만들었다. 

~~~
// 예제 1.2
// HTML File
<div ng-controller="GreetingController">
	{{ greeting }}
</div>
~~~

그리고 예제 1.1에서 만든 Controller를 예제 2.2에서 `ng-controller` directive를 사용해서 DOM과 연결시켰고, `greeting` property가 Template에 들어가도록 만들었다.


`$scope` object에 행동을 넣기
-----------------------------
어떤 특정의 이벤트에 작동하거나 특정 계산을 View에서 하기 위해선 Scope에 그 행동의 방식을 지정해줘야 한다. 지정해주기 위해서는 `$scope` object에 method를 지정해주면 된다. 이 method들은 template/view에 의해서 사용될 수 있다. 아래의 예제는 Controller에 method를 더하는 방법이다.  

~~~
// 예제 1.3
// JavaScript File
var myApp = angular.module('myApp', []);

myApp.controller('DoubleController', ['$scope', function($scope) {
	$scope.double = function(value) { return value * 2; };
}]);
~~~

위의 예제 1.3에서는 'double'이라는 함수를 function expression으로 선언한다. 'double'함수가 하는 일은 단순히 어떤 값을 'value'변수로 받으면 그 값에 곱하기 2를 해서 반환하는 것이다. 이 Controller를 DOM에 추가하면 Template의 AngularJS Expression에서 `double`이라는 method를 사용할 수 있다.   

~~~
// 예제 1.4
// HTML File
<div ng-controller="GreetingController">
	Two times <input ng-model="num"> equals {{ double(num) }}
</div>
~~~

위의 예제 1.4에서는 예제 1.3에서 만든 Controller를 추가해서 Template의 expression에서 `double()`함수를 사용하게 된다. 그리고 해당 Scope안에서 어떤 변수에 값을 넣을 때에 무조건 그 변수는 (ng-model에 넣음으로서)Model의 property가 되어야지 AngularJS에서 사용할 수 있다.



Spicy Controller Example
---------------------------
Controller의 역할과 사용법을 익히기 위해서 Spicy Controller라는 작은 Controller를 만들어 볼 것이다.  
먼저 아래와 같은 요소들을 지니는 Application을 하나 만든다.  
* 버튼 두 개와 단순한 메시지 하나를 가진 Template
* string을 지니는 `spice`라는 property를 가진 Model
* `spice`의 값을 정하는 두 함수를 가지고 있는 Controller
이 Template의 메시지는 `spice` model의 binding을 가지고 있다. `spice`의 기본값은 "very"이고, 사용자가 누르는 버튼에 따라서 `spice`가 "chili"가 되거나 "jalapeno"가 된다. 그리고 메시지는 data-binding으로 자동으로 update된다.

### 1. Simple Spicy Controller

~~~
// spicy1.js
(function(angular){
	'use strict';

	var myApp = angular.module('spicyApp1', []);
	
	myApp.controller('SpicyController', ['$scope', function($scope) {
		$scope.spice = "very";

		$scope.chiliSpicy = function(){
			$scope.spice = "chili";
		};

		$scope.jalapenoSpicy = function(){
			$scope.spice = "jalapeno";
		};
	}]);
})(window.angular);
~~~

~~~
// spicy1.html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Controller Example</title>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="spicy1.js"></script>
	</head>
	<body ng-app="spicyApp1">
		<div ng-controller="SpicyController">
			<button ng-click="chiliSpicy()">Chili</button>
			<button ng-click="jalapenoSpicy()">Jalapeno</button>
			<p>The food is {{spice}} spicy!</p>
		</div>
	</body>
</html>
~~~
위의 예제에서 알아야할 사항들:  
* `ng-controller` directive가 이 Template의 Scope를 만들고, 이 Scope는 `SpicyController` Controller로 관리된다.
* `SpicyController`는 기본적인 JavaScript 함수이다. 전통적으로 Controller의 이름은 대문자로 시작하고, 뒤에 "Controller"라는 이름을 붙인다.
* `$scope`에 property를 더함으로서 Model을 새로 만들거나 update를 한다. 
* `chiliSpicy`함수에서 보여지듯이, Controller method는 직접 `$scope`로 더해질 수 있다. 
* Controller의 method나 property들은 그 Template에서 사용될 수 있다. (\<div\> element와 그 child element들, \<button\>이나 \<p\>에서)    
  
  
### 2. Spicy Controller with Arguments

Controller는 아래와 같이 argument도 받을 수 있다.  

~~~
// spicy2.js
(function(angular){
	'use strict';

	var myApp = angular.module('spicyApp2', []);
	
	myApp.controller('SpicyController', ['$scope', function($scope) {
		$scope.customSpice = "wasabi"
		$scope.spice = "very";

		$scope.spicy = function(spice) {
			$scope.spice = spice;
		};
	}]);
})(window.angular);
~~~

~~~
// spicy2.html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Controller Example</title>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="spicy2.js"></script>
	</head>
	<body ng-app="spicyApp2">
		<div ng-controller="SpicyController">
			<input ng-model="customSpice">
			<button ng-click="spicy('chili')">Chili</button>
			<button ng-click="spicy(customSpice)">Custom spice</button>
			<p>The food is {{spice}} spicy!</p>
		</div>
	</body>
</html>
~~~
이제 `SpicyController` Controller는 `spicy`라는 한 method만 가지고 있다. 이 `spicy`라는 method는 argument를 `spice`라는 변수명으로 받고 있다. Template에서는 처음엔 `spicy` method의 argument로 'chili'를 보냈고, 다음엔 위의 Input box에서 지정된 `customSpice`라는 model property를 argument로 보내고 있다. 



### 3. Scope Inheritance Example

AngularJS를 사용할 때에 Controller를 DOM Hierarchy의 다른 레벨에 연결시키는 것은 흔한 일이다. 처음에 설명할 때에 말했듯이 `ng-controller`는 새로운 child scope를 만들기 때문에 child scope들은 자신들의 parent scope에서부터 Property나 Method를 상속받는다. 아래의 예제는 그 구체적인 예를 보여준다.

~~~
// spicy3.js
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
~~~

~~~
// spicy3.html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Controller Example</title>
		<link href="spicy3.css" rel="stylesheet" type="text/css">
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="spicy3.js"></script>
	</head>
	<body ng-app="scopeInheritance">
		<div class="spicy">
			<div ng-controller="MainController">
				<p>Good {{timeOfDay}}, {{name}}!</p>
				<div ng-controller="ChildController">
					<p>Good {{timeOfDay}}, {{name}}!</p>
					<div ng-controller="GrandChildController">
						<p>Good {{timeOfDay}}, {{name}}!</p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
~~~

~~~ 
// spicy3.css
div.spicy div{
	padding: 10px;
	border: solid 2px blue;
}
~~~

위의 예제에서 HTML 파일을 보면 3 Controller를 어떻게 상속시켰는지 확인할 수 있다. 이것으로 인해서 이 view에는 아래의 4개의 scope가 만들어 진다.  
* Root Scope (body에서 ng-app로 AngularJS의 Application을 시작하면서 생긴 전체의 scope)
* `MainController`의 scope. 이 scope에는 `timeOfDay`와 `name` property가 지정되어 있다.
* `ChildController`의 scope. 이 scope에는 `name` property만 지정되어 있다.
* `GrandChildController`의 scope. 이 scope에는 `timeOfDay` property만 지정되어 있다.
위의 코드를 실행시켜 보면 알 수 있듯이, `ChildController`의 scope에는 `name` property만 지정되어 있지만 parent scope인 `MainController`의 scope에 있는 `timeOfDay` property를 상속받아서 사용했고, `GrandChildController`의 scope에는 `timeOfDay` property만 지정되어 있지만 parent scope인 `ChildController`의 scope에 있는 `name` property를 상속받아서 사용했다. Method도 이와 같이 상속되서 사용할 수 있다.  



### 4. Testing Controllers
Controller를 Testing하는 방법은 여러가지 있지만, 가장 좋은 방법 중 하나는 **$rootScope**와 **$controller**를 사용하는 것이다.  

~~~
// condefine.js
// Controller Definintion

~~~

~~~
// contest.js
// Controller Test

~~~


아직 작업 중입니다;;




