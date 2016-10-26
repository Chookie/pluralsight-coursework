'use strict';

class Restaurant {
	constructor() {
		this._id=9000;
	}

	set id(value) {
		this._id = value;
	}
}

let r = new Restaurant();
let alt = { };
Reflect.set(r, '_id', 88, alt);
console.log(r._id);
console.log(alt._id);

