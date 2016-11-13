'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseList = require('./courseList');
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var Course = React.createClass({
  getInitialState: function() {
    return {
      courses: CourseStore.getAllCourses()
    };
  },
  componentWillMount: function() {
    CourseStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CourseStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ authors: CourseStore.getAllCourses()});
  },
  deleteCourse: function(id, event) {
    event.preventDefault();
    CourseActions.deleteCourse(id);
    toastr.success('Course Deleted');
  },
  render: function() {
    return (
      <div>
        <h1>Courses</h1>
        <Link to='addCourse' className='btn btn-default'>Add Course</Link>
        <CourseList
          courses={this.state.courses}
          onDelete={this.deleteCourse}
        />
      </div>
    );
  }
});

module.exports = Course;
