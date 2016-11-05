'use strict';

(function() {
  var React = require('react');
  var Header = require('./common/header');
  var RouteHandler = require('react-router').RouteHandler;
  global.$ = global.jQuery = require('jquery');

  var App = React.createClass({
    render: function() {
      return (
        <div>
          <Header />
          <div className='container-fluid'>
            <RouteHandler />
          </div>
        </div>
      );
    }
  });

  module.exports = App;
})();
