define(['jquery'], function($) {
	return {
		timeline: function(user) {
			var baseUrl = 'http://jsonplaceholder.typicode.com/';
			return $.getJSON(baseUrl + user);
		}
	};
});