'use strict';

class Calculator {
	constructor(start) {
		this.start = start;
	}

	add(value) {
		this.start += value;
		return this;
	}

	multiply(value) {
		this.start *= value;
		return this;
	}

	equals(callback) {
		callback(this.start);
		return this;
	}
}

new Calculator(2)
	.add(2)
	.multiply(4)
	.equals( function(result) {
		console.log(result);		
	});