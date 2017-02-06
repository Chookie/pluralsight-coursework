'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from './courseActions';
import CourseForm from './CourseForm';
import toastr  from 'toastr';
import {authorsFormattedForDropdown} from './selectors/courseSelectors';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  redirect() {
    this.setState({ saving: false});
    this.context.router.push('/courses');
    toastr.success("Course saved");
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false});
      });
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
// Note required to avoid linting warning when testing.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  // filter is less efficient as it searches through the whole array.
  const course = courses.find(course => course.id === courseId);
  if (course) {
    return course;
  }
  return null;
}

function mapStateToProps(storeState, ownProps) {
  // The parth /course/:id so we know if new course or existing
  const courseId = ownProps.params.id;

  let course = { id: "",  title: "", watchHref: "", authorId: "", length: "", category: "" };

  if (courseId && storeState.courses.length > 0) {
    // We came to this page to edit an existing course
    course = getCourseById(storeState.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(storeState.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// for testing
export {ManageCoursePage as ManageCoursePageTest};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
