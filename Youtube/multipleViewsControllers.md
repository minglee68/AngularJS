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
...

app2.controller('badCtrl', function($scope) {
	var badFeelings = ["Disregarded", "Unimportant", "Rejected", "Powerless"];

	$scope.bad = badFeelings[Math.floor((Math.random() * 4))];
});

app2.controller('goodCtrl', function($scope) {
	var goodFeelings = ["Pleasure", "Awesome", "Lovable", "InnerPeace"];

	$scope.good = goodFeelings[Math.floor((Math.random() * 4))];
});
~~~
원래 있던 Controller는 지우지 않고 새로운 Controller 2개를 만든다. 각각의 이름은 `'badCtrl'`과 `'goodCtrl'`이고, 각각 나쁜 기분과 좋은 기분에 대한 단어들이 있는 Array가 있으며, 그것을 Random하게 뽑아내서 `$scope.bad`나 `$scope.good`안에 넣는다.   
  
HTML에는 2개의 View를 더 만든다.  
  
~~~
// angulartut2.html
...

<h4 ng-controller="badCtrl">I'm feeling {{bad}}</h4>
<h4 ng-controller="goodCtrl">I'm feeling {{good}}</h4>

...
~~~
2개의 h4 element에서 각각 `badCtrl` Controller와 `goodCtrl` Controller를 나눠서 사용한다. 그러면 각각의 property가 Expression으로 출력된다.  

ng-cloak
---------
위의 예제들을 실행해보면 Random하게 출력이 잘 되지만, 출력 될 때에 잠시동안 `{{...}}`부분이 보인다. 이것을 지우기 위해서 `ng-cloak`라는 것을 사용한다. 사용하기 위해선 아래의 예제와 같이 사용하면 된다.  
  
~~~
// angulartut3.html
<!DOCTYPE html>
<html ng-app="app3" ng-cloak>
	<head>
		<title>Example</title>
		<style>
		[ng\:cloak], [ng-cloak], .ng-cloak {
			display: none;
		}
		</style>
	</head>
	<body>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam3.js"></script>

	</body>
</html>
~~~
위의 예제에서 볼 수 있듯이 먼저 html tag안에 `ng-cloak`를 더하고, head안의 style 부분에 위에 적혀있는 대로 더한다. style부분에 더하는 것은 만일 AngularJS를 import하는 script가 head부분에 있다면 할 필요는 없다. 저 부분의 뜻은 AngularJS의 컴파일이 끝나서 출력준비가 다 될 때까지 출력을 하지 않는다는 뜻이다. 저렇게 넣기만 하면 된다.  
  
이제 실제로 출력을 해보기 위해서 Module에 아래와 같이 데이터를 넣어보자.  
  
~~~
// exam3.js
var app3 = angular.module('app3', []);

app3.controller('gListCtrl', function($scope) {
	$scope.groceries = [
		{item: "Tomatoes", purchased: false},
		{item: "Potatoes", purchased: false},
		{item: "Bread", purchased: false},
		{item: "Hummus", purchased: false}
	];
});
~~~
위와 같이 object array를 `$scope.groceries`안에 넣고, 이것을 `gListCtrl` Controller로 사용할 수 있게 한다. 그런 뒤 아래와 같이 HTML 파일에 더하면 된다.  
  
~~~
// angulartut3.html
...

<body>
	<div id="groceryList" ng-controller="gListCtrl">
		
		<h3 class="ListTitle">{{groceries.length}} Groceries to Get</h3>

		<h3 class="ListTitle">
			<span ng-bind="groceries.length"></span> Groceries to Get
		</h3>
		
		<ol style="margin: 0 0 -15px 0;">
			<li>{{groceries[0].item}}</li>
		</ol>
		
		<ol start="2">
			<li ng-repeat="grocery in groceries" ng-if="$index > 0">
				{{grocery.item}} {{$index}}
			</li>
		</ol>
	</div>

...
~~~
먼저 `ng-controller`로 `gListCtrl` Controller를 사용해서 View가 시작된다.  
  
첫번째는 Expression에 직접 property를 입력해줘서 출력시키는 방법이다.  
두번째는 첫번째와 같은 결과가 나오지만 Expression을 사용하지 않고 `ng-bind`로 출력시키는 방법이다.  
  
