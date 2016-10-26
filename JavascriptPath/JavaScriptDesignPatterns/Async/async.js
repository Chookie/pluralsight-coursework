var load = function() {
    var array = [];
    for (var i = 0; i < 1000; i++) {
        array.push(i);
    }
    return array;
}

var buffer = function(items, iterFn, callback) {
    var i = 0;
    var len = items.length;

    setTimeout(function() {
    	var result;

    	// +new Date : returns date in ms
    	// iterate for 50ms then stop
    	for(var start = +new Date; i < len && result !== false && ((+new Date) - start < 50); i++) {
    		result = iterFn.call(items[i], items[i], i);
    	}

    	if (i < len && result !== false) {
    		// arguments.callee calls this function again (the function called by setTimeout above)
    		// Waits 20 ms to let UI do work.
    		setTimeout(arguments.callee, 20);
    	} else {
    		callback(items);
    	}
   	// initially wait 20 ms to let ui work.
    }, 20);
}

var display = function(data) {
    var html = '';

    buffer(data, function(item) {
        html += '<li>' + item + '</li>';
    }, function() {
        $('ul').append(html);
    });
}

$(document).ready(function() {
    var data = load();
    display(data);
});
