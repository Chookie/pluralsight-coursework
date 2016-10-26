'use strict';

function Calculator(start) {

	this.add = function(value) {
		start += value;
		return this;
	};

	this.multiply = function(value) {
		start *= value;
		return this;
	};

	this.equals = function(callback) {
		callback(start);
		return this;
	};
}

new Calculator(2)
	.add(2)
	.multiply(4)
	.equals( function(result) {
		console.log(result);
		
	});