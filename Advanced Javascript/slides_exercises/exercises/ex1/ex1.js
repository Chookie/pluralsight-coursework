( function () {

	// Change A return type so have executed all code before calling A
//A();

	function C() {
		console.log("OOPS!");
	}

	function E(f) {
		console.log("E");
		f();
		var f = F;
	}

	function A() {
		console.log("A");
		B();
	};

	var C;

	function G() {
		console.log("G");
		H();

		function H() {
			console.log("H");
			I();
		};
	}

	var d;
	var D = d;

	function d() {
		console.log("D");
		E(F);
	}

	function I() {
		console.log("I");
		J();
		return;
		J();
	}

	function B() {
		console.log("B");
		C();
	};

	function F() {
		console.log("F");
		G();
	};

	// var rest = "KLMNOPQRSTUVWXYZ".split("");
	// for (var i=0; i<rest.length; i++) {
	// 	(function(i){
	// 		// define the current function
	// 		// This creates the global function K so can call it below
	// 		window[rest[i]] = function() {
	// 			console.log(rest[i]);
	// 			if (i < (rest.length-1)) {
	// 				// TODO: call the next function
	// 				// After K now call the next one and so on
	// 				window[rest[i+1]]();
	// 			}
	// 		};
	// 	})(i);
	// }

	// Above works but don't want global
	var rest = "KLMNOPQRSTUVWXYZ".split(""), obj = {};
	for (var i=0; i<rest.length; i++) {
		(function(i){
			// define the current function
			// This creates the global function K so can call it below
			obj[rest[i]] = function() {
				console.log(rest[i]);
				if (i < (rest.length-1)) {
					// TODO: call the next function
					// After K now call the next one and so on
					obj[rest[i+1]]();
				}
			};
		})(i);
	}

	function J() {
		J = function() {
			console.log("J");
			//return;
			obj.K();
		};
		J();
	};

	function C() {
		console.log("C");
		D();
	};

	return A;

})()();
