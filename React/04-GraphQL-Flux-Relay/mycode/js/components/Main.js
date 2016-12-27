'use strict';

import React from 'react';
import Relay from 'react-relay';
import Link from './Link';

class Main extends React.Component {
  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({ limit: newLimit });
  };
  render() {
    let content = this.props.store.linkConnection.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node} />
    });
    return (
      <div>
        <h3>Links</h3>
        Showing: &nbsp;
        <select onChange={this.setLimit} defaultValue='10'>
          <option value='5'>5</option>
          <option value='10'>10</option>
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
    limit: 10
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        # Fetch 5 links only
        linkConnection(first: $limit) {
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
