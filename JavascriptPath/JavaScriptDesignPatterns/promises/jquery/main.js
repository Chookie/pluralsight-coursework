'use strict';
require.config({
	baseUrl: '.',
	paths: { 
		jquery: './node_modules/jquery/dist/jquery'
	}
});

require(['jquery', './api'], function($, api) {
	// Create a jQuery Plugin
	$.fn.blinky = function(args) {
		var opts = {frequency: 1000, count: -1};
		// Merge 2 objects into the first object.  1st arg = deep
		args = $.extend(true,opts, args);

		var i = 0,
			that = this,
			// create a new instance of jQuery deferred API
			dfd = $.Deferred();

		var go = function() {
			if (that.length === 0) {
				// Nothing selected
				return dfd.reject();
			}

			if (i === args.count) {
				// Blinked required number of times
				return dfd.resolve();
			}

			// do the blinking in a recursive setTimeout pattern
			i++;
			// Fade out in half time and back in for other half
			$(that).fadeOut(args.frequency / 2).fadeIn(args.frequency / 2);
			// Recursive every frequeny interval
			setTimeout(go, args.frequency);
		};

		go();
		// return the jQuery deferred object
		return dfd.promise();
	};

	$(document).ready( function() {
		$('.load-tweets').submit( function(e) {
			e.preventDefault();

			var user = $(this).find('input').val();

			// Use jQuery when function to wait for 2 different promises to complete before doing done
			$.when(api.timeline(user), $(this).find('input').blinky({count: 2}))
				// change argument to args instead of tweets since getting result from both promises
				.done( function(args) {
					var el = $('.twitter').empty();
					var lis = [];
					// tweets is first result since was called first
					var tweets = args[0];

					for(var i = 0, il = tweets.length; i < il; i++) {
						lis.push($('<li><strong>@' + user + '</strong>: ' + tweets[i].title + '</li>'));
					}

					el.append(lis);
				}).fail(function( jqxhr, textStatus, error ) {
				    var err = textStatus + ", " + error;
				    console.log( "Request Failed: " + err );
				}).fail( function() {
					window.alert("There was a problem");
				});
		});
	});
});