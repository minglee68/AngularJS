Service
=======
이것은 AngularJS의 Service에 대한 이론적 설명과 예제이다.

What is Service?
-----------------
AngularJS Service는 Dependency Injections(DI)로 연결된 재사용 가능한 object들이다. Service를 이용해서 application을 정리하거나 같은 코드를 다양한 곳에서 사용할 수 있다. AngularJS는 application의 요소가 service에 depend할 때만 사용 가능하다. 그리고 한 요소는 자기가 depend하고 있는 service의 factory로 만들어진 한 instance만 사용할 수 있다.   
AngularJS 자체적으로 만들어진 유용한 service들도 있지만 (`$http`와 같은 것), 대체적으로 직접 만드는 쪽이 더 빠르고 편하다. 그리고 AngularJS가 자체적으로 주는 service들은 무조건 앞에 `$`로 시작한다(`$http` 같이).  


How to use Service?
-------------------
AngularJS의 Service를 이용하기 위해선 원하는 service를 해당 요소(controller, service, filter나 directive)의 dependency로 추가한다. 나머지 작업은 AngularJS의 DI가 알아서 한다. 아래의 예제를 통해서 간단한 Service를 사용해보자.  

~~~
// index.html

~~~

~~~
// script.js

~~~

~~~
// protractor.js

~~~



Creating Services
-----------------
AngularJS를 사용하는 개발자들은 AngularJS Module과 함께 Service의 이름과 Factory Function을 지정해줘서 자유롭게 Service를 만들 수 있다. Service의 **Factory Function**은 application에게 사용될 object나 함수를 만든다. 이 Service로부터 받은 object나 함수의 결과는 이 service를 사용한다는 dependency를 선언한 모든 요소(controller, service, filter나 directive)에 주어진다.  
  
Factory를 사용해서 service를 만들 경우, 먼저 object를 만들고, property들을 더하고, 그리고 그 object를 반환해준다. 그래서 대체적으로 Factory에서 반환하는 값은 단순한 value가 아닌 함수나 property들이 모인 object이다.  
  
  
### Registering Service
Service는 Module API를 통해서 Module로 등록이 된다. 일반적으로 Module factory API를 사용해서 service를 등록한다.  

~~~
var myModule = angular.module('myModule', []);
myModule.factory('serviceId', function() {
	var shinyNewServiceInstance;

	// shinyNewServiceInstance를 만드는 factory function의 본문이다.

	return shinyNewServiceInstance;
});
~~~
여기에서 주의할 점은 **Service Instance**자체를 등록하는 것이 아니라, Service Instance가 불렸을 때에 Instance를 만드는 **Factory Function**이 등록되는 것이다.  



Dependencies
-------------
Service는 자기만의 Dependency를 가질 수 있다. Controller에서 dependency를 선언하듯이, Service에서도 자기의 factory function signature에 dependency를 선언하는 것이다. 아래의 예제의 모듈에는 다양한 dependencies를 가지고 있는 두 service들이 있다.  

~~~
var batchModule = angular.module('batchModule', []);	// 이 모듈의 이름은 'batchModule'이다.
							// 이 모듈을 사용하려면 'ng-app'에 'batchModule'을 입력하면 된다.

// 이것은 'batchLog'라는 service이다.
// 이 service가 하는 역할은 메시지가 메모리에 계속 쌓이고 50초에 한 번 모든 것이 출력이 되도록 하는 것이다.
batchModule.factory('batchLog', ['$interval', '$log', function($interval, $log) {
	var messageQueue = [];	//messageQueue라는 빈 Array를 선언한다.

	// 'batchModule' module의 'batchLog' service의 log()라는 함수이다.
	function log() {
		// messageQueue에 뭔가 있다면 실행
		if (messageQueue.length) {
			$log.log('batchLog messages: ', messageQueue);	// '$log' service의 log라는 함수이다.
			messageQueue = [];	// messageQueue를 초기화
		}
	}

	$interval(log, 50000);	// 50초에 1번씩 log()함수를 실행시킨다.

	return function(message) {
		messageQueue.push(message);	// messageQueue Array에 message를 넣는다.
	}
}]);


