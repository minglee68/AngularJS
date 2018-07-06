AngularJS Tutorial
==================
https://www.youtube.com/watch?v=gu6TfGZXUZs&t=406s    
위의 동영상을 그대로 따라하고 정리한 것이다.  
  

Getting New Items and Checking Errors
--------------------------------------
여기에선 Grocery List를 Table로 출력하고, 사용자가 데이터를 더하면 그 데이터가 리스트에 더해지는 것을 해본다. 그리고 만일 알 수 없는 데이터나 아무 데이터도 입력을 하지 않은 채 입력을 하려고 하면 Error를 출력한다.  
  
~~~
// angulartut1.html
<!DOCTYPE html>
<html ng-app="app1" ng-cloak>
	<head>
		<title>Example</title>
		<style>
		[ng\:cloak], [ng-cloak], .ng-cloak {
			display: none;
		}
		table {
			width: 400px;
			text-align: left;
			border: 2px solid black;
			padding: 10px;
		}
		input.ng-dirty.ng-invalid {
			border-color: red;
		}
		</style>
	</head>
	<body>
		<div ng-controller="gListCtrl">
			
			<h3>Grocery List</h3>

			<table>
				<thead>
					<tr>
						<th>Item</th>
						<th>Purchased</th>
					</tr>
				</thead>
				<tr ng-repeat="grocery in groceries">
					<td>{{grocery.item}}</td>
					<td>
						<input type="checkbox" ng-model="grocery.purchased" />
					</td>
				</tr>
			</table>
			<br>

			<label>New Item:
				<input type="text" ng-model="newItem" />
			</label>
			<button ng-click="addItem(newItem)">Add Item</button>

			<h4>{{missingNewItemError}}</h4>


		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam1.js"></script>
	</body>
</html>
~~~

~~~
// exam1.js
var app1 = angular.module('app1', []);

app1.controller('gListCtrl', function($scope) {
	$scope.groceries = [
		{item: "Tomatoes", purchased: false},
		{item: "Potatoes", purchased: false},
		{item: "Bread", purchased: false},
		{item: "Hummus", purchased: false}
	];

	$scope.addItem = function(newItem) {
		if(!(newItem == undefined || newItem === "")){
			$scope.groceries.push({item: newItem, purchased: false});
			$scope.missingNewItemError = "";
		} else {
			$scope.missingNewItemError = "Please Enter an Item";
		}
	};

});
~~~
먼저 HTML 파일에서 script tag를 통해서 AngularJS를 import하고, 'exam1.js'를 import한다. 그리고 html tag에서 `ng-app`로 `app1` Module을 부른 뒤 div tag에서 `ng-controller`로 `gListCtrl` Controller를 불렀다. 그런 다음 Table을 만들기 시작했다.   
  
Table을 만들 때에 먼저 thead element로 Table의 Head부분을 지정했고, 그 다음부터 `ng-repeat`을 통해서 `$scope.groceries`의 object들을 하나씩 `grocery`에 넣어서 출력했다. 출력할 때에 Item부분은 Expression으로 출력했고, Purchased부분은 Check Box를 만들어서 거기에 `ng-model`로 `grocery.purchased`를 적용시켜서 `grocery.purchased`가 true라면 Check를 넣고 false라면 Check가 없게 했다.   
  
그런 다음 New Item을 사용자가 입력할 수 있도록 Text Box를 만들었다. 이 Text Box로 입력된 것은 `ng-model`로 `newItem`이라는 새로운 property안에 들어가고, 그런 다음 'Add Button'을 누르면 `ng-click`을 통해서 `addItem()` 함수에 `newItem` property를 보냈다.    
  
`addItem()`함수는 `newItem`을 받으면 먼저 그것이 `undefined`이거나 빈 property가 아닌지 확인한다. 만일 아닌 것이 확인이 되면 JavaScript의 Array push method로 `$scope.groceries`에 newItem을 더한다. 그리고 `$scope.missingNewItemError`이라는 property를 빈 property로 만든다. 반대로 만일 `newItem`이 `undefined`이거나 빈 property이면 더하지 않고 `$scope.missingNewItemError`에 Item을 넣어달라고 말한다.  
  


Simple Register Page
----------------------
다음으론 위의 기능에 몇 가지 기능을 더해서 사용자 등록 시스템을 만들어 보자. 일단 먼저 전체 코드를 봐보자.   
  