세번째는 object array의 특정 항목만 출력하는 방법이다. 참고로 여기에서 사용한 것 같이 `style`을 tag에서 지정하는 습관은 안 들이는게 좋다.  
  
마지막은 object array의 나머지 항목들을 반복으로 출력하는 방법이다. ol tag의 `start` attribute는 주어진 번호부터 시작하라는 것이다. 세번째에서 이미 1번을 출력했기 때문에 2번부터 출력하기 위해서 이런 식으로 지정해준다. 다음으로 li tag에서 `ng-repeat`에 `"grocery in groceries`를 넣음으로써 Scope의 `groceries` property에서 object를 하나씩 `grocery` property에 넣어서 `groceries`의 모든 object를 사용할 때 까지 반복한다.  
  
여기서 외워야 될 것은 `ng-if`이다. 세번째에서 이미 `groceries`의 첫번째 object인 `Tomatoes`를 출력했기 때문에 그것을 무시하기 위해선 첫번째 index인 '0'을 무시해야 한다. 그러기 위해서 li tag안에 `ng-if`를 통해 `$index`가 0보다 클 때에만 출력하도록 했다. 이를 통해서 첫번째 object를 무시하고 `groceries[1]`부터 `grocery`에 들어가서 출력된 것이다.  
참고로 `$index`외에도 이런 경우에 `ng-if`에서 쓰이는 것들이 많다:  
* $first : 첫번째 요소일 때만 True.
* $last : 마지막 요소일 때만 True.
* $middle : 첫번째도 마지막도 아닐 때만 True.
* $even : 짝수 요소일 때만 True.
* $odd : 홀수 요소일 때만 True.
  

ng-repeat-start & ng-repeat-end
--------------------------------
`ng-repeat`에는 단점이 하나있다. 그것은 `ng-repeat`가 추가된 HTML element에서만 사용 가능하다는 것이다. 따라서 2개 이상의 element에서 `ng-repeat`을 쓰기는 매우 어렵다는 것이다. 이것을 해결하기 위해서 AngularJS는 1.2버전부터 `ng-repeat-start`와 `ng-repeat-end`를 소개를 했다. 이로써 `ng-repeat-start`로 시작한 HTML element부터 `ng-repeat-end`로 끝내는 HTML element까지 `ng-repeat`이 적용되게 됬다. 아래가 구체적인 예시이다.  
  
~~~
// angulartut3.html
...

<div id="groceryList" ng-controller="gListCtrl">

	...

	<table>
		<tr ng-repeat-start="grocery in groceries">
			<td>{{grocery.item}}</td>
		</tr>
		<tr ng-repeat-end>
			<td>{{grocery.purchased}}</td>
		</tr>
	</table>

	...
~~~
위의 예제에선 `grocery`의 `item`과 `purchased`의 값을 다른 HTML element에서 출력을 하고 싶었기 때문에 `ng-repeat-start`와 `ng-repeat-end`를 사용해서 start부분부터 end부분까지를 한 interval로 생각하고 통틀어서 반복을 시킨 것이다. 그래서 각 property에 맞는 값이 출력된다.  



ng-switch
----------
`ng-switch`를 이용해서 Scope의 어떤 property의 값에 따라서 출력을 바꿀 수도 있다.  
  
~~~
// angulartut3.html
...

<div id="groceryList" ng-controller="gListCtrl">
	
	...

	<label>Type a Number (1 to 4):
		<input type="text" ng-model="someNumber">
	</label>

	<div ng-switch="someNumber">
		<p ng-switch-when="1">You entered 1</p>
		<p ng-switch-when="2">You entered 2</p>
		<p ng-switch-when="3">You entered 3</p>
		<p ng-switch-when="4">You entered 4</p>
		<p ng-switch-default="1">Not Following Directions</p>
	</div>

	...

~~~
먼저 Text Box로 `someNumber`의 값을 받는다. 그리고 그 값에 따라서 출력이 달라지도록 다음 div element에 `ng-switch`를 더하면서 `ng-switch`안에 `"someNumber"`를 넣는다. 그러면 위의 Text Box를 통해서 들어간 someNumber의 값에 따라서 출력이 바뀌는데, 그 작용을 `ng-switch-when`이 담당한다. 그리고 1~4 사이의 값이 아닌 경우엔 `ng-switch-default`가 출력이 된다.  
  



