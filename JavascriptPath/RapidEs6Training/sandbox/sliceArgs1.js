'use strict';

function testArgs() {
	let args = [].slice.call(arguments);
	console.log(args);
}

testArgs(1,2,3);