~~~
// angulartut2.html
<!DOCTYPE html>
<html ng-app="app2" ng-cloak>
	<head>
		<title>Example</title>
		<style>
		[ng\:cloak], [ng-cloak], .ng-cloak {
			display: none;
		}
		table {
			width: 400px;
			text-align: left;
			border: 2px solid black;
			padding: 10px;
		}
		input.ng-dirty.ng-invalid {
			border-color: red;
		}
		</style>
	</head>
	<body>
		
		<div ng-controller="userCtrl">

			<h3>User List</h3>

			<form name="userForm" ng-submit="saveUser(userInfo)">
				
				<label>First Name: </label>
				<input type="text" name="fName" 
				ng-model="userInfo.fName" 
				ng-required="true" 
				ng-minlength="2" />

				<span class="error-message" ng-show="userForm.fName.$dirty && userForm.fName.$error.required">
					Must Enter a First Name
				</span>

				<span class="error-message" ng-show="userForm.fName.$dirty && userForm.fName.$error.minlength">
					Must be a Minimum of 2
				</span>


				<br><br>


				<label>Last Name: </label>
				<input type="text" name="lName" 
				ng-model="userInfo.lName" 
				ng-required="true" 
				ng-minlength="2" />

				<span class="error-message" ng-show="userForm.lName.$dirty && userForm.lName.$error.required">
					Must Enter a Last Name
				</span>

				<span class="error-message" ng-show="userForm.lName.$dirty && userForm.lName.$error.minlength">
					Must be a Minimum of 2
				</span>	


				<br><br>


				<label>Street: </label>

				<input type="text" name="street" 
				ng-model="userInfo.street" 
				ng-required="true" 
				ng-minlength="6" 
				ng-pattern="/^(\d{3,})\s?(\w{0,5})\s([a-zA-Z]{2,30})\s([a-zA-Z]{2,15})\.?\s?(\w{0,5})$/" />

				<span class="error-message" ng-show="userForm.street.$dirty && userForm.street.$invalid">
					Must Enter a Number, Street, and Street Type (ex: 123 Main St.)
				</span>


				<br><br>


				<label>Subscribe: </label>

				<input type="checkbox" name="subscribe" 
				ng-model="userInfo.subscribe" 
				ng-true-value="'Subscribe'" 
				ng-false-value="'Don\'t Subscribe'" />


				<br><br>


				<label>Delivery Method: </label>
				<select name="delivery" ng-model="userInfo.delivery" ng-required="true">
					<option value="Email">Email</option>
					<option value="Mail">Mail</option>
				</select>


				<br><br>


				<input type="submit" value="Save" ng-disabled="userForm.$invalid" />



				<ul>
					<li ng-repeat="item in user">
						{{ 'User: ' + item.fName + " " + item.lName + " " + item.street + " " + item.subscribe + " " + item.delivery }}
					</li>
				</ul>

			</form>

		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"></script>
		<script src="exam2.js"></script>
	</body>
</html>
~~~

~~~
// exam2.js
var app2 = angular.module('app2', []);

app2.controller('userCtrl', function($scope) {
	$scope.user = [{
		fName: "Derek",
		lName: "Banas",
		subscribe: "Subscribe",
		delivery: "Email"
	}];

	$scope.saveUser = function(userInfo){
		if($scope.userForm.$valid){
			$scope.user.push({
				fName: userInfo.fName,
				lName: userInfo.lName,
				street: userInfo.street,
				subscribe: userInfo.subscribe,
				delivery: userInfo.delivery
			});
			console.log('User Saved');
		} else {
			console.log("Error: Couldn't Save User");
		}
	};
});
~~~
뭔가 많아 보인다. 하지만 복잡하게 생각하지 않고 하나씩 봐보면 이해하기 편하다. 일단 전체적인 설명을 하자면, 사용자를 등록하는 페이지인데, 우리가 원하는 형식으로 입력이 되면 'Save' Button을 누를 수 있게 한다. 그렇다면 이제 한 항목씩 차례대로 봐보자.    
  

### First Name 항목  
  
~~~
// angulartut2.html
...

<form name="userForm" ng-submit="saveUser(userInfo)">
	
	<label>First Name: </label>
	<input type="text" name="fName" 
	ng-model="userInfo.fName" 
	ng-required="true" 
	ng-minlength="2" />

	<span class="error-message" ng-show="userForm.fName.$dirty && userForm.fName.$error.required">
		Must Enter a First Name
	</span>

	<span class="error-message" ng-show="userForm.fName.$dirty && userForm.fName.$error.minlength">
		Must be a Minimum of 2
	</span>

	...

</form>

...
~~~
일단 먼저 여기엔 안 나와있지만 div tag에서 `ng-controller`로 `userCtrl` Controller를 부른다. 그리고 나서 form tag를 만들건데, 이 form을 통해서 우리의 사용자 데이터를 `saveUser()`이라는 method로 보낼 것이다. 먼저 form element에게 `userForm`이라는 이름을 준다. 이것으로 이 form안에서 받는 모든 데이터는 `userForm`이라는 form아래에 들어간다. 그리고 `ng-submit`을 통해서 `userForm`안에서 입력한 데이터를 `saveUser()` method에 `userInfo`라는 property로 보낸다고 선언한다.   
  
