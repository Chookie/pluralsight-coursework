import Relay from 'react-relay';

class CreateLinkMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { createLink }
    `;
  }

  // variables is separate step in case want to add some universal
  // value to save or do calc etc.
  getVariables() {
    return {
      title: this.props.title,
      url: this.props.url
    }
  }

  // list everything in our data model that could be affected by this mutation.
  // not everything it is using today but is everything that could be affected.
  // Relay will only ask for data we need though.  This is in case we expand later.
  getFatQuery() {
    // CreateLinkPayload created on the server for us
    // by the relay mutation helper we used.
    return Relay.QL`
      fragment on CreateLinkPayload {
        linkEdge,
        store { linkConnection }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      // The field name in the response that represents the parent of the connection
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'linkConnection',
      edgeName: 'linkEdge',
      rangeBehaviors: {
        // got error 'Using `null` as a rangeBehavior value is deprecated'
        // when I had 'orderby(newest)': 'prepend' as per http://facebook.github.io/relay/docs/guides-mutations
        '': 'prepend',
      },
    }];
  }

  // Whatever we define here will be used immediately by the getConfigs
  // we defined above.
  getOptimisticResponse() {
    return {
      linkEdge: {
        node: {
          title: this.props.title,
          url: this.props.url,
        }
      }
    }
  }
}

export default CreateLinkMutation;
