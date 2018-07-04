AngularJS Tutorial
====================
https://www.youtube.com/playlist?list=PLGLfVvz\_LVvRo7634CgU8vyD\_NPtODwjE
위의 튜토리얼을 따라하면서 적은 노트이다.


Quick Overview on AngularJS
---------------------------
* AngularJS는 Module을 이용해서 Application에서 사용되는 Component들을 설정한다.
* Module을 쓰면 그 안에 있는 Component들을 다른 Application에서 재사용하기 편해진다.
* Web페이지는 주로 DOM object를 사용해서 구현된다. AngularJS는 HTML을 더 사용하기 편하게, 더 많은 기능으로 사용하게 할 뿐이다.
* HTML과 AngularJS는 Directive를 통해서 상호작용한다. 
* Directive를 통해서 Data를 HTML element에 binding시킨다.
* AngularJS는 JavaScript를 통해서 Scope라는 Data들의 한 묶음을 만들어서 Web Server나 Database나 Client-side에 사용될 수 있도록 한다.
* Expression은 직접적으로 Scope(Data)와 연결되어 있어서 Web 페이지가 Data가 변동될 때마다 동적으로 Data-binding을 통해서 적용된다.
* Web Page에서 Data가 바뀜에 따라서 Model의 Data도 바뀌고, Model의 Data가 바뀜으로 Web Page가 바뀌게 된다.
* AngularJS에는 많이 사용하는 기능을 Built-in Service로 제공하고 있다.
  

### Examples
* * * 

아래에서 예제를 통해서 기본적인 기능들을 하나씩 빠르게 알아보자.

~~~
// angulartut.html
<!DOCTYPE html>
<html>
	<head>
		<title>Example</title>
	</head>
	<body>


		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam1.js"></script>
	</body>
</html>
~~~
먼저 기본적인 html 형식이다. 일반적인 HTML형식을 따라서 html tag, head tag, body tag등이 있고, 여기에선 body의 마지막 부분에서 Script CDN을 통해서 AngularJS를 import한다. 그리고 사용할 AngularJS의 component가 있는 스크립트를 불러들인다.  
  
여기에서 우리는 Template, Module, Controller, 그리고 Scope를 다뤄볼 것이다. 다음으로 'exam1.js'라는 스크립트를 만든다.
  
~~~
// exam1.js
var app1 = angular.module('app1', []);
~~~
위른 자세히 설명해보자. 먼저 이 스크립트를 만드는 이유는 AngularJS Module를 만들기 위한 것이다. AngularJS Module은 HTML의 일부로서의 AngularJS Application과 작동하기 위해서 만들어지고, 이를 통해서 다양한 AngularJS 기능들을 사용하기 위함이다.   
  
위에서 `angular.module(...)`은 첫번째 argument로 `'app1'`이라는 이름을 이 모듈의 이름으로 받는다. 다음 argument에선 `[]`를 통해서 다양한 Module들을 Array형식으로 받는다. 이번엔 다른 Module을 사용하지 않기 때문에 빈칸으로 놔둔다.  
  
### ng-app
* * *

Module의 이름을 지정하는 이유는 지정해야지 HTML에서 사용할 수 있기 때문이다. 이번엔 `'app1'`이라는 이름으로 만들었기 때문에, 'angulartut.html'로 돌아가서 html tag안에 이 이름을 넣어주면 된다. 넣어주는 방법은 아래와 같다.  
  
~~~
// angulartut.html
<!DOCTYPE html>
<html ng-app="app1">

...
~~~
`ng-app`라는 attribute를 통해서 사용할 Module을 이름으로 지정해준다. 이것을 함으로써 AngularJS가 어디에서부터 컴파일링을 시작하면 될지 알 수 있다. 'app1'이라는 것은 위에서 말했듯이 Module의 이름이고, 이 Module은 우리가 import한 JavaScript 파일에 있어야 된다.  
  
### ng-init
* * *

Module의 이름 외에도 여러가지를 넣을 수 있는데, 예를 들자면 `ng-init`라는 Directive를 통해서 Application의 Data를 초기화시키는 것이다.아래와 같이 하면 된다.  
  
