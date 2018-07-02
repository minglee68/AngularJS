AngularJS 예제 설명
===================

First Example: Data Binding
---------------------------
이 예제는 어떤 상품에 대한 개수와 가격을 곱해서 총 가격을 출력하는 예제이다. 이것을 통해서 Data Binding이 어떻게 되는지 알아볼 것이다.   
~~~
...
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
...
~~~

먼저 head tag안에서 script tag로 AngularJS를 부른다. 이걸 안 하면 시작이 안 된다.

~~~
<div ng-app ng-init="qty=1;cost=2">
	<b>Invoice:</b>
	<div>
		Quantity: <input type="number" min="0" ng-model="qty">
	</div>
	<div>
		Costs: <input type="number" min="0" ng-model="cost">
	</div>
	<div>
		<b>Total:</b> {{qty * cost | currency}}
	</div>
</div>
~~~
봐보면 HTML형식이지만 안에 처음보는 Markup들이 몇 개 있을 것이다. AngularJS에서는 이것들을 'Template'라고 부른다. AngularJS가 사용자가 만든 Application을 시작할 때에, AngularJS의 컴파일러를 통해서 이 Template들을 새로운 Markup으로 사용한다. 그러면 컴파일러를 통해서 새로 렌더링이 된 DOM이 생긴다. 이 DOM을 View라고 부른다.  

![Scope-DOM](databinding.png)

처음 보이는 새로운 markup은 Directive라는 것이다. 이것은 HTML의 어떤 attribute나 element에 어떤 특징을 지정하는 것이다. 위의 코드에선 `ng-app`라는 attribute를 사용하고 있는데, 이 directive를 통해서 새로운 application을 만든다.   
AngularJS에는 attribute 뿐만이 아니라 어떤 특정 element에 대한 directive도 있는데, 위에서는 `input` element에서 몇가지 새로운 directive를 넣었다. `ng-model`은 특정 입력의 field값을 변수에 저장/update하는 것이다. `min`은 입력의 최소값을 정하는 것으로, 이 최소값보다 작은 값이 들어오면 변수 안에 안 들어간다.   
  
두번째 새로운 markup은 `{{ expression | filter }}`이다. AngularJS의 컴파일러가 이것을 봤을 때에, 지정한 model의 값을 받아서 출력한다. 여기서 `expression`는 AngularJS가 변수에 읽고 쓸 수 있게 해놓은 곳이다. 이 변수들은 전역변수가 아닌, 원래 JavaScript의 Local Variable같이 특정 'Scope'안에서만 있는 변수이다. AngularJS는 변수들이 `expression`에 접근을 할 수 있도록 Scope를 만들어준다. 특정 Scope의 변수에 저장된 값들은 'Model'로 지정이 되는데, 위의 예제에선 Quantity의 값이 'qty'라는 model로, Costs의 값이 'cost'의 model에 들어간다. 그리고 이 model들이 한 Scope안에 있는 것이다.   
  
위의 예제엔 그 외에도 `filter`라는 것이 존재한다. `filter`는 `expression`이 특정의 형식으로 사용자에게 출력이 되도록 하는 역할이다. 위의 예제에선 달러로 보이도록 `currency`가 지정되어있다.  
  
이 예제에서 가장 중요한 점은 입력한 값들이 **live binding**이 된다는 것이다. 입력이 바뀌는 순간 `expression`으로 나오는 출력이 다시 계산되고 DOM이 그 값으로 바뀌어서 출력이 바뀌는 것이다. 이런 컨셉을 Two-way data binding (쌍방향 데이터 바인딩)이라고 한다.

