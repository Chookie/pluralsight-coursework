'use strict';

var React = require('react');
var Link = require('react-router').Link;

var courseList = React.createClass({
  render: function() {
    var that = this;
    var createCourseRow = function(course) {
      return (
        <tr>
          <td><a href={course.watchHref}>Watch</a></td>
          <td><a href='#' onClick={that.props.onDelete.bind(this, course.id)}>Delete</a></td>
          <td><Link to='manageCourse' params={{ id: course.id}}>{course.title}</Link></td>
          <td>{course.author.name}</td>
          <td>{course.category}</td>
          <td>{course.length}</td>
        </tr>
      );
    };
    return (
      <div>
        <div>
          <table className='table'>
            <thead>
              <th></th>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Length</th>
            </thead>
            <tbody>
              {this.props.courses.map(createCourseRow, null)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = courseList;
