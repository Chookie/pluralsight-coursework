'use strict';

// import $ from 'jquery';
// import pubsub from './pubsub';
var $ = require('jquery');
var pubsub = require('./pubsubMessaging');


var init = function() {
	var productList = $('.products');

	productList.on('click', 'i', function() {
		var $this = $(this);
		var item = {
			id: this,
			name: $this.parents('section:first').find('h1').html()
		};

		if ($this.hasClass('fa-plus')) {
			pubsub.pub('add-to-cart', item);

            $this.removeClass('fa-plus')
                .addClass('fa-minus')
                .attr('title', 'Remove from cart');
        } else {
			pubsub.pub('remove-from-cart', item);

            $this.addClass('fa-plus')
                .removeClass('fa-minus');
        }
	});		
};

module.exports = {
	init: init
};