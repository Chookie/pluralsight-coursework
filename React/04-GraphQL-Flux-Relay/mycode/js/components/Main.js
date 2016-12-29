'use strict';

import React from 'react';
import Relay from 'react-relay';
import Link from './Link';
import {debounce} from 'lodash';

import CreateLinkMutation from '../mutations/CreateLinkMutation';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.search = debounce(this.search, 300);
  }
  handleSearch = (e) => {
    let query = e.target.value;
    this.search(query);
  }
  search = (query) => {
    // When you set a relay variable, relay will try to re-fetch if needed.
    this.props.relay.setVariables({ query });
  }
  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({ limit: newLimit });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.store);
    Relay.Store.commitUpdate(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newUrl.value,
        store: this.props.store   // this is the parent
      })
    );
    this.refs.newTitle.value = "";
    this.refs.newUrl.value = "";
  }
  render() {
    let content = this.props.store.linkConnection.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node} />
    });
    return (
      <div>
        <h3>Links</h3>
        <input type='text' placeholder="Search" onChange={this.handleSearch} />
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder="Title" ref='newTitle' />
          <input type='text' placeholder="Url" ref="newUrl" />
          <button type='submit'>Add</button>
        </form>
        Showing: &nbsp;
        <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit}>
          <option value='20'>20</option>
          <option value='100'>100</option>
        </select>
        <ul>
          {content}
        </ul>
      </div>
    )
  }
}

// Declare the data requirements for this component using grapql
Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 100,
    query: ''
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        linkConnection(first: $limit, query: $query) {
          edges {
            node {
              id
              ${Link.getFragment('link')}
            }
          }
        }
      }`
  }
});

export default Main;
