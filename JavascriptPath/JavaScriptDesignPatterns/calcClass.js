'use strict';

class Calc {
	constructor(start) {	
		this.start = start;
	}

	add(value) {
		this.start = this.start + value;
		return this;
	}

	multiply(value) {
		this.start = this.start * value;
		return this;
	}

	equals(callback) {
		callback(this.start);
	}
}

new Calc(0)
	.add(1)
	.add(2)
	.multiply(3)
	.equals( function(result) {console.log(result)});