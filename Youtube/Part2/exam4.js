var app4 = angular.module('app4', []);

app4.controller('mainCtrl', function(){
	this.name = "Animal";
	this.sound = "Grrr";

	this.animalClick = function(){
		alert(this.name + " says " + this.sound);
	};
});



app4.controller('dogCtrl', function($controller){
	var childCtrl = this;

	childCtrl.child = $controller('mainCtrl', {});

	childCtrl.child.name = "Dog";

	childCtrl.child.bark = "Wooof";

	childCtrl.child.dogData = function(){
		alert(this.name + " says " + this.sound + " and " + this.bark);
	};
});
