'use strict';

function doAsync() {
	let p = new Promise(function(resolve, reject) {
		console.log('in promise code');
		setTimeout(function() {
			console.log('resolving');
			resolve('Database load complete');
			//reject('Error occurred');
		},2000);
	});
	return p;
}

doAsync().then( function(value) {
	console.log('Fulfulled! ' + value);
}, function(reason) {
	console.log('Rejected!' + reason);
});