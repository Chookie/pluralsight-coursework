'use strict';

import $ from 'jquery';

$(document).ready( function() {
	var productList = $('.products');
	var cartCount = 0;

	productList.on('click', 'i', function() {
		var $this = $(this);
		var li;

		 if ($this.hasClass('fa-plus')) {
                cartCount++;

                $this.removeClass('fa-plus')
                    .addClass('fa-minus')
                    .attr('title', 'Remove from cart');

                li = $('<li>' + $this.parents('section:first').find('h1').html() + '</li>').data('item', this);
                $('.big-cart ul').append(li);
            } else {
                cartCount--;

                $this.addClass('fa-plus')
                    .removeClass('fa-minus')
                    .attr('title', 'Remove from cart');

                $('.big-cart ul li').filter(function () {
                    return $(this).data('item') === $this[0];
                }).remove();
            }

            $('.mini-cart span').html(cartCount);
            $('.big-cart h1').html(cartCount);
	});
});