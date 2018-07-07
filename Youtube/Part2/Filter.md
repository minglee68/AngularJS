AngularJS Filter
=================
AngularJS의 중요한 요소중 하나인 Filter에 대해서 배우겠다. Filter를 통해서 우리는 출력을 원하는 형식으로 출력을 바꿀 수 있다. Filter는 직접 사용해보는 것이 가장 좋기 때문에 바로 예제로 들어가보자.   
  
~~~
// angulartut5.html
<!DOCTYPE html>
<html ng-app="app5" ng-cloak>
	<head>
		<title>Example</title>
		<style>
		[ng\cloak], [ng-cloak], .ng-cloak {
			display: none;
		}
		</style>
	</head>
	<body>
		<div ng-controller="mainCtrl">
			
			<h3>'uppercase/lowercase' Filter</h3>

			<label>Make Uppercase : </label>
			<input type="text" ng-model="name" />
			<p>Uppercase : {{name | uppercase}}</p>
			<p>Lowercase : {{name | lowercase}}</p>

			<h3>'currency' Filter</h3>

			<label>Currency Filter : </label>
			<input type="text" ng-model="money" />
			<p>Currency : {{money | currency}}</p>
			
			<h3>'filter' Filter</h3>

			<label>Name Filter : </label>
			<input type="text" ng-model="studentName" /><br>
			<ul>
				<li ng-repeat="student in student.gpas | filter: studentName">
					{{'Name: ' + student.name + ' : GPA: ' + student.gpa}}
				</li>
			</ul>

			<h3>'orderBy' Filter</h3>

			<ul>
				<li ng-repeat="student in student.gpas | orderBy:'gpa'">
					{{'Name: ' + student.name + ' : GPA: ' + student.gpa}}
				</li>
			</ul>

			<h3>'number' Filter</h3>

			<label>Number Filter : </label>
			<input type="text" ng-model="numVal" />
			<p>Default: {{numVal | number}}</p>
			<p>No Fractions: {{numVal | number:0}}</p>
			<p>Negative 4 Decimal: {{numVal | number:4}}</p>

			<h3>'date' Filter</h3>

			<p>Date 1 : {{currDate | date: 'medium'}}</p>
			<p>Date 2 : {{currDate | date: "MM/dd/yyyy 'at' h:mma"}}</p>

			<h3>'limitTo' Filter</h3>

			<p>Default : {{randomStr}}</p>
			<p>10 Characters : {{randomStr | limitTo:10}}</p>

			<ul>
				<li ng-repeat="item in randArray | limitTo:3">
					{{item}}
				</li>
			</ul>

			<h3>Custom Filter</h3>

			<ul>
				<li ng-repeat="item in weather">
					{{item.day + " : "}} {{item.rain | raining}}
				</li>
			</ul>

		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam5.js"></script>
		<script src="filter.js"></script>

	</body>
</html>
~~~

~~~
// exam5.js
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
~~~