~~~
// angulartut.html
<!DOCTYPE html>
<html ng-app="app1" ng-init="person = {fName: 'Derek', lName: 'Banas'}; capitals = [{city: 'Montgomery', state: 'Alabama'}, {city: 'Juneau', state: 'Alaska'}, {city: 'Phoenix', state: 'Arizona'}]">

...
~~~
여기에선 `person`이라는 이름의 object와 `capitals`라는 이름의 object array를 초기화 시켜줬다. 이렇게 하면 AngularJS가 `ng-app`를 찾아서 컴파일을 시작하는 순간 `ng-init`을 찾으면 그 안에 있는 값들을 자동적으로 만들어서 Scope의 Model에 넣는다.  
  
### Controller
* * *

다음으로는 Controller를 사용하기 위해서 body안에서 Controller를 선언할 것이다.  
  
~~~
// angulartut.html
...

<body>
	<div ng-controller="ctrl1">

	...

	</div>

...

~~~
여기서 우리가 얘기하는 것은 div tag안에 `ng-controller="ctrl1"`을 사용함을 통해서 '이 div element와 그 안에 들어갈 모든 element들을 우리의 View로 사용할 것이고, Scope를 data로 이용해서 이 View에서 사용할 것이다!'라는 것이다.  
  
그러면 이제 'exam1.js'로 돌아가서 실제 Controller를 만들 것이다. 위의 'angulartut.html'에서 선언한 Controller의 이름이 `"ctrl1"`이기 때문에 같은 이름으로 만들어야 된다.  
  
~~~
// exam1.js
var app1 = angular.module('app1', []);

app1.controller('ctrl1', function($scope) {
	...
}); 

~~~
위에서는 `app1.controller(...)`를 해서 'app1'모듈의 Controller를 만든다. controller() method의 첫번째 argument는 이 Controller의 이름이고, 두번째로 함수를 보내주는데, 이것은 Controller의 일종의 Factory Function이다.  
Factory Function은 이 Controller가 사용될 수 있도록 준비해주고, 이 Factory Function의 parameter로 받아진 `$scope`는 이 Factory Function이 사용하는 Dependency이다. 이것을 통해서 AngularJS는 이 함수가 불려질 때마다 `$scope` object를 건내준다. 이 작업을 **Dependency Injection**이라고 부른다. `$scope`는 HTML element와 Scope안에 있는 변수들을 연결시켜준다.  
  
이제 이 Factory Function안에 값을 지정해주거나 함수를 만들어줄 수 있다.  
  
~~~
// exam1.js
...

app1.controller('ctrl1', function($scope) {
	$scope.first = 1;
	$scope.second = 1;
	
	$scope.updateValue = function() {
		$scope.calculation = $scope.first + " + " + $scope.second + " = " + (+$scope.first + +$scope.second);
	};
});

~~~
가장 먼저 Scope에 새로 `first`와 `seconde`라는 property를 만들어서 각각 1로 초기화 시킨다.  
그런 다음 클릭하면 작동되는 함수를 만들기 위해서 함수를 선언하는데, JavaScript의 function expression기법을 이용해서 `updateValue()`라는 함수를 만든다.  
이 함수는 argument값을 전혀 안 받기 때문에 `function(){...}`의 '()' 부분을 빈칸으로 놔둔다.  
이 함수가 하는 일은 `$scope.first`와 `$scope.second`를 더해서 나오는 값을 식으로 보여주는 것이다. 두 변수를 더하는 식은 `$scope.calculation`안에 들어간다.  
  
여기서 중요한 점이 두 가지 있다. 하나는 `$scope.calculation`은 `$scope.first`와 `$scope.second`를 더한 값이 아니라는 것이다. 두 수를 더한 식이 `$scope.calculation`에 들어간다. 다른 하나는 식의 마지막 부분에서 각 변수 앞에 `+`룰 붙인 것이다. 이것을 함으로서 String이 들어오면 자동으로 Integer로 바꿔준다.   
  
### HTML Output
* * *
   
이제 HTML로 돌아가서 출력해보자.  
  
~~~
// angulartut.html
...
<div ng-controller="ctrl1">

	<span>Values:</span>
	<input type="text" ng-model="first"/>
	<input type="text" ng-model="second"/>

	<button ng-click="updateValue()">Sum</button>
	<br><br>

	{{calculation}}

