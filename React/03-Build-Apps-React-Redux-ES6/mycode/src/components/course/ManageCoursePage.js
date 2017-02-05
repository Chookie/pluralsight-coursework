'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from './courseActions';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: { }
    };
  }

  render() {
    return (
     <h1>Manage Course</h1>
    );
  }
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(storeState, ownProps) {
  return {
    courses: storeState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