~~~
// filter.js
angular.module('weatherFilters', []).filter('raining', function(){
	return function(input){
		return input ?  '\u2602' : '\u2600';
	}
});
~~~
일단 다른 것들에 대한 설명을 시작하기 전에 먼저 JavaScript 파일들에 대해서만 간단하게 설명하고 넘기겠다. 먼저 `filter.js`는 우리가 직접 만드는 filter이다. 구체적인 활용법은 나중에 설명할 것이지만, 일단 간단한 것들만 설명하자면, 먼저 이 Module의 이름은 `weatherFilters`이다. 그리고 이 Filter의 이름은 `raining`이고, 만일 입력(`input`)이 'true'이면 우산모양(unicode #2606)문자를, 'false'이면 햇빛모양(unicode #2600)문자를 반환한다.  
  
그리고 `exam5.js`는 여러 filter들을 사용하기 위한 데이터이다. 크게 신경쓰지 말고 복사해서 붙이면 된다. 여기서 중요한 것은 우리가 직접 만든 `raining` Filter를 사용하기 위해서 여기에서 처음에 Module을 선언할 때에 Module의 이름 `app5` 다음에 `raining` Filter가 있는 `weatherFilters` Module을 dependency list안에 넣는다. 

~~~
// exam5.js
var app5 = angular.module('app5', ['weatherFilters']);

...
~~~
이 외에는 특별한 것들은 없다. `$scope.student`는 `gpas`라는 object array를 가지고 있는 object이고, `$scope.currDate`는 date object로 현재의 날짜와 시간이 들어간다. `$scope.randomStr`은 랜덤한 string이 들어가있고, `$scope.randArray`는 랜덤한 string들이 한 array안에 들어가있고, `$scope.weather`는 object array인데, object 하나에는 요일과 그 날에 비가 오는지 안 오는지가 'true/false'로 들어가있다.   
  
  


### angulartut5.html
그럼 이제 하나씩 Filter들을 봐보자. 

#### Upper/Lower Case Filter

~~~
<h3>'uppercase/lowercase' Filter</h3>

<label>Make Uppercase : </label>
<input type="text" ng-model="name" />
<p>Uppercase : {{name | uppercase}}</p>
<p>Lowercase : {{name | lowercase}}</p>
~~~
첫번째는 입력 받은 문자열을 대문자로, 또는 소문자로 출력하는 것이다. 이것을 위해서는 Expression을 사용해서 대문자일 때엔 `uppercase`를, 소문자일 때엔 `lowercase`를 쓰면 된다.   
  


#### Currency Filter

~~~
<h3>'currency' Filter</h3>

<label>Currency Filter : </label>
<input type="text" ng-model="money" />
<p>Currency : {{money | currency}}</p>
~~~
두번째는 입력 받은 숫자를 돈의 단위로 출력하는 것이다. Expression을 사용해서 `currency`라고 적으면 된다.  
  


#### 'filter' Filter

~~~
<h3>'filter' Filter</h3>

<label>Name Filter : </label>
<input type="text" ng-model="studentName" /><br>
<ul>
	<li ng-repeat="student in student.gpas | filter: studentName">
		{{'Name: ' + student.name + ' : GPA: ' + student.gpa}}
	</li>
</ul>
~~~
세번째는 입력 받은 문자열이 포함된 것들만 출력하는 filter이다. 이것을 위해선 먼저 input element에서 사용자에게 입력을 받고 그것을 `ng-model`을 사용해서 특정 property안에 넣는다. 여기선 `studentName`에 넣었다. 그러고나서 `ng-repeat`을 할 때에 expression을 넣는다.  
  
`ng-repeat`의 expression을 봐보자. 먼저 `student in student.gpas`는 `$scope.student`안에 있는 `gpas`의 object들이 `student`안에 들어가면서 반복을 한다는 것이다. 다음으로 `filter: studentName`은 위에서 input element를 통해서 입력된 `studentName`의 문자열이 포함된 결과들만 출력한다는 것이다.  
  


#### 'orderBy' Filter

~~~
<h3>'orderBy' Filter</h3>

<ul>
	<li ng-repeat="student in student.gpas | orderBy:'gpa'">
		{{'Name: ' + student.name + ' : GPA: ' + student.gpa}}
	</li>
</ul>
~~~
네번째는 Array를 어떤 특정 Field에 따라서 정렬하는 것이다. 이번의 경우엔 `$scope.student`의 `gpas` array의 `gpa` field의 값에 따라서 정렬하는 것이다. field를 지정한 것은 `orderBy:'gpa'`로 지정했다.  
  



#### 'number' Filter

~~~
<h3>'number' Filter</h3>

<label>Number Filter : </label>
<input type="text" ng-model="numVal" />
<p>Default: {{numVal | number}}</p>
<p>No Fractions: {{numVal | number:0}}</p>
<p>Negative 4 Decimal: {{numVal | number:4}}</p>
~~~
여기선 input element로 입력 받은 숫자의 소숫점 자리수를 바꿔서 출력하는 것이다. 첫번째는 일반적인 Filter이다. 소숫점 3자리까지 출력된다. 두번째는 `number:0`으로 소숫점을 아예 없앤다. 마지막은 `number:4`로 소숫점 4자리까지 출력한다.   
  


#### 'date' Filter

~~~
<h3>'date' Filter</h3>

<p>Date 1 : {{currDate | date: 'medium'}}</p>
<p>Date 2 : {{currDate | date: "MM/dd/yyyy 'at' h:mma"}}</p>
~~~
여기선 날짜와 관련된 Filter를 소개한다. Date와 관련된 Filter는 매우 많기 때문에, 가장 기본적인 방법 하나와 응용할 수 있는 방법 하나를 예제로 사용했다. 하나는 제일 기본적인 방법으로 `date: 'medium'`이다. 다른 하나는 직접 출력되는 형식을 정하는 방법으로, `MM`은 Month를 숫자 2자리로, `dd`는 day를 숫자 2자리로, `yyyy`는 year를 숫자 4자리로, 그리고 `h:mma`는 hour:minute:second AM/PM형식으로 출력되는 것이다.   
  


#### 'limitTo' Filter

~~~
<h3>'limitTo' Filter</h3>

<p>Default : {{randomStr}}</p>
<p>10 Characters : {{randomStr | limitTo:10}}</p>

<ul>
	<li ng-repeat="item in randArray | limitTo:3">
		{{item}}
	</li>
</ul>
~~~
이번엔 출력의 길이를 조절하는 것이다. string의 길이를 조절하는 것과 array의 길이를 조절하는 것이 예제에 있다. 먼저 string은 `limitTo:10`으로 expression의 filter에 넣으면 그 string의 첫 10문자만 출력된다. 다음으로 array에서는 `ng-repeat`의 expresison에 `limitTo:3`을 넣으면 `randArray`에서 object 하나가 `item`에 들어가서 출력되는 것이 3번 반복되면 끝난다.   
  
   

#### Custom Filter

~~~
<h3>Custom Filter</h3>

<ul>
	<li ng-repeat="item in weather">
		{{item.day + " : "}} {{item.rain | raining}}
	</li>
</ul>
~~~
마지막으로 직접 만드는 Filter를 사용하는 방법이다. 실제 HTML에서 사용하는 방법은 간단하다. 'filter.js'에서 지정한 filter의 이름을 그대로 expression의 filter부분에 넣어주면 된다. 이번에는 'filter.js'에서 이름을 `raining`으로 정했기 때문에 여기서는 `item.rain | raining`으로 expression을 적었다. 





