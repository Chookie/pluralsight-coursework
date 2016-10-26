'use strict';

module.exports = function() {
	var cache = {};

	return {
		pub: function(id) {
			// [] to access the slice method
			// call with this context or arguments and paremeters from slice.
			// arguments is not an actual array, although is array type
			// this trick allows you to convert it to an array.
			var args = [].slice.call(arguments, 1);

			if(!cache[id]) {
				cache[id] = [];
			}

			for (var i=0, il=cache[id].length; i < il; i++) {
				// apply invokes the functions.  
				// apply allows array or args whilst call is comma seperated.
				cache[id][i].apply(null, args);
			}
		}, 
		sub: function(id, fn) {
			if (!cache[id]) {
				// create cache with array of 1 function
				cache[id] = [fn];
			} else {
				// add new function array in cache[id];
				cache[id].push(fn);
			}
		},
		unsub: function(id, fn) {
			if (!id) {
				return;
			}
			if (!fn) {
				// If no fn specified then assume want to remove all for this id.
				cache[id] = [];
			} else {
				 var index = cache[id].indexOf(fn);
				 if (index > -1) {
				 	// No remove from array function so must do this
				 	cache[id] = cache[id].slice(0,index).concat(cache[id].slice(index+1));
				 }
			}			
		}
	};
};