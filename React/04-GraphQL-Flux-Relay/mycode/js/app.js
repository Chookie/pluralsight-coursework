'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import Hello from './components/Hello';
import Main from './components/Main';
import Relay from "react-relay";

// ReactDOM.render(<Hello  />, document.getElementById('react'));
// ReactDOM.render(<Main/>, document.getElementById('react'));

// console.log(
//   Relay.QL`query myQuery
//   {
//     links {
//       title
//     }
//   }`
// );

class HomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query MainQuery {
        store { ${Component.getFragment('store')} }
      }
    `
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={Main}
    route={new HomeRoute()}
  />,
  document.getElementById('react')
);
