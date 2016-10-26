var Promise = require('./promise.js');

var promise = new Promise();

// Inbvoke reolve action 
setTimeout( function() {
	promise.resolve({ result: 'OK'});
},1000);

// Register for done.  Deliberatley registering after already resolved.
// so should get same result as first done registratiom;
setTimeout( function() {
	promise.done( function(result) {
		console.log("Handler added after deferred object is done with result=" + JSON.stringify(result));
	});
}, 2000);

// Register first done handler
promise.done( function(result) {
	console.log("Deferred object is done with result=" + JSON.stringify(result));
});

var promise2 = new Promise();

promise2.done( function(result) {
	console.log("Promise #2 is done");
}).failed( function(error) {
	console.log("Promise #2 failed with error=" + JSON.stringify(error));
});

setTimeout( function() {
	promise2.fail({message: 'Testing fail for promise #2'});
},1000);

setTimeout( function() {
	promise2.resolve({message:"Promise #2 should throw error since already done"});
}, 2000);