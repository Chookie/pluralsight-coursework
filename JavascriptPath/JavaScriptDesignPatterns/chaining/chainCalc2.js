function Calc(start) {
	function add(x) {
		start = start + x;
		return this;
	}

	function multiply(x) {
		start = start * x;
		return this;
	}

	function equals(callback) {
		callback(start);
		return this;
	}

	return {
		add: add,
		multiply: multiply,
		equals: equals
	};
}

new Calc(0)
	.add(1)
	.add(2)
	.multiply(3)
	.equals(function(result) {
		console.log(result);
	});