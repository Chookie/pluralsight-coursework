'use strict';

// import $ from 'jquery';
// import bigCart from './big-cart';
// import miniCart from './mini-cart';
// import productList from './product-list';

var $ = require('jquery');
var bigCart = require('./big-cart');
var miniCart = require('./mini-cart');
var productList = require('./product-list');

$(document).ready( function() {
	bigCart.init();
    miniCart.init();
    productList.init();
});