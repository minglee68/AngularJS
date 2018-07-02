AngularJS First Example
=======================

여기에서는 이번 튜토리얼에서 사용한 코드들을 설명한다.


~~~
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"></script>
<div ng-app>
<p><label>Name:</label><input ng-model="yourName" type="text" /></p>
<p>Hello ｛｛yourName｝｝!</p>
</div>
~~~

먼저 첫번째 줄은 GoogleAPI의 AngularJS를 불러들인다. 이게 없으면 AngularJS를 못 쓴다.  
두번째 줄의 'ng-app'은 "이 요소는 AngularJS의 Application입니다!"라고 지정해주는 것이다.  
세번째 줄은 Text-box를 설치하고, 그것이 AngularJS의 Model이라고 'ng-model'로 선언하고 있다.
네번째 줄은 {{yourName}}의 'yourName'부분에 'ng-model'에서 지정한 Model의 Data를 Real-Time으로 출력한다. (AngularJS에서 Template라고 부른다)  


