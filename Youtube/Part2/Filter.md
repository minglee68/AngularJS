AngularJS Filter
=================
AngularJS의 중요한 요소중 하나인 Filter에 대해서 배우겠다. Filter를 통해서 우리는 출력을 원하는 형식으로 출력을 바꿀 수 있다. Filter는 직접 사용해보는 것이 가장 좋기 때문에 바로 예제로 들어가보자.   
  
~~~
// angulartut5.html

~~~

~~~
// exam5.js
var app5 = angular.module('app5', ['weatherFilters']);

app5.controller('mainCtrl', function($scope) {
	
	$scope.students = [
    		{name: "George Thomas", gpa: 3.5},
	    	{name: "Susy Smith", gpa: 3.6},
    		{name: "Paul Marks", gpa: 3.2},
    		{name: "Sue Edgar", gpa: 3.8}
  	];
 	
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
이 외에는 특별한 것들은 없다. 










