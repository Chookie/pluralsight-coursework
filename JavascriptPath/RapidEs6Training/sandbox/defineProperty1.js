'use strict';

class Restaurant {

}

let r = new Restaurant();

Reflect.defineProperty(r, 'id', {
	value: 2000,
	configurable: true,
	enumerable: true
});

console.log(r.id);
console.log(r['id']);
