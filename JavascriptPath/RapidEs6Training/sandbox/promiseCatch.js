'use strict';

function doAsync() {
	let p = new Promise(function(resolve, reject) {
		console.log('in promise code');
		setTimeout(function() {
			console.log('resolving');
			//resolve('Database load complete');
			reject('Error occurred');
		},2000);
	});
	return p;
}

doAsync().then( function(value) {
	console.log('Fulfilled! ' + value);
	return 'Result from first then';
}).catch( function(reason) {
	console.log('Rejected! ' + reason);
});