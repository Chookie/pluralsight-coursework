import React, { Component } from 'react';
import Relay from 'react-relay';
import moment from 'moment';

class Link extends Component {
  dateStyle = {
    color: '#888',
    fontSize: '0.7em',
    marginRight: '0.5em'
  }
  dateLabel = () => {
    let {link, relay} = this.props;
    console.log(relay.hasOptimisticUpdate(link));
    if (relay.hasOptimisticUpdate(link)) {
      return 'Saving...'
    }
    return this.props.link.createdAt ?
              moment(this.props.link.createdAt).format('L') : null
  }
  render() {
    // Destructuring properties to link variable. props is object {links:..., relay:...}
    let {link} = this.props;
    return (
      <li>
        <span style={this.dateStyle}>
          {this.dateLabel()}
        </span>
        <a href={link.url}>{link.title}</a>
      </li>
    );
  }
}

Link = Relay.createContainer(Link, {
  fragments: {
    link: () => Relay.QL`
    fragment on Link {
      url
      title
      createdAt
    }`
  }
});

export default Link;
