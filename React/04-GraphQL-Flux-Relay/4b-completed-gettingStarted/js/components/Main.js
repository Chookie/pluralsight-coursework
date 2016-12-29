'use strict';

import React from 'react';
import API from '../API';
import LinkStore from '../stores/LinkStore';

let _getAppState = () => {
  return { links: LinkStore.getAll() };
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = _getAppState();
    // Need to bind change event otherwise the this at that time will
    // be the calling component, not this class.
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    API.fetchLinks();
    // This should really be a method in the store to encapsulate as should remove
    LinkStore.on("change", this.onChange);
  }
  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange);
  }
  onChange() {
    console.log("4. In the View");
    this.setState(_getAppState());
  }
  render() {
    let content = this.state.links.map(link => {
      return  <li key={link._id}>
                <a href={link.url}>{link.title}</a>
              </li>
    });
    return (
      <div>
        <h3>Links</h3>
        <ul>
          {content}
        </ul>
      </div>
    )
  }
}
