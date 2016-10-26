'use strict';

require.config({
	baseUrl: '.',
	paths: { 
		jquery: './node_modules/jquery/dist/jquery'
	}
});

require(['jquery', './api'], function($, api) {
	$(document).ready( function() {
		$('.load-tweets').submit( function(e) {
			e.preventDefault();

			var user = $(this).find('input').val();

			api.timeline(user)
				.done( function(tweets) {
					var el = $('.twitter').empty();
					var lis = [];

					for(var i = 0, il = tweets.length; i < il; i++) {
						lis.push($('<li><strong>@' + user + '</strong>: ' + tweets[i].title + '</li>'));
					}

					el.append(lis);
				}).fail(function( jqxhr, textStatus, error ) {
				    var err = textStatus + ", " + error;
				    console.log( "Request Failed: " + err );
				});
		});
	});
});