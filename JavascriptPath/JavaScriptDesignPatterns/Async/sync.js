var load = function() {
	var array = [];
	for(var i=0; i<1000; i++) {
		array.push(i);
	}
	return array;
}

var display = function(data) {
	var html = '';
	for(var i=0; i < data.length; i++) {
		html += '<li>' + data[i] + '</li>';
	}
	$('ul').append(html);
}


$(document).ready( function() {
	var data = load();
	display(data);
});
