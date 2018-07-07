AngularJS Class(Controller) Inheritance
========================================
이제 Controller들을 어떻게 상속시키는지를 배워보자. 먼저 이번 예제에서는 `$scope`대신에 `this`를 사용할 것이다. 이 두가지의 역할은 거의 같다고 보면 되지만, 중요한 차이가 하나 있다.   
  
먼저 `$scope`는 말 그대로 Scope를 새로운 View로 만들어서 사용하는 것이다. 그렇기 때문에 `ng-controller`로 불려진 Controller에 있는 변수들을 직접 사용하는 것이 아닌, 거기에 있는 property들이나 함수들을 새로운 Scope로 일시적인 것을 만들어서 사용하는 것이다. 그래서 HTML 파일에서 Scope에 있는 property들을 사용할 때에도 property 이름을 직접 `ng-model`에 넣거나 함수 이름을 그대로 `ng-click`같은 곳에 적용시켜서 사용한다.
  
다음으로 `this`는 `$scope`처럼 일시적인 층을 만들어서 사용하는 것이 아니라 Controller를 조금 더 직접적으로 사용한다고 생각하면 된다. 한마디로 쉽게 얘기하자면, `this`라는 것이 Controller 그 자체라고 생각하면 된다. 그렇기 때문에 `ng-controller`에서 Controller이름 다음에 여기에서 사용할 이름을 `Controller as name`처럼 지정을 한 뒤, 나중에 이 Controller안에 있는 property들을 쓸 때에는 `name.property`처럼 앞에 지정한 Controller의 이름을 써서 사용해야 한다.  
  
`this`의 좋은 점은 여러 Controller들을 겹쳐서 사용할 때에 그들에게 이름을 줌으로써 우리가 사용하는 property가 어떤 Controller에서 사용하는 property인지를 확실하게 알 수 있다. 그리고 `this`를 특정 변수에 넣어서 사용할 수도 있다. 반대로 `$scope`는 여러 Controller들을 겹쳐서 사용할 때에 어느 Controller의 property를 사용하는지 알기가 어렵다.  
   
어느 쪽이 더 좋은 지는 확실하게 알 수 없다. 어느 Controller의 property를 사용하는지 알기 쉬운 게 좋은 지 어려운게 좋은 지는 때에 따라서 달리지기 때문이다. 그리고 `$scope`에는 `$rootScope`나 `$broadcast`와 같은 좋은 기능들이 있고, `this`에게도 `this`만을 위한 기능들이 있다. 하지만 유의해야 하는 점은 `this`와 `$scope`는 절대로 섞어서 사용하면 안된다는 것이다. 어느 한쪽만 써야된다는 것만 잊지 말고 자유롭게 원하는 것을 사용하면 된다.   
  
그렇다면 예제를 한 번 봐보자.   
  
  
### angulartut4.html

~~~
// angulartut4.html
<!DOCTYPE html>
<html ng-app="app4" ng-cloak>
	<head>
		<title>Example</title>
		<style>
		[ng\cloak], [ng-cloak], .ng-cloak {
			display: none;
		}
		</style>
	</head>
	<body>
		<div ng-controller="mainCtrl as parent">
			<p>Name : {{parent.name}}</p>

			<p>Sound : {{parent.sound}}</p>

			<button ng-click="parent.animalClick()">Animal Data</button>
		</div>

		<div ng-controller="dogCtrl as dog">
			<p>Name : {{dog.child.name}}</p>
			
			<p>Sound : {{dog.child.sound}}</p>

			<button ng-click="dog.child.animalClick()">Dog Data</button>

			<button ng-click="dog.child.dogData()">More Dog Data</button><br>

			<input ng-model="dog.child.bark" /><br><br>
			<span>New Bark : {{dog.child.bark}}</span>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam4.js"></script>
	</body>
</html>
~~~
먼저 Module은 `app4` Module을 사용하고 있고, body 안에 div element가 2개가 있는데, 하나는 `app4` Module의 `mainCtrl` Controller를, 다른 하나는 같은 Module의 `dogCtrl` Controller를 사용하고 있다.   
  
첫번째 div element에서는 `ng-model`로 `"mainCtrl as parent"`로 `mainCtrl`이라는 Controller를 `parent`라는 이름으로 사용할 것이라고 선언한다. 그런 뒤 `parent.name`과 `parent.sound`로 각각의 property들을 출력하고, 버튼을 누르면 경고창이 특정 메시지와 함께 나오도록 하는 함수인 `parent.animalClick()`을 `ng-click`로 binding시켜놨다.   
  
두번째 div element에서는 `ng-model`로 `"dogCtrl as dog"`로 `dogCtrl`이라는 Controller를 `dog`라는 이름으로 사용할 것이라고 선언한다. 이 다음부터의 부분은 아래에서 exam4.js를 설명한 뒤에 다시 설명하겠다.   
  
   
### exam4.js

~~~
// exam4.js
var app4 = angular.module('app4', []);

app4.controller('mainCtrl', function(){
	this.name = "Animal";
	this.sound = "Grrr";

	this.animalClick = function(){
		alert(this.name + " says " + this.sound);
	};
});



