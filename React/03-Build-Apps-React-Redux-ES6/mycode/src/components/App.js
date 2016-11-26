'use strict';

// This file holds markup we want on every page like header and footer.

import React, { Component, PropTypes } from 'react';
import Header from './common/Header';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
