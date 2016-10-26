'use strict';

// import $ from 'jquery';
// import pubsub from './pubsub';
var $ = require('jquery');
var pubsub = require('./pubsubMessaging');

var cart;
var count = 0;

pubsub.sub('add-to-cart', function(item) {
	 count++;

	 cart.find('h1').html(count);

	 // Data key is juse used to find item to remove later
	var cache = {};
	 var li = $('<li />')
	 	.html(item.name)
	 	.data('key', item.id);

	 cart.find('ul').append(li);
});

pubsub.sub('remove-from-cart', function(item) {
	count--;

	// update count
	cart.find('h1').html(count);

	// Iterate through items to find matching key
	cart.find('li').filter(function() {
		return $(this).data('key') == item.id;
	}).remove();
});

module.exports = {
	init : function() {
		// Save us finding element in dom everytime
		// cart will be caught by closure of the module level.
		cart = $('.big-cart');
	}
};