첫번째로 우리는 사용자의 First Name을 받을 것이다. 여기서 입력받는 데이터는 적어도 2문자 이상이라고 먼저 제한을 놓을 것이다. 그러기 위해서 가장 중요한 것은 실제 입력을 받을 input element의 attribute들이다. 먼저 Text Box로 입력을 받을 것이기 때문에 당연히 `type` attribute는 `text`이다. 그리고 이 input element의 이름을 `name` attribute로 `fName`으로 지정한다. 그리고 여기서 받은 입력은 `ng-model`로 `userInfo.fName`에 들어간다고 한다. `ng-required`는 `true`로 지정해놔서 이 항목이 입력이 되어야 한다는 것을 알려주고, `ng-minlength="2"`로 이 항목에 입력되는 값이 적어도 2문자 이상이라고 지정한다.    
  
다음으로 span을 두가지를 만드는데, 하나는 만약에 입력이 안 되어있으면 입력을 해야된다는 문구를 출력하는 것이고, 나머지 하나는 만일 입력된 문자열이 2문자 미만이면 2문자 이상 입력해야 한다는 문구를 출력하는 것이다.  
  
먼저 첫번째 span을 봐보자. 이 span은 오류에 대한 문구이기 때문에 class를 `"error-message"`로 지정한다. 그렇다면 `ng-show`는 무엇인가? 이것은 만일 `ng-show`가 'true'이면 출력되고, 'false'면 출력되지 않는 것이다. 지금 `ng-show`안에 들어간 것은 일종의 if statement라고 생각하면 된다. 먼저 `userForm`이라는 form element에서 `fName`이라는 이름을 갖는 input element에 어떤 변화가 주어진다면(`$dirty`) 'true'가 반환된다. 그리고 `&&`의 뒷부분은 만일 `userForm`이라는 form element에서 `fName`이라는 input element에 대해서 `ng-required`에 대해서 어떤 에러가 나오면(`$error.required`) 'true'가 반환된다. 이 statement들이 둘 다 'true'이면 `ng-show`에 'true'가 반환된다.   
  
다음 span도 비슷한 개념이다. 하지만 다른 점은 `$error.required`가 `$error.minlength`로 바뀌었다는 것인데, 이것은 만일 `ng-minlength`에 대해서 어떤 에러가 나오면 'true'가 반환된다는 것이다.  
  
위와 같은 방식으로 바로 밑에 Last Name도 만든다.    
  
**여기서 주의할 점:** 처음 보면 input element의 `name="fName"`과 `ng-model="userInfo.fName"`에 뭔가 관계가 있을 것 같지만, 이것들은 전혀 다른 것이다. 먼저 `ng-model="userInfo.fName"`의 `fName`은 'exam1.js'의 안에 있는 `userInfo` object의 `fName`이다. 하지만 `name="fName"`은 input element에 대한 이름으로, 나중에 `ng-show`안에서 쓰이는 `userForm.fName`이 이 `fName`을 사용하는 것이다.  
   
   
   
### Street 항목

~~~
// angulartut2.html
...

<form name="userForm" ng-submit="saveUser(userInfo)">

	...

	<label>Street: </label>

	<input type="text" name="street" 
	ng-model="userInfo.street" 
	ng-required="true" 
	ng-minlength="6" 
	ng-pattern="/^(\d{3,})\s?(\w{0,5})\s([a-zA-Z]{2,30})\s([a-zA-Z]{2,15})\.?\s?(\w{0,5})$/" />

	<span class="error-message" ng-show="userForm.street.$dirty && userForm.street.$invalid">
		Must Enter a Number, Street, and Street Type (ex: 123 Main St.)
	</span>

	...

</form>
~~~
주소는 어느 정도 형식이 정해져있기 때문에, 만일 그 형식에 맞지 않게 입력이 들어온다면 오류를 출력하게 할 수 있다. 그렇기 때문에 원하는 형식을 Regular Expression을 사용해서 `ng-pattern`에 넣는다. 그리고 span에서 `userForm.street.$invalid`로 만일 입력이 형식에 맞지 않는 입력이라면 오류를 출력하게 한다.  
  


### Subscribe 항목

~~~
// angulartut2.html
...

<form name="userForm" ng-submit="saveUser(userInfo)">

	...

	<label>Subscribe: </label>

	<input type="checkbox" name="subscribe" 
	ng-model="userInfo.subscribe" 
	ng-true-value="'Subscribe'" 
	ng-false-value="'Don\'t Subscribe'" />
	
	...

