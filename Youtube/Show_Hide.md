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

<div ng-controller="eventCtrl">
		
	<input ng-blur="blur = blur + 1" 
	ng-click="click = click + 1"
 	ng-dblclick="dblclick = dblclick + 1"
      	ng-copy="copy = copy + 1"
	ng-paste="paste = paste + 1"
    	ng-cut="cut = cut + 1"
       	ng-focus="focus = focus + 1"
	ng-model="confirmed"
     	ng-change="change = change + 1"
	ng-keydown="keydown($event)"
  	ng-mouseenter="mouseenter = mouseenter + 1"
 	ng-mouseleave="mouseleave = mouseleave + 1"
	/>
			
	<h4>Blur Events : {{blur}}</h4>
	<h4>Click Events : {{click}}</h4>
	<h4>Double Click Events : {{dblclick}}</h4>
	<h4>Copy Events : {{copy}}</h4>
	<h4>Paste Events : {{paste}}</h4>
	<h4>Cut Events : {{cut}}</h4>
	<h4>Focus Events : {{focus}}</h4>
	<h4>Change Events : {{change}}</h4>

	<h4>Key Pressed : {{kdkey}}</h4>
			
	<h4>Mouse Enter Events : {{mouseenter}}</h4>
	<h4>Mouse Leave Events : {{mouseleave}}</h4>

</div>

...
~~~
* **ng-click** : Text Box가 클릭되면 `click` property에 1을 더한다.  
* **ng-dblclick** : Text Box가 더블 클릭되면 `dblclick` property에 1을 더한다.
* **ng-copy** : Text Box 안에서 복사를 하면 `copy` property에 1을 더한다.
* **ng-paste** : Text Box 안에서 붙여넣기를 하면 `paste` property에 1을 더한다.
* **ng-cut** : Text Box 안에서 잘라내기를 하면 `cut` property에 1을 더한다.
* **ng-focus** : Text Box에 Focus를 하면 `focus` property에 1을 더한다. `ng-blur`와의 차이점은` ng-blur는 Text Box에서 Focus가 빠져나가면 `blur` property에 1을 더하고, 이것은 Focus를 하면 `focus` property에 1을 더하는 것이다.
* **ng-model** : 
* **ng-change** : Text Box안에서 어떤 변화가 생기면 `change` property에 1을 더하겠다.
* **ng-keydown** : Text Box에 Focus가 되어있는 상태에서 어떤 키를 누르면 그 키값이 `$event`로 `keydown(...)`함수로 보내진다.
* **ng-mouseenter** : Text Box에 마우스가 올라가면 `mouseenter`에 1을 더한다.
* **ng-mouseleave** : Text Box에 마우스가 올라가면 `mouseleave`에 1을 더한다.  
  
  
그럼 이제 위의 HTML 파일에 필요한 JavaScript 파일을 만들어 보자.  
  
~~~
// exam4.js
var app4 = angular.module('app4', []);

app4.controller('eventCtrl', function($scope) {
	$scope.blur = 0;
	$scope.click = 0;
	$scope.dblclick = 0;
	$scope.copy = 0;
	$scope.paste = 0;
	$scope.cut = 0;
	$scope.focus = 0;
	$scope.change = 0;

	$scope.keydown = function(e) {
		$scope.kdkey = String.fromCharCode(e.keyCode);
	};

	$scope.mouseenter = 0;
	$scope.mouseleave = 0;
});
~~~
위의 예제에서 알아야 할 것은 keydown()함수가 눌린 키를 `e`로 받는 것이다. 그렇게 해서 받은 `e.keyCode`의 값을 char Code에서 String으로 바꾼뒤, 그것을 `$scope.kdkey`에 넣는다. 그러면 사용자는 입력된 키의 위치를 알려 줄 것이다.



Enable & Disable Elements
--------------------------
그렇다면 이제 어떻게 HTML Element를 Enable/Disable 시키는지를 알아보자.   
  
~~~
// exam5.js
var app5 = angular.module('app5', []);

app5.controller('eventCtrl', function($scope) {
	
	$scope.disableButton = true;

});
~~~

~~~
// angulartut5.html
<!DOCTYPE html>
<html ng-app="app5" ng-cloak>
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
		
			<button ng-disabled="disableButton">Button</button>

			<input type="checkbox" ng-model="disableButton">DisableButton</button>
			<p>{{disableButton}}</p>

		</div>
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
			<script src="exam5.js"></script>
	</body>
</html>
~~~
여기에서 하는 것은 먼저 JavaScript 파일에서 `$scope.disableButton` property를 만들고 거기에 `true`로 초기화 시킨다. 그런 다음 HTML 파일에서 html tag에서 `app5` module을 부르고 div tag에서 `eventCtrl` Controller를 부른 뒤 버튼을 만들고 그 button element에 `ng-disabled`를 더한뒤 거기에 `"disableButton"`값을 넣는다.  
  
그리고 `disableButton`의 값은 Check Box에 의해서 달라지도록 input element에 `ng-model`로 `disableButton`을 넣어줬다. 우리는 여기에서 `disableButton`의 값이 어떻게 변하는지를 정확히 알기 위해서 마지막에 `disableButton`값을 출력하는 Expression을 더했다.  
  
실제로 위의 예제를 실행해보면 먼저 Button을 사용할 수 없는 상태로 페이지가 출력된다. Check Box에 Check가 되어있고, `disableButton`의 값도 true이다. 하지만 Check Box에서 Check를 없애면 바로 밑에 출력되는 값이 false로 바뀌고, Button도 사용 가능하게 된다.

그렇다면 여기에 element가 보이거나 안 보이게 만드는 방법을 더해보자. 지금부터 만들 것은 시간이 낮인지 밤인지에 따라서 달라지게 하는 것이다.  
  
~~~
// exam5.js

~~~










