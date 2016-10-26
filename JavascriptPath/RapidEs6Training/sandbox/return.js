'use strict';

function *process() {
	yield 9000;
	yield 9001;
	yield 9002;
}

let it = process();
console.log(it.next().value);
console.log(it.return('foo'));
console.log(it.next());