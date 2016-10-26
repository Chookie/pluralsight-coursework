'use strict';

var cache = {};

module.exports = {
	pub: function(id) {
		// [] to access the slice method
		// call with this context or arguments and paremeters from slice.
		// arguments is not an actual array, although is array type
		// this trick allows you to convert it to an array.
		var args = [].slice.call(arguments, 1);

		if(!cache[id]) {
			cache[id] = {
				callbacks: [],
				args: [args]
			};
		}

		for (var i=0, il=cache[id].callbacks.length; i < il; i++) {
			// apply invokes the functions.  
			// apply allows array or args whilst call is comma seperated.
			cache[id].callbacks[i].apply(null, args);
		}
	}, 
	sub: function(id, fn) {
		if (!cache[id]) {
			// create cache with array of 1 function
			cache[id] = {
				callbacks: [fn],
				args:[]
			};
		} else {
			// add new function array in cache[id];
			cache[id].callbacks.push(fn);
		}

		// Now going to call the new function with all historical arguments
		for (var i=0, il=cache[id].args.length-1; i<il; i++) {
			fn.apply(null, cache[id].args[i]);
		}
	},
	unsub: function(id, fn) {
		if (!id) {
			return;
		}
		if (!fn) {
			// If no fn specified then assume want to remove all for this id.
			cache[id] = {
				callbacks: [],
				args: []
			};
		} else {
			 var index = cache[id].indexOf(fn);
			 if (index > -1) {
			 	// No remove from array function so must do this
			 	cache[id].callbacks = cache[id].callbacks.slice(0,index).concat(cache[id].callbacks.slice(index+1));
			 }
		}			
	}
};