</div>
...
~~~
`ctrl1` Controller를 부른 div안에서 작업을 한다. 먼저 입력을 받을 Text Box를 만드는데, 각 Text Box에 `ng-model`를 추가한다. 이 `ng-model`을 사용함으로서 Scope에 있는 `first`와 `second`와 input element가 binding이 되어서 이 값들을 사용 할 수 있게 된다.   
다음으로는 'Sum' button을 클릭하면 Scope에 있는 'updateValue()'함수와 binding이 되도록 한다. 클릭하면 binding이 되도록 하는 방법은 `ng-click`를 사용해서 거기에 사용할 함수의 이름과 주어질 argument들을 주면 되는 것이다. 우리는 아무 argument가 없기 때문에 `ng-click="updateValue()"`라고 한다.  
마지막으로 `updateValue()`함수를 통해서 얻어진 Scope값을 사용하기 위해선 Expression을 사용할 것이다. 사용하는 방법은 단순하게 `{{}}`의 안에 사용할 Scope의 property의 이름(`calculation`)을 적어넣으면 된다. 그러면 `first`와 `second`의 값을 바꾸고 'Sum' button을 누르면 `updateValue()`함수가 실행되서 자동으로 `$scope.calculation`의 값이 바뀌고 그 데이터는 바로 Expression과 data-binding이 되어서 사용된다.  
  
  
### Expression
* * *

위의 예제와 같이 Expression에서는 변수의 값을 단순히 출력할 뿐만 아니라 계산이나 다른 작업들도 할 수 있다.  
  
~~~
// angulartut.html
...
<div ng-controller="ctrl1">
	...

	<p>5 + 5 = {{5+5}}</p>

	<p>Your first value is {{first}}</p>

	<p>Your second value is
		<span data-ng-bind="second"></span>
	</p>

	<p>{{person.fName + " " + person.lName}} you entered {{first + " and " + second}}</p>

</div>
...
~~~
첫번째는 Expression으로 계산하는 것이다. 단순이 값들과 그에 대한 계산을 넣어서 계산을 할 수 있다.  
두번째는 Expression으로 `ng-model`을 사용하지 않고 바로 Scope의 property를 출력하는 것이다. Expression안에 Scope의 property의 이름을 넣음으로서 그 property의 데이터가 바로 binding이 되어서 출력된다. 위의 입력창에서 `first`의 값을 바꾸는 순간 이 부분도 바뀌는 것을 확인할 수 있다.  
세번째는 `ng-model`을 사용하지 않고 `data-ng-bind`로 원하는 값을 data-binding시키는 방법이다. `data-ng-bind`에 원하는 Scope의 property 이름을 넣으면 그 값이 바로 data-binding이 되어서 출력된다.   
네번째는 Expression으로 string을 연결시켜서 출력해주는 것이다. 처음에 html tag에서 `ng-init`으로 선언한 `person` 값을 사용해서 출력한다. `person`이라는 object 안의 `fName` field의 값을 출력하기 위해서 `person.fName`이라고 넣는다.  
  
다음으로는 `ng-repeat`을 사용해서 위에서 선언한 `capitals`의 값들을 연속해서 출력하는 것이다.  

~~~
// angulartut.html
...
<div ng-controller="ctrl1">

	...

	<ul>
		<li ng-repeat="capital in capitals">
			{{'City: ' + capital.city + ', State: ' + capital.state}}
		</li>
	</ul>

</div>
...
~~~
먼저 `ng-repeat`으로 반복해서 출력할 HTML element는 li element이기 때문에 li tag 안에 `ng-repeat`을 더한다. 여기서 `ng-repeat="capital in capitals"`라고 했는데, 이것의 뜻은 Scope에 있는 `capitals`라는 property에서 하나의 object마다 `capital`이라는 새로운 property 안에 넣으라는 것이다. 이로써 Expression에서 `capital.city`나 `capital.state`같이 `capital`안에 넣어진 값들을 사용할 수 있게 된다.  
그리고 `ng-repeat`은 `capitals`안에 있는 모든 object가 `capital`안에 들어가서 반복을 끝낼 때 까지 반복한다.  








