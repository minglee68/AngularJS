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
