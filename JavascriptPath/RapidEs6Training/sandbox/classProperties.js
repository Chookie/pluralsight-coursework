'use strict';

class Restaurant {
	constructor() {
		this._id = 9000;
	}

	get id() {
		return this._id;
	}

	set id(value) {
		this._id = value;
	}
}

let r = new Restaurant();
r.id = 1;
console.log(r.id);
