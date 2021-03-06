'use strict';

import React, { Component } from 'react';

// Could use stateless component rather than class
// but using class here due to limitation in Hot reload now
// where it won't work unless class near top of hiearchy.'
class AboutPage extends Component {

  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of other helpful libraries</p>
        <h1></h1>
      </div>
    );
  }
}

export default AboutPage;
