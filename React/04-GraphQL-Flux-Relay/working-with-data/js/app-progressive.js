'use strict';

// var React = require('react');
// var ReactDOM = require('react-dom');
import React from 'react';
import ReactDOM from 'react-dom';

// var Hello = React.createClass({
//   //render: function () {
//   render() {  // ES6 allows function def this way
//     // return React.createElement('h3', null, "Hello React!");
//     return <h3>Hello ES6</h3>;
//   }
// })
class Hello extends React.Component {
  render() {
    return <h3>Hello React with ES6</h3>
  }
}

// ReactDOM.render(React.createElement(Hello), document.getElementById('react'));
ReactDOM.render(<Hello />, document.getElementById('react'));