</form>

...
~~~
어떤 사이트에서 새로운 계정을 만들 때에 Newsletter같은 것을 subscribe하라는 항목을 많이 봤을 것이다. 하지만 그것은 필수가 아니고 대부분 optional한 항목으로 남겨둔다. 우리도 optional하게 하기 위해서 `ng-required`를 더하지 않았고, `ng-true-value`로 Check Box에 Check가 들어왔을 때에 `ng-model="userInfo.subscribe"`에 넣는 데이터 `'Subscribe'`와 `ng-false-value`로 Check가 안됬을 경우에 `userInfo.subscribe`에 넣을 데이터 `'Don't Subscribe'`를 지정해놨다. 이렇게 한 이유는 어떤 선택을 하던간에 무조건 `userInfo.subscribe`안에 넣기 위함이다.  
  
  


### Delivery Method 항목

~~~
// angulartut2.html
...

<form name="userForm" ng-submit="saveUser(userInfo)">

	...

	<label>Delivery Method: </label>
	<select name="delivery" ng-model="userInfo.delivery" ng-required="true">
		<option value="Email">Email</option>
		<option value="Mail">Mail</option>
	</select>

	...

</form>

...
~~~
여기에선 사용자에게 뭔가를 보낼때에 Mail로 보낼지 Email로 보낼지를 정하는 것이다.  
  
먼저 select element의 이름을 `"delivery"`로 하고, 여기서 선택된 option의 value가 `userInfo.delivery`안에 들어가도록 `ng-model`을 지정한다. 그런 다음 select element안에서 option element들을 만드는데, `userInfo.delivery`안에 들어갈 값들을 option element의 `value`로 지정한다.  
   
  


### Save 버튼

~~~
// angulartut2.html
...

<form name="userForm" ng-submit="saveUser(userInfo)">
	
	...

	<input type="submit" value="Save" ng-disabled="userForm.$invalid" />

	...

</form>

...
~~~
이제 입력의 마지막 부분인 Save버튼이다. 여기에서 input element의 type를 `submit`으로 주고, 만일 이 Form안에서 required된 것이 입력되지 않은 것이 하나라도 있다면 버튼을 누를 수 없게 하도록 `ng-disabled="userForm.$invalid"`를 더해준다. 여기서 모든 필요한 입력을 다 하고 버튼을 누르면 form element의 `ng-submit`이 작동되서 $scope의 saveUser()함수에 지금 입력된 `userInfo`를 보낸다. 여기서 한 번 saveUser()함수를 봐보자.  
  

~~~
// exam2.js
var app2 = angular.module('app2', []);

app2.controller('userCtrl', function($scope) {
	$scope.user = [{
		fName: "Derek",
		lName: "Banas",
		subscribe: "Subscribe",
		delivery: "Email"
	}];

	$scope.saveUser = function(userInfo){
		if($scope.userForm.$valid){
			$scope.user.push({
				fName: userInfo.fName,
				lName: userInfo.lName,
				street: userInfo.street,
				subscribe: userInfo.subscribe,
				delivery: userInfo.delivery
			});
			console.log('User Saved');
		} else {
			console.log("Error: Couldn't Save User");
		}
	};
});
~~~
먼저 이 모듈의 이름은 `app2`이고, 우리가 사용할 Controller의 이름은 `userCtrl`이다. 먼저 `$scope.user` object array를 만든다. 여기서 중요한 점은 이게 object ARRAY라는 것이다. 지금은 하나만 들어가있지만, 나중에 이 `$scope.user`안에 더 넣을 것이다.  
  
그리고 다음으로 saveUser()함수를 만든다. 먼저 `userInfo`로 사용자로부터 받은 모든 입력들을 한 object로 받은 뒤, 만일 이 object가 우리가 지정한 형식대로 모두 $valid하다면 그것을 `$scope.user`로 push를 해서 더하면서 console.log에 사용자가 저장되었다는 것을 출력하고, 만일 $valid하지 않고 $invalid하다면 더하지 않고 console.log에 사용자를 저장할 수 없었다고 출력한다.  
  
  


### 사용자 리스트 출력

~~~
// angulartut2.html
...

<form name="userForm" ng-submit="saveUser(userInfo)">
	
	...
	
	<ul>
		<li ng-repeat="item in user">
			{{ 'User: ' + item.fName + " " + item.lName + " " + item.street + " " + item.subscribe + " " + item.delivery }}
		</li>
	</ul>

</form>

...
~~~
이제 지금까지 저장된 모든 사용자의 데이터를 `ng-repeat`로 출력한다. `$scope.user`안에 있는 모든 object를 하나씩 `item`안에 넣어서 이 `item`을 사용해서 출력한다. 





















