'use strict';

function Employee() {
	this.name = 'Alison Johnston';
	this.salary = 100;
}
let e = new Employee();

var p = new Proxy(e, {
	get: function(target, property, receiver) {
		return Reflect.get(target, property, receiver);		
	}
});

console.log(p.salary);
console.log(p.name);