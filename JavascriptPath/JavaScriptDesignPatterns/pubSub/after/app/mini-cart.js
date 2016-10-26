'use strict';

// import $ from 'jquery';
// import pubsub from './pubsub';
var $ = require('jquery');
var pubsub = require('./pubsubMessaging');

var cart;
var count = 0;

pubsub.sub('add-to-cart', function() {
	 count++;

	 cart.find('span').html(count);
});

pubsub.sub('remove-from-cart', function() {
	count--;

	// update count
	cart.find('span').html(count);
});

var init = function() {
	// Save us finding element in dom everytime
	// cart will be caught by closure of the module level.
	cart = $('.mini-cart');
};

module.exports = {
	init: init
};