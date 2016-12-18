'use strict';

import React from 'react';
import moduleName from '../API';

export default class Main extends React.Component {
  componentDidMount() {
    API.fetchLinks();
  }
  render() {
    return (
      <div>
        <h3>Links</h3>
        <ul>
          <li>Link...</li>
          <li>Link...</li>
        </ul>
      </div>
    )
  }
}
