'use strict';

var Promise = function() {
	var status = 'progress', 
		data,
		done = [],
		fail = [];

	// Register subscribers for when done
	this.done = function(fn) {
		done.push(fn);

		// If registering after done then call straight away.
		if(status === 'done') {
			fn(data);
		}

		return this;
	};

	// Register subscribers for when fails
	this.failed = function(fn) {
		fail.push(fn);

		// If registering after a failure then fail straight away.
		if(status === 'failed') {
			fn(data);
		}

		return this;
	};

	// Publisher calls when code is complete. Will call done.
	this.resolve = function(result) {
		if(status !== 'progress') {
			throw 'Promise has already completed with a status of ' + status + ' and cannot be called again';
		}

		status = 'done';
		data = result;

		for( var i=0, il=done.length; i<il; i++) {
			done[i](data);
		}

		return this;
	};

	// Publisher calls when an error occurs.  Calls all failed methods.
	this.fail = function(reason) {
		if(status !== 'progress') {
			console.log("Throwing with reason " + reason);
			throw 'Promise has already completed with a status of ' + status + ' and cannot be called again';
		}

		status = 'failed';
		data = reason;

		for( var i=0, il=fail.length; i<il; i++) {
			fail[i](data);
		}

		return this;
	};
};

module.exports = Promise;