app4.controller('dogCtrl', function($controller){
	this.child = $controller('mainCtrl', {});

	this.child.name = "Dog";

	this.child.bark = "Wooof";

	this.child.dogData = function(){
		alert(this.name + " says " + this.sound + " and " + this.bark);
	};
});
~~~
먼저 이 Module의 이름을 `app4`로 지정했다. 그리고 여기에서 2개의 Controller를 만들었는데, 하나는 `mainCtrl` Controller이고, 다른 하나는 `dogCtrl` Controller이다. 먼저 `mainCtrl` Controlle는 `this.name`과 `this.sound`를 만들고, 이 두 가지를 경고창으로 출력하는 `animalClick`함수도 `this.animalClick`로 만들었다.  
  
다음으로 `dogCtrl` Controller는 `$controller` Service를 사용하기 위해서 function안에 넣는다. 여기서 `$controller` Service란 어떤 Controller안에서 다른 Controller를 Instance화 시켜서 사용할 수 있게 하는 Service이다. 그래서 가장 먼저 `this.child`에 `$controller` Service를 사용해서 `mainCtrl` Controller를 Instance화 시켜서 넣는다. 이렇게 함으로써 `dogCtrl`는 `mainCtrl`를 사용할 수 있게 됬다. 그리고 `mainCtrl` Controller의 property들을 사용하기 위해선 아까 우리가 `mainCtrl`를 넣은 `this.child`를 사용하면 된다. `dogCtrl` Controller에선 먼저 `this.child.name`을 `"Dog"`로 바꿨고, `this.child.bark`라는 새로운 property를 만들어서 `"Wooof"`로 초기화시켰다. 여기에서 만들어진 `bark`라는 property는 `dogCtrl`에 있는 property가 아니라, `dogCtrl`안에서 사용하는 `mainCtrl`안에 있는 property이다. 그래서 `this.bark`가 아닌 `this.child.bark`로 만든 것이다.   
  
마지막으로 `this.child`에 `dogData()`라는 새로운 함수를 만들었는데, 여기에서 조금 이상한 점을 찾을 수 있다. 아까 위에서 설명한대로라면 이 함수에서 `this.name`이 아닌 `this.child.name`을 사용해야 할 텐데 이 함수의 definition안에서 `this.name`이나 `this.sound`같이 `this.child`를 사용하지 않는 다는 점이다. 이렇게 사용하는 이유는 `dogData()`라는 함수는 `dogCtrl`의 함수가 아닌, `dogCtrl`안에 있는 `mainCtrl`의 함수이기 때문이다. 따라서 지금 이 `dogData()`라는 함수에서 사용하는 `this`는 `dogCtrl`의 `this`가 아닌 `dogCtrl`안에 있는 `mainCtrl`의 `this`인 것이다.   
  
위와 같은 형식으로 `this`가 남발하는 것을 보면 이해가 안 갈 수도 있기 때문에, 다른 이해하기 쉬운 방법으로도 설명을 하겠다. 아래의 예제는 위의 exam4.js와 같지만 `this`의 특징을 사용해서 변수이름 안에 넣어서 사용한 경우이다. 조금 더 이해하기 쉬울 것이다.   
  

~~~
// exam4_modified.js
var app4 = angular.module('app4', []);

app4.controller('mainCtrl', function(){
	this.name = "Animal";
	this.sound = "Grrr";

	this.animalClick = function(){
		alert(this.name + " says " + this.sound);
	};
});



app4.controller('dogCtrl', function($controller){
	var dogctrl = this;
	
	dogctrl.child = $controller('mainCtrl', {});

	dogctrl.child.name = "Dog";

	dogctrl.child.bark = "Wooof";

	dogctrl.child.dogData = function(){
		alert(this.name + " says " + this.sound + " and " + this.bark);
	};
});
~~~
  
  
  
이제 아까 설명하지 않은 HTML의 나머지 부분을 봐보자.  
  

~~~
// angulartut4.html
...

<div ng-controller="dogCtrl as dog">
	<p>Name : {{dog.child.name}}</p>

	<p>Sound : {{dog.child.sound}}</p>

	<button ng-click="dog.child.animalClick()">Dog Data</button>

	<button ng-click="dog.child.dogData()">More Dog Data</button><br>

	<input ng-model="dog.child.bark" /><br><br>
	<span>New Bark : {{dog.child.bark}}</span>
</div>

...
~~~
`dogCtrl` Controller를 `dog`라는 이름으로 사용하겠다고 선언한 뒤, Name과 Sound를 Expression을 사용해서 `dog.child.name`과 `dog.child.sound`를 출력한다. 그리고 본래 `mainCtrl`이 가지고 있는 `animalClick()`함수도 `dog.child.animalClick()`로 사용하고, 새로 만든 `dogData()`함수도 `dog.child.dogData()`로 사용한다. 그런 뒤 `dog.child.bark`가 제대로 사용되고 있는지 input element와 span element를 통해서 확인해본다. input element에서 `ng-model`도 당연히 `"dog.child.bark`가 들어가야 한다.  








