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
  
첫번째로 우리는 사용자의 First Name을 받을 것이다. 여기서 입력받는 데이터는 적어도 2문자 이상이라고 먼저 제한을 놓을 것이다. 그러기 위해서 가장 중요한 것은 실제 입력을 받을 input element의 attribute들이다. 먼저 Text Box로 입력을 받을 것이기 때문에 당연히 `type` attribute는 `text`이다. 









