'use strict';

var React = require('react');
var Router = require('react-router');
var CourseForm = require('../courses/courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');

var managerCoursePage = React.createClass({
  mixins: [
    Router.Navigation
  ],
  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },
  getInitialState: function() {
    return {
      course: {
        id: "",
        title: "",
        watchHref: "",
        author: {
          id: "",
          name: ""
        },
        length: "",
        category: ""
      },
      authors: [],
      errors: {},
      dirty: false
    };
  },
  componentWillMount: function() {
    var courseId = this.props.params.id;
    if (courseId) {
      this.setState({ course: CourseStore.getCourseById(courseId)});
    }
    this.setState({ authors: CourseStore.getAuthors()});
  },
  saveCourseState: function(event) {
    this.setState({ dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.course[field] = value;
    this.setState({ course: this.state.course});
  },
  courseFormIsValid: function() {
    var isValid = true;
    this.state.errors = {};

    if (this.state.course.title.length < 3) {
      this.state.errors.title = 'Course title must be at least 3 characters.';
      isValid = false;
    }

    this.setState({ errors: this.state.errors });
    return isValid;
  },
  saveCourse: function(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    if(this.state.course.id) {
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }

    this.setState({dirty: false}, function() {
      toastr.success('Course saved.');
      this.transitionTo('courses');
    });
  },
  render: function() {
    return (
      <CourseForm
        course={this.state.course}
        authors={this.state.authors}
        onChange={this.saveCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
      />
    );
  }
});

module.exports = managerCoursePage;
