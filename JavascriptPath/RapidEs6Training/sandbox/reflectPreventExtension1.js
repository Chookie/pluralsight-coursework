'use strict';

let rest = {
	id: 2000
};

Reflect.preventExtensions(rest);
rest.location = 'Sicily';

console.log(rest);