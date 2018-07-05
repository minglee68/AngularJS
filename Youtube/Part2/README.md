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
			border.color: red;
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
  







